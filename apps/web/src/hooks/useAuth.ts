'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

// Helper functions for cookie management
const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Mock API functions
const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  // Mock validation
  if (email === 'demo@moneymap.com' && password === 'demo123') {
    return {
      user: {
        id: '1',
        email: 'demo@moneymap.com',
        name: 'Usuário Demo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-123',
    };
  }
  
  throw new Error('Email ou senha incorretos');
};

const mockRegister = async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  
  // Mock validation
  if (email === 'test@test.com') {
    throw new Error('Este email já está em uso');
  }
  
  return {
    user: {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      createdAt: new Date().toISOString(),
    },
    token: 'mock-jwt-token-456',
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: false,
      isAuthenticated: false,
      token: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const { user, token } = await mockLogin(email, password);
          
          // Set authentication cookie
          if (typeof window !== 'undefined') {
            setCookie('auth-token', token, 30);
          }
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Erro desconhecido' 
          };
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const { user, token } = await mockRegister(name, email, password);
          
          // Set authentication cookie
          if (typeof window !== 'undefined') {
            setCookie('auth-token', token, 30);
          }
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Erro desconhecido' 
          };
        }
      },

      logout: () => {
        // Clear authentication cookie
        if (typeof window !== 'undefined') {
          deleteCookie('auth-token');
        }
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      clearError: () => {
        // Future implementation for error state
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
