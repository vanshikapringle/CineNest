package com.cinenest.theatreservice.repository;

import com.cinenest.theatreservice.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShowRepository extends JpaRepository<Show, UUID> {
    List<Show> findByScreenTheatreId(UUID theatreId);
    List<Show> findByScreenId(UUID screenId);
}
