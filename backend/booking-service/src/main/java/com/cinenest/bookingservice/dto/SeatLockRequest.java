package com.cinenest.bookingservice.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class SeatLockRequest {
    private UUID showId;
    private UUID seatId;
    private UUID userId;

    public UUID getShowId() { return showId; }
    public void setShowId(UUID showId) { this.showId = showId; }
    public UUID getSeatId() { return seatId; }
    public void setSeatId(UUID seatId) { this.seatId = seatId; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
}
