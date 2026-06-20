package com.cinenest.bookingservice.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SeatLockManager {

    // Map of Seat ID -> Lock Info
    private final Map<UUID, SeatLock> locks = new ConcurrentHashMap<>();

    private static class SeatLock {
        UUID showId;
        UUID userId;
        LocalDateTime expiresAt;

        SeatLock(UUID showId, UUID userId, LocalDateTime expiresAt) {
            this.showId = showId;
            this.userId = userId;
            this.expiresAt = expiresAt;
        }
    }

    /**
     * Attempts to lock a seat for a user.
     * @return true if successfully locked, false if already locked by someone else
     */
    public boolean lockSeat(UUID showId, UUID seatId, UUID userId) {
        // Clean up expired locks first (simple lazy cleanup)
        cleanExpiredLocks();

        SeatLock existingLock = locks.get(seatId);
        
        if (existingLock != null && existingLock.expiresAt.isAfter(LocalDateTime.now())) {
            // Seat is locked, check if it's locked by the same user
            return existingLock.userId.equals(userId);
        }

        // Lock for 5 minutes
        locks.put(seatId, new SeatLock(showId, userId, LocalDateTime.now().plusMinutes(5)));
        return true;
    }

    /**
     * Unlocks a seat.
     */
    public void unlockSeat(UUID seatId, UUID userId) {
        SeatLock existingLock = locks.get(seatId);
        if (existingLock != null && existingLock.userId.equals(userId)) {
            locks.remove(seatId);
        }
    }

    /**
     * Checks if a seat is locked.
     */
    public boolean isSeatLocked(UUID seatId) {
        SeatLock existingLock = locks.get(seatId);
        return existingLock != null && existingLock.expiresAt.isAfter(LocalDateTime.now());
    }

    private void cleanExpiredLocks() {
        LocalDateTime now = LocalDateTime.now();
        locks.entrySet().removeIf(entry -> entry.getValue().expiresAt.isBefore(now));
    }

    public java.util.List<UUID> getLockedSeatsForShow(UUID showId) {
        cleanExpiredLocks();
        return locks.entrySet().stream()
                .filter(entry -> entry.getValue().showId.equals(showId))
                .map(Map.Entry::getKey)
                .toList();
    }
}
