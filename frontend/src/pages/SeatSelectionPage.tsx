import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Monitor, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getShowByIdLive, getSeatsForShow, getUnavailableSeats, lockSeat, unlockSeat, getMovieById } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export function SeatSelectionPage() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [lockedSeats, setLockedSeats] = useState<string[]>([]);

  // Guest ID logic for unauthenticated users
  const [guestId] = useState(() => {
    const existing = sessionStorage.getItem('cinenest_guest_id');
    if (existing) return existing;
    const newId = crypto.randomUUID();
    sessionStorage.setItem('cinenest_guest_id', newId);
    return newId;
  });

  const activeUserId = user?.id || guestId;
  // Fetch show details
  const { data: show, isLoading: isLoadingShow } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowByIdLive(showId!),
    enabled: !!showId,
  });

  // Fetch seat map
  const { data: seatMap, isLoading: isLoadingSeats } = useQuery({
    queryKey: ['seats', showId],
    queryFn: () => getSeatsForShow(showId!),
    enabled: !!showId,
  });

  const { data: initialUnavailable } = useQuery({
    queryKey: ['unavailable-seats', showId],
    queryFn: () => getUnavailableSeats(showId!),
    enabled: !!showId,
  });

  const movieId = show?.movieId;
  const { data: movie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId!),
    enabled: !!movieId,
  });

  // Initialize locked seats
  useEffect(() => {
    if (initialUnavailable) {
      setLockedSeats(initialUnavailable);
    }
  }, [initialUnavailable]);

  // WebSocket Connection
  useEffect(() => {
    if (!showId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8084/ws-booking'),
      onConnect: () => {
        client.subscribe(`/topic/shows/${showId}`, (message) => {
          const data = JSON.parse(message.body);
          if (data.status === 'LOCKED') {
            setLockedSeats((prev) => Array.from(new Set([...prev, data.seatId])));
          } else if (data.status === 'AVAILABLE') {
            // Remove from locked seats unless it's currently selected by THIS user
            setLockedSeats((prev) => prev.filter((s) => s !== data.seatId));
          }
        });
      },
    });

    client.activate();
    return () => {
      client.deactivate();
    };
  }, [showId]);

  const toggleSeat = async (seat: any) => {
    
    // Check if it's already selected by the user
    const isSelected = selectedSeats.some(s => s.id === seat.id);

    try {
      if (isSelected) {
        // Unlock
        await unlockSeat(showId!, seat.id, activeUserId);
        setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
        setLockedSeats(prev => prev.filter(s => s !== seat.id));
      } else {
        // Lock
        await lockSeat(showId!, seat.id, activeUserId);
        setSelectedSeats(prev => [...prev, seat]);
        setLockedSeats(prev => [...prev, seat.id]);
      }
    } catch (err) {
      console.error("Failed to toggle seat lock", err);
      alert("This seat is currently unavailable.");
    }
  };

  const calculateTotal = () => {
    if (!show) return 0;
    return selectedSeats.reduce((total, seat) => {
      let multiplier = 1;
      if (seat.category === 'PREMIUM') multiplier = 1.5;
      if (seat.category === 'RECLINER') multiplier = 2.0;
      return total + (show.basePrice * multiplier);
    }, 0);
  };

  const handleContinue = () => {
    // Navigate to booking summary page
    navigate('/summary', { state: { showId, selectedSeats, totalAmount: calculateTotal(), activeUserId } });
  };

  if (isLoadingShow || isLoadingSeats) return <div className="min-h-screen bg-midnight-black flex items-center justify-center text-white"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  // Group seats by row
  const rows: Record<string, any[]> = {};
  seatMap?.forEach((seat: any) => {
    if (!rows[seat.row]) rows[seat.row] = [];
    rows[seat.row].push(seat);
  });

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed pt-24 pb-32"
      style={{ backgroundImage: `url('/dashboard-bg.jpg.jpeg')`, backgroundColor: 'rgba(5,5,5,0.85)', backgroundBlendMode: 'overlay' }}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold font-heading tracking-wide mb-2">
            {movie ? movie.title : 'Select Seats'}
          </h2>
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>{show?.screen?.name || 'Screen'}</span>
            <span>•</span>
            <span>{show?.showTime ? new Date(`2000-01-01T${show.showTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="flex flex-col items-center space-y-4 overflow-x-auto pb-8">
          {Object.keys(rows).sort().map((row) => (
            <div key={row} className="flex items-center gap-4">
              <span className="text-gray-500 font-bold w-6">{row}</span>
              <div className="flex gap-2">
                {rows[row].sort((a, b) => a.number - b.number).map((seat) => {
                  const isAisle = row !== 'J' && seat.number === 7;
                  const isSelected = selectedSeats.some(s => s.id === seat.id);
                  // A seat is visually locked if it's in lockedSeats AND not selected by THIS user
                  const isLocked = lockedSeats.includes(seat.id) && !isSelected;
                  
                  const isRecliner = seat.category === 'RECLINER';
                  const isPremium = seat.category === 'PREMIUM';

                  return (
                    <motion.button
                      whileHover={!isLocked ? { scale: 1.1 } : {}}
                      whileTap={!isLocked ? { scale: 0.95 } : {}}
                      key={seat.id}
                      onClick={() => toggleSeat(seat)}
                      disabled={isLocked}
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg rounded-b-sm border transition-all relative
                        ${isAisle ? 'mr-8 sm:mr-16' : ''}
                        ${isLocked ? 'bg-gray-800 border-gray-700 cursor-not-allowed opacity-50' 
                          : isSelected ? 'bg-crimson-red border-rose-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                          : isRecliner ? 'bg-indigo-900/40 border-indigo-500/50 hover:border-indigo-400'
                          : isPremium ? 'bg-emerald-900/40 border-emerald-500/50 hover:border-emerald-400'
                          : 'bg-white/5 border-white/20 hover:border-white/50'}
                      `}
                    >
                      {isSelected && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Screen Indicator */}
        <div className="flex flex-col items-center mt-12 mb-8">
          <div className="w-full max-w-2xl h-3 bg-gradient-to-t from-blue-500/20 to-transparent border-t border-blue-500 shadow-[0_-10px_30px_rgba(59,130,246,0.2)] rounded-[50%]" style={{ borderTopLeftRadius: '50% 10px', borderTopRightRadius: '50% 10px' }} />
          <span className="text-blue-400 text-sm mt-4 tracking-[0.3em] font-bold uppercase">Screen This Way</span>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex flex-col items-center gap-1">
              <div className="w-4 h-4 bg-white/5 border border-white/20 rounded"></div>
              <span className="text-[10px] text-gray-400 uppercase">Available</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-4 h-4 bg-gray-800 border border-gray-700 rounded"></div>
              <span className="text-[10px] text-gray-400 uppercase">Occupied</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-4 h-4 bg-crimson-red border border-rose-400 rounded"></div>
              <span className="text-[10px] text-gray-400 uppercase">Selected</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-4 border-t border-white/10 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/5 border border-white/20 rounded-t-lg"></div>
            <span className="text-gray-400 text-sm">Regular</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-900/40 border border-emerald-500/50 rounded-t-lg"></div>
            <span className="text-gray-400 text-sm">Premium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-900/40 border border-indigo-500/50 rounded-t-lg"></div>
            <span className="text-gray-400 text-sm">Recliner</span>
          </div>
        </div>

      </div>

      {/* Checkout Bar */}
      {selectedSeats.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 shadow-2xl"
        >
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Selected: <span className="text-white font-medium">{selectedSeats.map(s => `${s.row}-${s.number}`).join(', ')}</span></p>
              <p className="text-2xl font-bold text-white mt-1">Total: ₹{calculateTotal().toFixed(2)}</p>
            </div>
            <button 
              onClick={handleContinue}
              className="bg-crimson-red hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-crimson-red/20"
            >
              Continue to Summary
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
