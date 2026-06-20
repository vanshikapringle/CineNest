import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { loginUser } from '../services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const from = location.state?.from || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      setAuth(response.token, {
        id: response.userId,
        email: email,
        name: response.name || 'User',
        role: response.role || 'USER'
      });
      navigate(from, { replace: true, state: location.state?.data });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center relative overflow-hidden font-body">
      
      {/* Background Image: Official Asset */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-screen"
          style={{ backgroundImage: 'url("/auth-green-beam.jpeg")' }}
        />
        {/* Heavy Vignette to make it dark and centralized like the screenshot */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_70%)]" />
        {/* Film Grain Overlay */}
        <div className="absolute inset-0 film-grain opacity-[0.04]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[420px] px-6 relative z-10 flex flex-col items-center"
      >
        
        {/* Top Icon */}
        <div className="mb-6 flex justify-center w-full">
          <img src="/favicon.png" alt="CineNest Favicon" className="h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </div>

        {/* Headlines */}
        <h1 className="text-2xl sm:text-3xl font-medium text-white mb-2">
          Login to CineNest.
        </h1>
        <p className="text-gray-500 text-sm mb-8 font-light tracking-wide">
          Please sign in to your account below.
        </p>

        <div className="w-full space-y-5">
          
          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#222222] border border-white/5 text-gray-300 py-3.5 rounded-lg text-sm font-medium transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#222222]"></div>
            <span className="flex-shrink-0 mx-4 text-[#555555] text-xs font-medium">or continue with</span>
            <div className="flex-grow border-t border-[#222222]"></div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1.5 text-left">
              <label className="text-[13px] text-gray-400 font-medium ml-1">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-transparent focus:border-blue-500/50 text-gray-200 rounded-lg px-4 py-3.5 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-500/50 placeholder-gray-600"
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[13px] text-gray-400 font-medium">Password</label>
                <a href="#" className="text-[12px] text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-transparent focus:border-blue-500/50 text-gray-200 rounded-lg pl-4 pr-10 py-3.5 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-500/50 placeholder-gray-600"
                  placeholder="Enter your password"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Eye className="h-4 w-4" />
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white py-3.5 rounded-lg font-semibold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] mt-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
            </motion.button>
          </form>

          <div className="pt-4 flex flex-col items-center gap-3 w-full">
            <a href="#" className="text-gray-400 hover:text-white text-[13px] border-b border-gray-600 hover:border-white transition-all pb-0.5">
              Forgot password
            </a>
            <div className="relative flex items-center w-full py-2">
              <div className="flex-grow border-t border-[#222222]"></div>
              <span className="flex-shrink-0 mx-4 text-[#555555] text-xs font-medium">or</span>
              <div className="flex-grow border-t border-[#222222]"></div>
            </div>
            <Link to="/register" className="text-gray-400 hover:text-white text-[13px] border-b border-gray-600 hover:border-white transition-all pb-0.5">
              Don't have an account? Sign Up
            </Link>
          </div>
          
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 text-[11px] text-[#555555]">
        <a href="#" className="hover:text-gray-300 transition-colors">Privacy and Policy</a>
        <span>|</span>
        <a href="#" className="hover:text-gray-300 transition-colors">Terms and Conditions</a>
        <span>|</span>
        <a href="#" className="hover:text-gray-300 transition-colors ml-1">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="#" className="hover:text-gray-300 transition-colors flex items-center justify-center w-4 h-4 rounded-full bg-[#555555] hover:bg-gray-300 text-black"><span className="text-[8px] font-bold">d</span></a>
      </div>

    </div>
  );
}
