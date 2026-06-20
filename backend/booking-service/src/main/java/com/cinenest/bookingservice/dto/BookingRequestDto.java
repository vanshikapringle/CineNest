package com.cinenest.bookingservice.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class BookingRequestDto {
    @NotNull(message = "User ID is required")
    private UUID userId;

    @NotNull(message = "Show ID is required")
    private UUID showId;

    @NotEmpty(message = "At least one ticket is required")
    @Valid
    private List<TicketRequestDto> tickets;

    @NotNull(message = "Total amount is required")
    private Double totalAmount;

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public UUID getShowId() { return showId; }
    public void setShowId(UUID showId) { this.showId = showId; }
    public List<TicketRequestDto> getTickets() { return tickets; }
    public void setTickets(List<TicketRequestDto> tickets) { this.tickets = tickets; }
    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
}
