package com.cinenest.bookingservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tickets")
@Data
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    @JsonIgnore
    private Booking booking;

    // References the seat in the Theatre Service
    @Column(name = "seat_id", nullable = false)
    private UUID seatId;

    @Column(name = "seat_row", nullable = false)
    private String seatRow;

    @Column(name = "seat_number", nullable = false)
    private Integer seatNumber;

    @Column(nullable = false)
    private Double price;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }
    public UUID getSeatId() { return seatId; }
    public void setSeatId(UUID seatId) { this.seatId = seatId; }
    public String getSeatRow() { return seatRow; }
    public void setSeatRow(String seatRow) { this.seatRow = seatRow; }
    public Integer getSeatNumber() { return seatNumber; }
    public void setSeatNumber(Integer seatNumber) { this.seatNumber = seatNumber; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
