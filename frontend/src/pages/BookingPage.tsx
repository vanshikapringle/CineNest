import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovieById } from '../services/api';
import { TheatreListings } from '../components/TheatreListings';
import { ArrowLeft, X } from 'lucide-react';
import { DashboardNavbar } from '../components/DashboardNavbar';

export function BookingPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  // Generate 5 days starting from today
  const dates = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNum = d.getDate().toString();
    const dateStr = d.toLocaleDateString('en-CA');
    return {
      date: dateStr,
      dayName: dayName,
      dayNum: dayNum
    };
  });

  const [selectedDate, setSelectedDate] = useState(dates[0].date);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId!),
    enabled: !!movieId,
  });

  if (isLoading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-400">Loading booking details...</div>;
  }

  if (isError || !movie) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-crimson-red">Failed to load movie.</div>;
  }

  return (
    <>
      <DashboardNavbar />
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed font-body text-white pt-20"
        style={{ backgroundImage: `url('/dashboard-bg.jpg.jpeg')`, backgroundColor: 'rgba(5,5,5,0.9)', backgroundBlendMode: 'overlay' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-heading font-bold text-white">{movie.title}</h1>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{movie.language || 'ENGLISH'} • IMAX 3D</p>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        
        {/* Date Selector Wrapper */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-2 bg-gray-900/40 p-2 rounded-2xl border border-white/5 overflow-x-auto scrollbar-hide">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all ${
                  selectedDate === d.date 
                    ? 'bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className={`text-xs font-semibold mb-1 ${selectedDate === d.date ? 'text-gray-200' : 'text-gray-500'}`}>
                  {d.dayName}
                </span>
                <span className={`text-xl font-bold ${selectedDate === d.date ? 'text-white' : 'text-gray-400'}`}>
                  {d.dayNum}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Theatre & Show Listings */}
        {movieId && <TheatreListings movieId={movieId} date={selectedDate} />}

      </div>
      </div>
    </>
  );
}
