package com.cinenest.theatreservice.config;

import com.cinenest.theatreservice.dto.ScreenRequestDto;
import com.cinenest.theatreservice.dto.ShowRequestDto;
import com.cinenest.theatreservice.dto.TheatreRequestDto;
import com.cinenest.theatreservice.entity.Screen;
import com.cinenest.theatreservice.entity.Theatre;
import com.cinenest.theatreservice.repository.TheatreRepository;
import com.cinenest.theatreservice.service.ShowService;
import com.cinenest.theatreservice.service.TheatreService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final TheatreRepository theatreRepository;
    private final TheatreService theatreService;
    private final ShowService showService;

    @Override
    public void run(String... args) throws Exception {
        theatreRepository.deleteAll();
        if (theatreRepository.count() == 0) {
            System.out.println("Seeding Theatre Data...");

            // Create Theatre 1
            TheatreRequestDto t1 = new TheatreRequestDto();
            t1.setName("CineNest Prime - Mumbai");
            t1.setCity("Mumbai");
            t1.setAddress("123 Andheri West, Mumbai, MH");
            t1.setAmenities("{\"parking\": true, \"food\": true, \"dolby_atmos\": true}");
            Theatre savedT1 = theatreService.createTheatre(t1);

            // Create Screen for T1
            ScreenRequestDto sc1 = new ScreenRequestDto();
            sc1.setTheatreId(savedT1.getId());
            sc1.setName("Screen 1 - IMAX");
            sc1.setSeatCapacity(100);
            Screen savedSc1 = theatreService.createScreen(sc1);

            // Create Shows for T1
            ShowRequestDto sh1 = new ShowRequestDto();
            sh1.setScreenId(savedSc1.getId());
            sh1.setMovieId("11111111-1111-1111-1111-111111111111"); // Dune: Part Two
            sh1.setShowDate(LocalDate.now());
            sh1.setShowTime(LocalTime.of(18, 30));
            sh1.setBasePrice(350.0);
            showService.createShow(sh1);

            ShowRequestDto sh2 = new ShowRequestDto();
            sh2.setScreenId(savedSc1.getId());
            sh2.setMovieId("22222222-2222-2222-2222-222222222222"); // Oppenheimer
            sh2.setShowDate(LocalDate.now());
            sh2.setShowTime(LocalTime.of(21, 0));
            sh2.setBasePrice(450.0);
            showService.createShow(sh2);

            ShowRequestDto sh3 = new ShowRequestDto();
            sh3.setScreenId(savedSc1.getId());
            sh3.setMovieId("33333333-3333-3333-3333-333333333333"); // Top Gun: Maverick
            sh3.setShowDate(LocalDate.now());
            sh3.setShowTime(LocalTime.of(14, 15));
            sh3.setBasePrice(300.0);
            showService.createShow(sh3);

            ShowRequestDto sh4 = new ShowRequestDto();
            sh4.setScreenId(savedSc1.getId());
            sh4.setMovieId("44444444-4444-4444-4444-444444444444"); // Barbie
            sh4.setShowDate(LocalDate.now());
            sh4.setShowTime(LocalTime.of(10, 30));
            sh4.setBasePrice(250.0);
            showService.createShow(sh4);
            
            ShowRequestDto sh5 = new ShowRequestDto();
            sh5.setScreenId(savedSc1.getId());
            sh5.setMovieId("55555555-5555-5555-5555-555555555555"); // Cinematic 5
            sh5.setShowDate(LocalDate.now());
            sh5.setShowTime(LocalTime.of(23, 15));
            sh5.setBasePrice(200.0);
            showService.createShow(sh5);

            // Create Theatre 2
            TheatreRequestDto t2 = new TheatreRequestDto();
            t2.setName("CineNest Luxe - Delhi");
            t2.setCity("Delhi");
            t2.setAddress("456 Connaught Place, New Delhi");
            t2.setAmenities("{\"parking\": true, \"food\": true, \"recliner\": true}");
            theatreService.createTheatre(t2);

            System.out.println("Seeding Completed.");
        }
    }
}
