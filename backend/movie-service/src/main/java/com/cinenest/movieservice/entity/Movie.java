package com.cinenest.movieservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "movies")
@Data
public class Movie {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private LocalDate releaseDate;
    
    private Integer duration;
    
    private String language;
    
    private String certification;
    
    private String posterUrl;
    
    private String bannerUrl;
    
    private String trailerUrl;
    
    private String status; // COMING_SOON, NOW_SHOWING
    
    private Double imdbRating;
    
    private String rottenTomatoesRating;

    private String accentColor;
    
    private String director;
    
    private String writer;
    
    private String boxOffice;
    
    private String studio;
    
    @ManyToMany
    @JoinTable(
        name = "movie_genres",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;
    
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CastMember> castMembers = new ArrayList<>();
    
    @ManyToMany
    @JoinTable(
        name = "movie_crew",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "crew_id")
    )
    private Set<Crew> crew;
}
