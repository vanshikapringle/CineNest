import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getShowByIdLive, getMovieById } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { Ticket, CreditCard } from 'lucide-react';
import { DashboardNavbar } from '../components/DashboardNavbar';

export function BookingSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  // State from SeatSelectionPage
  const state = location.state as { 
    showId: string, 
    selectedSeats: any[], 
    totalAmount: number,
    activeUserId: string 
  };

  if (!state || !state.showId) {
    return <Navigate to="/" replace />;
  }

  const { data: show, isLoading: isLoadingShow } = useQuery({
    queryKey: ['show', state.showId],
    queryFn: () => getShowByIdLive(state.showId),
  });

  const movieId = show?.movieId;

  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId!),
    enabled: !!movieId,
  });

  const convenienceFee = state.totalAmount * 0.10;
  const gst = (state.totalAmount + convenienceFee) * 0.18;
  const grandTotal = state.totalAmount + convenienceFee + gst;

  const handleContinue = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/summary', data: { ...state, totalAmount: grandTotal } } });
    } else {
      navigate('/payment', { state: { ...state, totalAmount: grandTotal } });
    }
  };

  if (isLoadingShow || isLoadingMovie) {
    return <div className="min-h-screen bg-midnight-black flex items-center justify-center text-gray-400">Preparing your summary...</div>;
  }
  return (
    <>
      <DashboardNavbar />
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed pt-28, pb-20"
        style={{ backgroundImage: `url('/dashboard-bg.jpg.jpeg')`, backgroundColor: 'rgba(5,5,5,0.88)', backgroundBlendMode: 'overlay' }}
      >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <h1 className="text-3xl font-heading font-bold text-white mb-8 text-center">Booking Summary</h1>
        
        <div className="bg-gray-900/50 rounded-xl border border-white/10 p-6 md:p-8 backdrop-blur-md shadow-2xl">
          
          {/* Movie Details */}
          <div className="flex gap-6 border-b border-white/10 pb-6 mb-6">
            <div className="w-24 h-36 shrink-0 rounded-md overflow-hidden border border-white/10 hidden sm:block">
              <img src={movie?.posterUrl} alt="Movie Poster" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{movie?.title || 'Unknown Movie'}</h2>
              <p className="text-gray-400 mb-1">CineNest Prime</p> {/* Theatre name placeholder as backend Show doesn't return theatre details without extra queries */}
              <p className="text-gray-400 text-sm">{show?.showDate} | {show?.showTime?.substring(0, 5)}</p>
            </div>
          </div>

          {/* Seats Info */}
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-6">
            <div>
              <p className="text-gray-400 mb-1">Selected Seats</p>
              <p className="text-white font-medium flex flex-wrap gap-2">
                {state.selectedSeats.map(s => (
                  <span key={s.id} className="bg-white/10 px-2 py-1 rounded text-sm">{s.row}-{s.number}</span>
                ))}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 mb-1">Tickets</p>
              <p className="text-white font-medium text-lg">{state.selectedSeats.length}</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-8 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Base Price ({state.selectedSeats.length} Tickets)</span>
              <span>₹{state.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Convenience Fee (10%)</span>
              <span>₹{convenienceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>GST (18%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/10">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            onClick={handleContinue}
            className="w-full bg-crimson-red hover:bg-rose-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2"
          >
            {isAuthenticated ? (
              <><CreditCard className="w-5 h-5" /> Proceed to Payment</>
            ) : (
              <><Ticket className="w-5 h-5" /> Login to Continue</>
            )}
          </button>
          
        </div>
        
      </div>
    </div>
    </>
  );
}
