package com.cinenest.theatreservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class ScreenRequestDto {
    @NotNull(message = "Theatre ID is required")
    private UUID theatreId;

    @NotBlank(message = "Screen name is required")
    private String name;

    @NotNull(message = "Seat capacity is required")
    private Integer seatCapacity;
}
