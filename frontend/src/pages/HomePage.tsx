import { useQuery } from '@tanstack/react-query';
import { HeroCarousel } from '../components/HeroCarousel';
import { MoviesSection } from '../components/MoviesSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { useCityStore } from '../store/useCityStore';
import { CitySelectionModal } from '../components/CitySelectionModal';
import { getMovies } from '../services/api';

export function HomePage() {
  const selectedCity = useCityStore((state) => state.selectedCity);

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getMovies()
  });

  return (
    <div className="bg-[#0A0A0A] font-body selection:bg-blue-500/30 selection:text-white">
      {/* City Selection Modal triggers if no city selected */}
      {!selectedCity && <CitySelectionModal />}

      <HeroCarousel />
      
      <main className="flex flex-col gap-8 sm:gap-12 relative z-10">
        <MoviesSection movies={movies || []} isLoading={isLoading} isError={isError} isClickable={false} />
        
        {/* Subtle dividers between sections matching the premium dark theme */}
        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <FeaturesSection />

        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <TestimonialsSection />

        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <FAQSection />

        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
