package com.cinenest.movieservice.repository;

import com.cinenest.movieservice.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.EntityGraph;

@Repository
public interface MovieRepository extends JpaRepository<Movie, UUID> {
    
    @EntityGraph(attributePaths = {"genres", "crew"})
    List<Movie> findAll();

    List<Movie> findByStatus(String status);
    
    @EntityGraph(attributePaths = {"genres", "crew"})
    @Query("SELECT DISTINCT m FROM Movie m LEFT JOIN m.crew c LEFT JOIN m.genres g " +
           "WHERE LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(m.description) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(g.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Movie> searchMovies(@Param("query") String query);
}
