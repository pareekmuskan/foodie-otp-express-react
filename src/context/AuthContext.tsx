
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  sendOtp: (email: string) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - using relative URLs to work with Lovable's preview environment
const API_BASE_URL = '';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      console.log('Attempting login with:', email);
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok) {
        const userData = { email, name: data.name };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Logged in successfully');
        return true;
      } else {
        toast.error(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('Attempting signup with:', { name, email });
      
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration error response:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      toast.success('Registration successful! Please verify your email.');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('Sending OTP to:', email);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      toast.success('OTP sent to your email');
      return true;
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error('An error occurred while sending OTP');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('Verifying OTP for:', email);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      toast.success('OTP verified successfully');
      return true;
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error('An error occurred during OTP verification');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      sendOtp,
      verifyOtp,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
