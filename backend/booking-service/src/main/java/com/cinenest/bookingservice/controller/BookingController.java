package com.cinenest.bookingservice.controller;

import com.cinenest.bookingservice.dto.SeatLockRequest;
import com.cinenest.bookingservice.service.SeatLockManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private SeatLockManager seatLockManager;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/lock-seat")
    public ResponseEntity<String> lockSeat(@RequestBody SeatLockRequest request) {
        boolean locked = seatLockManager.lockSeat(request.getShowId(), request.getSeatId(), request.getUserId());
        if (locked) {
            // Broadcast seat locked event
            messagingTemplate.convertAndSend("/topic/shows/" + request.getShowId(), 
                "{\"seatId\":\"" + request.getSeatId() + "\", \"status\":\"LOCKED\"}");
            return ResponseEntity.ok("Seat locked successfully");
        }
        return ResponseEntity.badRequest().body("Seat is already locked or unavailable");
    }

    @PostMapping("/unlock-seat")
    public ResponseEntity<String> unlockSeat(@RequestBody SeatLockRequest request) {
        seatLockManager.unlockSeat(request.getSeatId(), request.getUserId());
        // Broadcast seat unlocked event
        messagingTemplate.convertAndSend("/topic/shows/" + request.getShowId(), 
            "{\"seatId\":\"" + request.getSeatId() + "\", \"status\":\"AVAILABLE\"}");
        return ResponseEntity.ok("Seat unlocked successfully");
    }

    @Autowired
    private com.cinenest.bookingservice.service.BookingService bookingService;

    @PostMapping
    public ResponseEntity<com.cinenest.bookingservice.entity.Booking> createBooking(@jakarta.validation.Valid @RequestBody com.cinenest.bookingservice.dto.BookingRequestDto dto) {
        return new ResponseEntity<>(bookingService.createBooking(dto), org.springframework.http.HttpStatus.CREATED);
    }

    @PostMapping("/{id}/confirm")
    public ResponseEntity<com.cinenest.bookingservice.entity.Booking> confirmBooking(@PathVariable java.util.UUID id) {
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<java.util.List<com.cinenest.bookingservice.entity.Booking>> getUserBookings(@PathVariable java.util.UUID userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @Autowired
    private com.cinenest.bookingservice.repository.TicketRepository ticketRepository;

    @GetMapping("/shows/{showId}/unavailable-seats")
    public ResponseEntity<java.util.List<java.util.UUID>> getUnavailableSeats(@PathVariable java.util.UUID showId) {
        // 1. Get locked seats
        java.util.List<java.util.UUID> lockedSeats = seatLockManager.getLockedSeatsForShow(showId);
        
        // 2. Get booked seats from DB (Tickets)
        java.util.List<com.cinenest.bookingservice.entity.Ticket> tickets = ticketRepository.findByBookingShowId(showId);
        java.util.List<java.util.UUID> bookedSeats = tickets.stream()
            .map(com.cinenest.bookingservice.entity.Ticket::getSeatId)
            .toList();
            
        // 3. Merge and return
        java.util.Set<java.util.UUID> unavailable = new java.util.HashSet<>(lockedSeats);
        unavailable.addAll(bookedSeats);
        return ResponseEntity.ok(new java.util.ArrayList<>(unavailable));
    }
}
