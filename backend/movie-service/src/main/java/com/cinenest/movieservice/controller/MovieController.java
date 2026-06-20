package com.cinenest.movieservice.controller;

import com.cinenest.movieservice.entity.Movie;
import com.cinenest.movieservice.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies(@RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(movieRepository.findByStatus(status));
        }
        return ResponseEntity.ok(movieRepository.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.ok(movieRepository.findAll());
        }
        return ResponseEntity.ok(movieRepository.searchMovies(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable UUID id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieRepository.save(movie));
    }
}
