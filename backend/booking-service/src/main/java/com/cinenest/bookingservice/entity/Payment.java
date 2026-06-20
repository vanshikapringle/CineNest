package com.cinenest.bookingservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private UUID bookingId;
    
    @Column(nullable = false)
    private String transactionId;
    
    @Column(nullable = false)
    private Double amount;
    
    @Column(nullable = false)
    private String status; // SUCCESS, FAILED
    
    @Column(nullable = false)
    private LocalDateTime paymentDate;
}
