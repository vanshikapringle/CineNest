package com.cinenest.theatreservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "shows")
@Data
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "screen_id", nullable = false)
    @JsonIgnore
    private Screen screen;

    @Column(nullable = false)
    private String movieId;

    @Column(nullable = false)
    private LocalDate showDate;

    @Column(nullable = false)
    private LocalTime showTime;

    @Column(nullable = false)
    private Double basePrice;
}
