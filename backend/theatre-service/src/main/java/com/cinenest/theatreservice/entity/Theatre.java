package com.cinenest.theatreservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "theatres")
@Data
public class Theatre {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String city;
    
    @Column(length = 500)
    private String address;
    
    private Double latitude;
    private Double longitude;
    
    @Column(columnDefinition = "TEXT")
    private String amenities; // JSON string for amenities like Parking, Food, etc.
    
    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL)
    private List<Screen> screens;
}
