package com.cinenest.bookingservice.controller;

import com.cinenest.bookingservice.entity.Payment;
import com.cinenest.bookingservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(@RequestBody PaymentRequest request) {
        // Simulate real payment processing logic
        Payment payment = new Payment();
        payment.setBookingId(request.getBookingId());
        payment.setAmount(request.getAmount());
        payment.setStatus("SUCCESS");
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment.setPaymentDate(LocalDateTime.now());
        
        return ResponseEntity.ok(paymentRepository.save(payment));
    }
}

class PaymentRequest {
    private UUID bookingId;
    private Double amount;

    public UUID getBookingId() { return bookingId; }
    public void setBookingId(UUID bookingId) { this.bookingId = bookingId; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}
