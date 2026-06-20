package com.cinenest.bookingservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class TicketRequestDto {
    @NotNull(message = "Seat ID is required")
    private UUID seatId;

    @NotBlank(message = "Seat Row is required")
    private String seatRow;

    @NotNull(message = "Seat Number is required")
    private Integer seatNumber;

    @NotNull(message = "Price is required")
    private Double price;

    public UUID getSeatId() { return seatId; }
    public void setSeatId(UUID seatId) { this.seatId = seatId; }
    public String getSeatRow() { return seatRow; }
    public void setSeatRow(String seatRow) { this.seatRow = seatRow; }
    public Integer getSeatNumber() { return seatNumber; }
    public void setSeatNumber(Integer seatNumber) { this.seatNumber = seatNumber; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
