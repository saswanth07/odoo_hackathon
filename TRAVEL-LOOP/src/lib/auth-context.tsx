import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
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
    // Mock login: if username is 'admin', set role as admin
    const isAdmin = credentials.username?.toLowerCase() === 'admin';
    const mockUser: User = {
      name: credentials.username || 'Alex Danvers',
      email: isAdmin ? 'admin@traveloop.com' : 'alex.danvers@example.com',
      role: isAdmin ? 'admin' : 'user',
      avatar: isAdmin 
        ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
        : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    };
    setUser(mockUser);
    localStorage.setItem('travel_loop_user', JSON.stringify(mockUser));
  };

  const register = async (data: any) => {
    // Mock register
    const newUser: User = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.firstName}`
    };
    setUser(newUser);
    localStorage.setItem('travel_loop_user', JSON.stringify(newUser));
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
