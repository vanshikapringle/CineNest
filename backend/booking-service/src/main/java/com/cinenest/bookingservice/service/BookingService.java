package com.cinenest.bookingservice.service;

import com.cinenest.bookingservice.dto.BookingRequestDto;
import com.cinenest.bookingservice.dto.TicketRequestDto;
import com.cinenest.bookingservice.entity.Booking;
import com.cinenest.bookingservice.entity.BookingStatus;
import com.cinenest.bookingservice.entity.Show;
import com.cinenest.bookingservice.entity.Ticket;
import com.cinenest.bookingservice.exception.BookingException;
import com.cinenest.bookingservice.exception.ResourceNotFoundException;
import com.cinenest.bookingservice.repository.BookingRepository;
import com.cinenest.bookingservice.repository.ShowRepository;
import com.cinenest.bookingservice.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;
    private final ShowRepository showRepository;
    private final SeatLockManager seatLockManager;

    public List<Booking> getUserBookings(UUID userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking getBookingById(UUID bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));
    }

    @Transactional
    public Booking createBooking(BookingRequestDto requestDto) {
        Show show = showRepository.findById(requestDto.getShowId())
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with id: " + requestDto.getShowId()));

        // Verify that the user holds valid locks for all requested seats
        for (TicketRequestDto ticketReq : requestDto.getTickets()) {
            if (!seatLockManager.isSeatLocked(ticketReq.getSeatId())) {
                throw new BookingException("Seat lock expired or invalid for seat: " + ticketReq.getSeatRow() + ticketReq.getSeatNumber());
            }
        }

        // Create Booking
        Booking booking = new Booking();
        booking.setUserId(requestDto.getUserId());
        booking.setShow(show);
        booking.setTotalAmount(requestDto.getTotalAmount());
        booking.setStatus(BookingStatus.PENDING);
        
        Booking savedBooking = bookingRepository.save(booking);

        // Create Tickets
        List<Ticket> tickets = new ArrayList<>();
        for (TicketRequestDto ticketReq : requestDto.getTickets()) {
            Ticket ticket = new Ticket();
            ticket.setBooking(savedBooking);
            ticket.setSeatId(ticketReq.getSeatId());
            ticket.setSeatRow(ticketReq.getSeatRow());
            ticket.setSeatNumber(ticketReq.getSeatNumber());
            ticket.setPrice(ticketReq.getPrice());
            tickets.add(ticket);
        }
        
        ticketRepository.saveAll(tickets);
        savedBooking.setTickets(tickets);

        return savedBooking;
    }

    @Transactional
    public Booking confirmBooking(UUID bookingId) {
        Booking booking = getBookingById(bookingId);
        
        if (booking.getStatus() == BookingStatus.CONFIRMED) {
            throw new BookingException("Booking is already confirmed");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        Booking confirmedBooking = bookingRepository.save(booking);

        // Unlock seats from SeatLockManager since they are now permanently booked in DB
        for (Ticket ticket : confirmedBooking.getTickets()) {
            seatLockManager.unlockSeat(ticket.getSeatId(), confirmedBooking.getUserId());
        }

        return confirmedBooking;
    }

    @Transactional
    public void cancelBooking(UUID bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        // Free up locks if any
        for (Ticket ticket : booking.getTickets()) {
            seatLockManager.unlockSeat(ticket.getSeatId(), booking.getUserId());
        }
    }
}
