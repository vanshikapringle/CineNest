package com.cinenest.theatreservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "seats")
@Data
public class Seat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "screen_id", nullable = false)
    @JsonIgnore
    private Screen screen;
    
    @Column(name = "seat_row", nullable = false)
    private String row;
    
    @Column(name = "seat_number", nullable = false)
    private Integer number;
    
    @Column(nullable = false)
    private String category; // REGULAR, PREMIUM, RECLINER
}
