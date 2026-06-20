package com.cinenest.theatreservice.service;

import com.cinenest.theatreservice.dto.ScreenRequestDto;
import com.cinenest.theatreservice.dto.TheatreRequestDto;
import com.cinenest.theatreservice.entity.Screen;
import com.cinenest.theatreservice.entity.Seat;
import com.cinenest.theatreservice.entity.Theatre;
import com.cinenest.theatreservice.exception.ResourceNotFoundException;
import com.cinenest.theatreservice.repository.ScreenRepository;
import com.cinenest.theatreservice.repository.SeatRepository;
import com.cinenest.theatreservice.repository.TheatreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TheatreService {

    private final TheatreRepository theatreRepository;
    private final ScreenRepository screenRepository;
    private final SeatRepository seatRepository;

    public List<Theatre> getAllTheatres(String city) {
        if (city != null && !city.isBlank()) {
            return theatreRepository.findByCityIgnoreCase(city);
        }
        return theatreRepository.findAll();
    }

    public Theatre getTheatreById(UUID id) {
        return theatreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Theatre not found with id: " + id));
    }

    @Transactional
    public Theatre createTheatre(TheatreRequestDto dto) {
        Theatre theatre = new Theatre();
        theatre.setName(dto.getName());
        theatre.setCity(dto.getCity());
        theatre.setAddress(dto.getAddress());
        theatre.setLatitude(dto.getLatitude());
        theatre.setLongitude(dto.getLongitude());
        theatre.setAmenities(dto.getAmenities());
        return theatreRepository.save(theatre);
    }

    @Transactional
    public Screen createScreen(ScreenRequestDto dto) {
        Theatre theatre = getTheatreById(dto.getTheatreId());
        
        Screen screen = new Screen();
        screen.setTheatre(theatre);
        screen.setName(dto.getName());
        screen.setSeatCapacity(dto.getSeatCapacity());
        
        Screen savedScreen = screenRepository.save(screen);
        
        // Auto-generate generic seats for MVP
        List<Seat> seats = new ArrayList<>();
        int capacity = dto.getSeatCapacity();
        int rows = (int) Math.ceil((double) capacity / 10);
        int seatCounter = 1;
        
        for (int r = 0; r < rows; r++) {
            char rowChar = (char) ('A' + r);
            for (int s = 1; s <= 10; s++) {
                if (seatCounter > capacity) break;
                Seat seat = new Seat();
                seat.setScreen(savedScreen);
                seat.setRow(String.valueOf(rowChar));
                seat.setNumber(s);
                // Simple category logic
                if (r < 3) seat.setCategory("REGULAR");
                else if (r < rows - 1) seat.setCategory("PREMIUM");
                else seat.setCategory("RECLINER");
                
                seats.add(seat);
                seatCounter++;
            }
        }
        seatRepository.saveAll(seats);
        return savedScreen;
    }
}
