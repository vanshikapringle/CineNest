import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { PaymentPage } from './pages/PaymentPage';
import { BookingPage } from './pages/BookingPage';
import { BookingSummaryPage } from './pages/BookingSummaryPage';
import { TicketPage } from './pages/TicketPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AppLoader } from './components/AppLoader';
import { ProtectedRoute } from './components/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <AppLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-midnight-black text-soft-white font-body selection:bg-blue-500/30 selection:text-white relative z-10">
          {/* Global Film Grain Overlay */}
          <div className="film-grain fixed"></div>
          
          <Navbar />
          <div className="pt-20"> {/* Padding for fixed navbar */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/booking/:movieId" element={<BookingPage />} />
              <Route path="/book/:showId" element={<SeatSelectionPage />} />
              <Route path="/summary" element={<BookingSummaryPage />} />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } />
              <Route path="/ticket/:bookingId" element={
                <ProtectedRoute>
                  <TicketPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <UserDashboardPage />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
