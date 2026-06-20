package com.cinenest.bookingservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "shows")
@Data
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // References to other microservices (we store IDs instead of foreign keys since they live in different DBs)
    @Column(name = "movie_id", nullable = false)
    private UUID movieId;

    @Column(name = "theatre_id", nullable = false)
    private UUID theatreId;

    @Column(name = "screen_id", nullable = false)
    private UUID screenId;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "price_multiplier")
    private Double priceMultiplier = 1.0;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getMovieId() { return movieId; }
    public void setMovieId(UUID movieId) { this.movieId = movieId; }
    public UUID getTheatreId() { return theatreId; }
    public void setTheatreId(UUID theatreId) { this.theatreId = theatreId; }
    public UUID getScreenId() { return screenId; }
    public void setScreenId(UUID screenId) { this.screenId = screenId; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public Double getPriceMultiplier() { return priceMultiplier; }
    public void setPriceMultiplier(Double priceMultiplier) { this.priceMultiplier = priceMultiplier; }
}
