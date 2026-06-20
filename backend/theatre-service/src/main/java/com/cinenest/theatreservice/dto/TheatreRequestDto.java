package com.cinenest.theatreservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TheatreRequestDto {
    @NotBlank(message = "Theatre name is required")
    private String name;

    @NotBlank(message = "City is required")
    private String city;

    private String address;
    private Double latitude;
    private Double longitude;
    private String amenities;
}
