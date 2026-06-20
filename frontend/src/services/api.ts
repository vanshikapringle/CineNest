import axios from 'axios';

// The Vite proxy routes /api requests to the appropriate backend service
export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor to attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('cinenest_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const loginUser = async (credentials: any) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  return data;
};

export const registerUser = async (userData: any) => {
  const { data } = await apiClient.post('/auth/register', userData);
  return data;
};

export const getMovies = async (status?: string, genre?: string, year?: string) => {
  const params: any = {};
  if (status) params.status = status;
  if (genre) params.genre = genre;
  if (year) params.year = year;
  const { data } = await apiClient.get('/movies', { params });
  return data;
};

export const searchMovies = async (query: string) => {
  const { data } = await apiClient.get('/movies/search', { params: { query } });
  return data;
};

export const getMovieById = async (id: string) => {
  const { data } = await apiClient.get(`/movies/${id}`);
  return data;
};

export const getTheatres = async (city?: string) => {
  // Database stores 'Delhi', but frontend previously allowed 'Delhi-NCR'
  const mappedCity = city === 'Delhi-NCR' ? 'Delhi' : city;
  const { data } = await apiClient.get('/theatres', { params: { city: mappedCity } });
  return data;
};

export const getShowsByTheatre = async (theatreId: string) => {
  const { data } = await apiClient.get(`/shows/theatre/${theatreId}`);
  return data;
};

export const getShowByIdLive = async (showId: string) => {
  const { data } = await apiClient.get(`/shows/${showId}`);
  return data;
};

export const getSeatsForShow = async (showId: string) => {
  const { data } = await apiClient.get(`/shows/${showId}/seats`);
  return data;
};

export const getUnavailableSeats = async (showId: string) => {
  const { data } = await apiClient.get(`/bookings/shows/${showId}/unavailable-seats`);
  return data;
};

export const lockSeat = async (showId: string, seatId: string, userId: string) => {
  const { data } = await apiClient.post('/bookings/lock-seat', { showId, seatId, userId });
  return data;
};

export const unlockSeat = async (showId: string, seatId: string, userId: string) => {
  const { data } = await apiClient.post('/bookings/unlock-seat', { showId, seatId, userId });
  return data;
};

export const createBooking = async (bookingData: any) => {
  const { data } = await apiClient.post(`/bookings`, bookingData);
  return data;
};

export const confirmBooking = async (bookingId: string) => {
  const { data } = await apiClient.post(`/bookings/${bookingId}/confirm`);
  return data;
};

export const processPayment = async (paymentData: { bookingId: string, amount: number }) => {
  const { data } = await apiClient.post('/payments/process', paymentData);
  return data;
};

export const getUserBookings = async (userId: string) => {
  const { data } = await apiClient.get(`/bookings/user/${userId}`);
  return data;
};
