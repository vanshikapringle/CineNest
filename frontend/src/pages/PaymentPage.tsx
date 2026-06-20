import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { createBooking, processPayment, confirmBooking } from '../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { DashboardNavbar } from '../components/DashboardNavbar';

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { showId, selectedSeats, totalAmount } = location.state || {};

  const [status, setStatus] = useState<'PROCESSING' | 'SUCCESS' | 'ERROR'>('PROCESSING');
  const [errorMsg, setErrorMsg] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!showId || !selectedSeats || !user) {
      navigate('/');
      return;
    }

    const processPaymentAndBooking = async () => {
      try {
        // 1. Create PENDING Booking
        const tickets = selectedSeats.map((seat: any) => ({
          seatId: seat.id,
          seatRow: seat.row,
          seatNumber: seat.number,
          price: totalAmount / selectedSeats.length
        }));

        const bookingReq = {
          userId: user.id,
          showId: showId,
          totalAmount: totalAmount,
          tickets: tickets
        };
        
        const newBooking = await createBooking(bookingReq);

        // 2. Process Payment
        await processPayment({
          bookingId: newBooking.id,
          amount: totalAmount
        });

        // 3. Confirm Booking
        const confirmedBooking = await confirmBooking(newBooking.id);

        setStatus('SUCCESS');
        
        queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
        
        // 4. Redirect to Digital Ticket after a brief success message
        setTimeout(() => {
          navigate(`/ticket/${confirmedBooking.id}`, { state: { confirmedBooking, selectedSeats } });
        }, 2000);

      } catch (err: any) {
        console.error("Booking failed:", err);
        setStatus('ERROR');
        setErrorMsg(err.response?.data?.message || 'Payment or Booking failed. Please try again.');
      }
    };

    processPaymentAndBooking();
  }, [showId, selectedSeats, totalAmount, user, navigate]);

  return (
    <>
      <DashboardNavbar />
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-4 relative pt-24"
        style={{ backgroundImage: `url('/film-grain-overlay.jpeg')`, backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0 pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl"
        >
        {status === 'PROCESSING' && (
          <div className="flex flex-col items-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mt-6 mb-2">Processing Payment</h2>
            <p className="text-gray-400">Please do not refresh or close this page.</p>
            <div className="mt-8 bg-black/50 rounded-lg p-4 w-full text-left">
              <p className="text-sm text-gray-500">Amount to Pay</p>
              <p className="text-xl font-bold text-white">₹{totalAmount?.toFixed(2)}</p>
            </div>
          </div>
        )}

        {status === 'SUCCESS' && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center"
          >
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-4">Generating your digital ticket...</p>
          </motion.div>
        )}

        {status === 'ERROR' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <AlertCircle className="w-20 h-20 text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            <h2 className="text-2xl font-bold text-white mb-2">Transaction Failed</h2>
            <p className="text-red-400 text-sm mb-8">{errorMsg}</p>
            <button 
              onClick={() => navigate(-1)}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Go Back
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
    </>
  );
}
