package com.cinenest.theatreservice.repository;

import com.cinenest.theatreservice.entity.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre, UUID> {
    List<Theatre> findByCityIgnoreCase(String city);
}
