package com.cinenest.movieservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "reviews")
@Data
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "movie_id", nullable = false)
    private UUID movieId;
    
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    
    private Integer rating; // 1-10
    
    @Column(length = 2000)
    private String comment;
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
