import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Ticket, Calendar, Home, Star, Search, Bookmark, Settings, Loader2, Bell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { getUserBookings, getMovies } from '../services/api';
import { DashboardNavbar } from '../components/DashboardNavbar';

export function UserDashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['user-bookings', user?.id],
    queryFn: () => getUserBookings(user!.id),
    enabled: !!user?.id,
  });

  const { data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getMovies(),
  });

  if (!isAuthenticated || !user) return null;

  return (
    <div 
      className="min-h-screen font-body pb-20 relative bg-cover bg-center bg-fixed pt-28"
      style={{ backgroundImage: `url('/cinema-light-beam.jpeg')` }}
    >
      {/* Not too dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      <DashboardNavbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-12 relative z-10 w-full px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mx-auto w-full mb-20 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-[#050505]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <h2 className="text-3xl font-light text-white mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
              <Ticket className="w-8 h-8 text-white/70" />
              Your Ticket Stubs
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-white/50 animate-spin" /></div>
            ) : bookings && bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.map((booking: any) => {
                  const movie = movies?.find((m: any) => String(m.id) === String(booking.show?.movieId));
                  return (
                  <div key={booking.id} 
                       className="relative bg-cover bg-center bg-no-repeat border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group p-6"
                       style={{ backgroundImage: `url('/mybookings.png')` }}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none"></div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 shadow-inner relative z-10">
                      <div>
                        <span className={`text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest ${booking.status === 'CONFIRMED' ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]'}`}>
                          {booking.status}
                        </span>
                        <p className="text-white font-medium mt-4 text-xl font-heading">{movie?.title || `Booking #${booking.id.substring(0, 8).toUpperCase()}`}</p>
                        <div className="flex items-center gap-6 mt-3 text-sm text-gray-300 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(booking.bookingTime || booking.show?.showDate).toLocaleDateString()}</span>
                          <span className="flex items-center gap-2"><Ticket className="w-4 h-4" /> {booking.tickets?.length || 0} Tickets</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right border-t border-white/10 sm:border-t-0 pt-4 sm:pt-0">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
                        <p className="text-3xl font-light text-white">₹{booking.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Ticket className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-3xl font-light text-white mb-2">No tickets yet</h3>
                <p className="text-gray-400 text-sm tracking-widest uppercase mb-8">Your cinematic journey begins here.</p>
                <button onClick={() => navigate('/dashboard')} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all tracking-widest uppercase text-sm">
                  Explore Now
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
