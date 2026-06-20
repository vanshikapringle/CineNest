package com.cinenest.theatreservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class ShowRequestDto {
    @NotNull(message = "Screen ID is required")
    private UUID screenId;

    @NotBlank(message = "Movie ID is required")
    private String movieId;

    @NotNull(message = "Show date is required")
    private LocalDate showDate;

    @NotNull(message = "Show time is required")
    private LocalTime showTime;

    @NotNull(message = "Base price is required")
    private Double basePrice;
}
