import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Info } from 'lucide-react';
import { getTheatres, getShowsByTheatre } from '../services/api';
import { useCityStore } from '../store/useCityStore';

export function TheatreListings({ movieId, date }: { movieId: string, date: string }) {
  const [theatres, setTheatres] = useState<any[]>([]);
  const [showsByTheatre, setShowsByTheatre] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const selectedCity = useCityStore((state) => state.selectedCity);

  useEffect(() => {
    async function fetchTheatresAndShows() {
      try {
        setIsLoading(true);
        const fetchedTheatres = await getTheatres(selectedCity || undefined);
        
        const showsMap: Record<string, any[]> = {};
        for (const theatre of fetchedTheatres) {
          const shows = await getShowsByTheatre(theatre.id);
          // Filter by movieId AND the selected date (handling potential timezone 'T' string formats)
          const movieShows = shows.filter((s: any) => {
            const rawDate = s.showDate.includes('T') ? s.showDate.split('T')[0] : s.showDate;
            return s.movieId === movieId && rawDate === date;
          });
          
          // Sort shows by time
          if (movieShows.length > 0) {
            showsMap[theatre.id] = movieShows.sort((a, b) => a.showTime.localeCompare(b.showTime));
          }
        }

        const activeTheatres = fetchedTheatres.filter((t: any) => showsMap[t.id]);
        setTheatres(activeTheatres);
        setShowsByTheatre(showsMap);
      } catch (err) {
        console.error("Failed to fetch theatres or shows:", err);
        setError("Unable to load theatre timings. Please ensure backend services are running.");
      } finally {
        setIsLoading(false);
      }
    }

    if (movieId && date) {
      fetchTheatresAndShows();
    }
  }, [movieId, date, selectedCity]);

  // Format "10:33:00" to "10:33 am"
  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour.toString().padStart(2, '0')}:${m} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-gray-900/50 rounded-2xl w-full border border-white/5"></div>
        <div className="h-32 bg-gray-900/50 rounded-2xl w-full border border-white/5"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl text-red-400 text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (theatres.length === 0) {
    return (
      <div className="text-gray-400 italic bg-gray-900/30 p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
        <Clock className="w-8 h-8 mb-3 opacity-50" />
        <p>No shows available on this date for the selected movie.</p>
        <p className="text-sm mt-2 opacity-70">Try selecting a different date from the top.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {theatres.map((theatre) => (
        <div key={theatre.id} className="bg-[#111111] rounded-2xl p-6 border border-white/5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
              <h3 className="text-lg font-heading font-semibold text-white">{theatre.name}</h3>
            </div>
            <button className="text-gray-500 hover:text-gray-300 transition-colors">
              <Info className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 ml-8 mb-6">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">English</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">2D</span>
          </div>
          
          <div className="flex flex-wrap gap-4 ml-8">
            {showsByTheatre[theatre.id]?.map((show: any) => {
              const displayTime = formatTime(show.showTime);
              return (
                <button 
                  key={show.id}
                  onClick={() => navigate(`/book/${show.id}`)}
                  className="group relative flex items-center justify-center border border-[#14b8a6]/40 hover:border-[#14b8a6] bg-transparent hover:bg-[#14b8a6]/10 transition-all rounded px-4 py-2 min-w-[100px]"
                >
                  <span className="text-[#14b8a6] font-medium text-sm tracking-wide group-hover:text-[#109888]">{displayTime}</span>
                  
                  {/* Tooltip for price */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none shadow-xl">
                    ₹{show.basePrice}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
