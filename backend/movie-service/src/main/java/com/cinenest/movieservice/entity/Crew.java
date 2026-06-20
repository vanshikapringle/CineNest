package com.cinenest.movieservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "crew")
@Data
public class Crew {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String name;
    
    private String role; // Director, Actor, Producer
    
    private String photoUrl;
}
