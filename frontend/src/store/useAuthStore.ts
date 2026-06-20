import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isDevAuth: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

// Load token from local storage initially
const initialToken = localStorage.getItem('cinenest_token');
const initialUser = localStorage.getItem('cinenest_user') ? JSON.parse(localStorage.getItem('cinenest_user') as string) : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken,
  user: initialUser,
  isAuthenticated: !!initialToken,
  isDevAuth: initialToken === 'mock-jwt-token',
  setAuth: (token, user) => {
    localStorage.setItem('cinenest_token', token);
    localStorage.setItem('cinenest_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isDevAuth: token === 'mock-jwt-token' });
  },
  logout: () => {
    localStorage.removeItem('cinenest_token');
    localStorage.removeItem('cinenest_user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
