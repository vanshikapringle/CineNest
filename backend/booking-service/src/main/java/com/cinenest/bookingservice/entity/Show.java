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

    @Column(name = "movie_id", nullable = false)
    private String movieId;

    @Column(name = "screen_id", nullable = false)
    private UUID screenId;

    @Column(name = "show_date", nullable = false)
    private java.time.LocalDate showDate;

    @Column(name = "show_time", nullable = false)
    private java.time.LocalTime showTime;

    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getMovieId() { return movieId; }
    public void setMovieId(String movieId) { this.movieId = movieId; }
    public UUID getScreenId() { return screenId; }
    public void setScreenId(UUID screenId) { this.screenId = screenId; }
    public java.time.LocalDate getShowDate() { return showDate; }
    public void setShowDate(java.time.LocalDate showDate) { this.showDate = showDate; }
    public java.time.LocalTime getShowTime() { return showTime; }
    public void setShowTime(java.time.LocalTime showTime) { this.showTime = showTime; }
    public Double getBasePrice() { return basePrice; }
    public void setBasePrice(Double basePrice) { this.basePrice = basePrice; }
}
