package com.cinenest.theatreservice.service;

import com.cinenest.theatreservice.dto.ShowRequestDto;
import com.cinenest.theatreservice.entity.Screen;
import com.cinenest.theatreservice.entity.Show;
import com.cinenest.theatreservice.exception.ResourceNotFoundException;
import com.cinenest.theatreservice.repository.ScreenRepository;
import com.cinenest.theatreservice.repository.ShowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShowService {

    private final ShowRepository showRepository;
    private final ScreenRepository screenRepository;

    public List<Show> getShowsByTheatreId(UUID theatreId) {
        return showRepository.findByScreenTheatreId(theatreId);
    }

    public Show getShowById(UUID id) {
        return showRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with id: " + id));
    }

    @Transactional
    public Show createShow(ShowRequestDto dto) {
        Screen screen = screenRepository.findById(dto.getScreenId())
                .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id: " + dto.getScreenId()));

        Show show = new Show();
        show.setScreen(screen);
        show.setMovieId(dto.getMovieId());
        show.setShowDate(dto.getShowDate());
        show.setShowTime(dto.getShowTime());
        show.setBasePrice(dto.getBasePrice());

        return showRepository.save(show);
    }

    @Transactional
    public Show updateShow(UUID id, ShowRequestDto dto) {
        Show show = getShowById(id);
        
        Screen screen = screenRepository.findById(dto.getScreenId())
                .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id: " + dto.getScreenId()));

        show.setScreen(screen);
        show.setMovieId(dto.getMovieId());
        show.setShowDate(dto.getShowDate());
        show.setShowTime(dto.getShowTime());
        show.setBasePrice(dto.getBasePrice());

        return showRepository.save(show);
    }

    @Transactional
    public void deleteShow(UUID id) {
        Show show = getShowById(id);
        showRepository.delete(show);
    }
}
