import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Share2, MapPin, Calendar, Clock, Monitor } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getShowByIdLive, getMovies } from '../services/api';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { DashboardNavbar } from '../components/DashboardNavbar';
import QRCode from 'react-qr-code';

export function TicketPage() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { confirmedBooking, selectedSeats } = location.state || {};

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const { data: show } = useQuery({
    queryKey: ['show', confirmedBooking?.showId],
    queryFn: () => getShowByIdLive(confirmedBooking?.showId!),
    enabled: !!confirmedBooking?.showId,
  });

  const { data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getMovies()
  });

  if (!confirmedBooking) {
    return <div className="min-h-screen bg-midnight-black text-white flex items-center justify-center">Booking not found.</div>;
  }

  const movie = movies?.find(m => m.id === show?.movieId);
  const seatsStr = selectedSeats?.map((s: any) => `${s.row}-${s.number}`).join(', ') || 'N/A';

  return (
    <>
      <DashboardNavbar />
      <div 
        className="min-h-screen pt-28 pb-12 flex items-center justify-center font-body p-4 relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/film-grain-overlay.jpeg')` }}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Your Ticket</h1>
            <p className="text-emerald-400 font-medium text-sm mt-2">Booking Confirmed</p>
          </div>

          {/* Cinematic Ticket Container */}
          <div className="bg-[#111] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            
            {/* Header Image */}
            <div className="h-48 bg-gray-800 relative">
              {movie?.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover opacity-70" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-crimson-red opacity-50"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-bold text-white mb-1">{movie?.title || 'Movie Title'}</h2>
                <span className="bg-crimson-red/20 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/30">
                  {movie?.certification || 'U/A'}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Theatre</p>
                  <p className="text-white font-medium text-sm leading-tight">CineNest Prime</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Monitor className="w-3 h-3"/> Screen</p>
                  <p className="text-white font-medium text-sm">Screen 1</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Date</p>
                  <p className="text-white font-medium text-sm">{show?.showDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Time</p>
                  <p className="text-white font-medium text-sm">{show?.showTime || 'N/A'}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-dashed border-gray-700 relative">
                <div className="absolute -left-8 -top-3 w-6 h-6 bg-midnight-black rounded-full border-r border-white/10"></div>
                <div className="absolute -right-8 -top-3 w-6 h-6 bg-midnight-black rounded-full border-l border-white/10"></div>
              </div>

              {/* Seats & Price */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Seats ({selectedSeats?.length})</p>
                  <p className="text-lg font-bold text-white text-emerald-400">{seatsStr}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Amount</p>
                  <p className="text-lg font-bold text-white">₹{confirmedBooking?.totalAmount?.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              {/* Realistic QR Code */}
              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-inner">
                <div className="border-4 border-gray-100 p-2 rounded-lg bg-white">
                  <QRCode 
                    value={`CineNest-Ticket-${bookingId}-${user?.id || 'GUEST'}`}
                    size={128}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                <p className="text-black text-[10px] tracking-widest mt-3 font-mono uppercase">SCAN AT ENTRY</p>
                <p className="text-gray-500 text-[9px] tracking-widest font-mono uppercase">ID: {bookingId?.substring(0, 8)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button onClick={() => navigate('/dashboard')} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
              Back to Home
            </button>
            <button className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
