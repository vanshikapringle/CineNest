package com.cinenest.theatreservice.repository;

import com.cinenest.theatreservice.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, UUID> {
}
