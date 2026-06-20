package com.cinenest.theatreservice.controller;

import com.cinenest.theatreservice.dto.ScreenRequestDto;
import com.cinenest.theatreservice.dto.TheatreRequestDto;
import com.cinenest.theatreservice.entity.Screen;
import com.cinenest.theatreservice.entity.Theatre;
import com.cinenest.theatreservice.service.TheatreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/theatres")
@RequiredArgsConstructor
public class TheatreController {

    private final TheatreService theatreService;

    @GetMapping
    public ResponseEntity<List<Theatre>> getTheatres(@RequestParam(required = false) String city) {
        return ResponseEntity.ok(theatreService.getAllTheatres(city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Theatre> getTheatreById(@PathVariable UUID id) {
        return ResponseEntity.ok(theatreService.getTheatreById(id));
    }

    @PostMapping
    public ResponseEntity<Theatre> createTheatre(@Valid @RequestBody TheatreRequestDto dto) {
        return new ResponseEntity<>(theatreService.createTheatre(dto), HttpStatus.CREATED);
    }

    @PostMapping("/screens")
    public ResponseEntity<Screen> createScreen(@Valid @RequestBody ScreenRequestDto dto) {
        return new ResponseEntity<>(theatreService.createScreen(dto), HttpStatus.CREATED);
    }
}
