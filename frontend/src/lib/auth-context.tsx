import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from './api';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin' | string;
  avatar?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('travel_loop_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: any) => {
    try {
      // Expecting { email, password } based on backend
      // But if frontend uses { username, password }, we map username to email for now
      const email = credentials.email || credentials.username;
      const response = await api.post('/auth/login', {
        email: email,
        password: credentials.password
      });
      
      const resData = response.data.data; // ApiResponse wrapping { token, user: { name, email, role, ... } }
      
      const loggedInUser: User = {
        name: resData.user.name,
        email: resData.user.email,
        role: resData.user.role || 'user',
        token: resData.token,
        avatar: 'https://images.unsplash.com/photo-1535713875002-e17112ad4462?q=80&w=100'
      };
      
      setUser(loggedInUser);
      localStorage.setItem('travel_loop_user', JSON.stringify(loggedInUser));
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response = await api.post('/auth/signup', {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password
      });
      
      // Auto-login after successful registration
      await login({ email: data.email, password: data.password });
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travel_loop_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
