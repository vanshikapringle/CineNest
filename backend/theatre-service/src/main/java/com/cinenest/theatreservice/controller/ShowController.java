package com.cinenest.theatreservice.controller;

import com.cinenest.theatreservice.dto.ShowRequestDto;
import com.cinenest.theatreservice.entity.Show;
import com.cinenest.theatreservice.service.ShowService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shows")
@RequiredArgsConstructor
public class ShowController {

    private final ShowService showService;

    @GetMapping("/{id}")
    public ResponseEntity<Show> getShowById(@PathVariable UUID id) {
        return ResponseEntity.ok(showService.getShowById(id));
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<List<com.cinenest.theatreservice.entity.Seat>> getSeatsForShow(@PathVariable UUID id) {
        Show show = showService.getShowById(id);
        return ResponseEntity.ok(show.getScreen().getSeats());
    }

    @GetMapping("/theatre/{theatreId}")
    public ResponseEntity<List<Show>> getShowsByTheatre(@PathVariable UUID theatreId) {
        return ResponseEntity.ok(showService.getShowsByTheatreId(theatreId));
    }

    @PostMapping
    public ResponseEntity<Show> createShow(@Valid @RequestBody ShowRequestDto dto) {
        return new ResponseEntity<>(showService.createShow(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Show> updateShow(@PathVariable UUID id, @Valid @RequestBody ShowRequestDto dto) {
        return ResponseEntity.ok(showService.updateShow(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShow(@PathVariable UUID id) {
        showService.deleteShow(id);
        return ResponseEntity.noContent().build();
    }
}
