package com.cinenest.theatreservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "screens")
@Data
public class Screen {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "theatre_id", nullable = false)
    @JsonIgnore
    private Theatre theatre;
    
    @Column(nullable = false)
    private String name;
    
    private Integer seatCapacity;
    
    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL)
    private List<Seat> seats;

    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL)
    private List<Show> shows;
}
