'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  language: string;
  dateFormat: string;
  numberFormat: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    budgetAlerts: boolean;
    goalReminders: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

interface UiState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  activeView: string;
  loading: boolean;
  error: string | null;
}

// State interfaces
interface AppState {
  settings: AppSettings;
  ui: UiState;
  isInitialized: boolean;
}

interface AppActions {
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveView: (view: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetSettings: () => void;
  initialize: () => void;
}

type AppStore = AppState & AppActions;

// Default settings
const defaultSettings: AppSettings = {
  theme: 'system',
  currency: 'BRL',
  language: 'pt-BR',
  dateFormat: 'DD/MM/YYYY',
  numberFormat: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  notifications: {
    email: true,
    push: true,
    budgetAlerts: true,
    goalReminders: true,
    weeklyReports: false,
  },
  privacy: {
    dataSharing: false,
    analytics: true,
    marketing: false,
  },
};

const defaultUiState: UiState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  activeView: 'dashboard',
  loading: false,
  error: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      settings: defaultSettings,
      ui: defaultUiState,
      isInitialized: false,

      // Actions
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      toggleSidebar: () => {
        set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
        }));
      },

      setSidebarCollapsed: (collapsed) => {
        set((state) => ({
          ui: { ...state.ui, sidebarCollapsed: collapsed },
        }));
      },

      setActiveView: (view) => {
        set((state) => ({
          ui: { ...state.ui, activeView: view },
        }));
      },

      setLoading: (loading) => {
        set((state) => ({
          ui: { ...state.ui, loading },
        }));
      },

      setError: (error) => {
        set((state) => ({
          ui: { ...state.ui, error },
        }));
      },

      clearError: () => {
        set((state) => ({
          ui: { ...state.ui, error: null },
        }));
      },

      resetSettings: () => {
        set({
          settings: defaultSettings,
          ui: defaultUiState,
        });
      },

      initialize: () => {
        set({ isInitialized: true });
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        settings: state.settings,
        ui: {
          sidebarCollapsed: state.ui.sidebarCollapsed,
          activeView: state.ui.activeView,
        },
        isInitialized: state.isInitialized,
      }),
    }
  )
);
