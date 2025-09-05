'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Budget {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'yearly';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  alerts: {
    enabled: boolean;
    threshold: number; // percentage
  };
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  monthlyContribution?: number;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

// State interfaces
interface BudgetState {
  budgets: Budget[];
  selectedBudget: Budget | null;
  isLoading: boolean;
  currentPeriod: string; // YYYY-MM format
}

interface BudgetActions {
  setBudgets: (budgets: Budget[]) => void;
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  setSelectedBudget: (budget: Budget | null) => void;
  setCurrentPeriod: (period: string) => void;
  setLoading: (loading: boolean) => void;
}

interface GoalState {
  goals: Goal[];
  selectedGoal: Goal | null;
  isLoading: boolean;
}

interface GoalActions {
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  setSelectedGoal: (goal: Goal | null) => void;
  addContribution: (goalId: string, amount: number) => void;
  setGoalLoading: (loading: boolean) => void;
}

type BudgetStore = BudgetState & BudgetActions;
type GoalStore = GoalState & GoalActions;

// Mock data
const mockBudgets: Budget[] = [
  {
    id: '1',
    categoryId: 'food',
    categoryName: 'Alimentação',
    categoryColor: '#f59e0b',
    amount: 800,
    spent: 450,
    period: 'monthly',
    startDate: '2024-01-01',
    isActive: true,
    alerts: {
      enabled: true,
      threshold: 80,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    categoryId: 'transport',
    categoryName: 'Transporte',
    categoryColor: '#3b82f6',
    amount: 400,
    spent: 320,
    period: 'monthly',
    startDate: '2024-01-01',
    isActive: true,
    alerts: {
      enabled: true,
      threshold: 90,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Viagem para Europa',
    description: 'Economizar para uma viagem de 15 dias pela Europa',
    targetAmount: 15000,
    currentAmount: 3500,
    targetDate: '2024-12-15',
    category: 'Viagem',
    priority: 'high',
    status: 'active',
    monthlyContribution: 1000,
    color: '#8b5cf6',
    icon: '✈️',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Reserva de Emergência',
    description: 'Guardar 6 meses de gastos para emergências',
    targetAmount: 30000,
    currentAmount: 12000,
    targetDate: '2024-06-30',
    category: 'Emergência',
    priority: 'high',
    status: 'active',
    monthlyContribution: 3000,
    color: '#ef4444',
    icon: '🛡️',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Budget Store
export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set, get) => ({
      // Initial state
      budgets: mockBudgets,
      selectedBudget: null,
      isLoading: false,
      currentPeriod: new Date().toISOString().slice(0, 7), // YYYY-MM

      // Actions
      setBudgets: (budgets) => set({ budgets }),

      addBudget: (budgetData) => {
        const newBudget: Budget = {
          ...budgetData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          budgets: [...state.budgets, newBudget],
        }));
      },

      updateBudget: (id, updates) => {
        set((state) => ({
          budgets: state.budgets.map((budget) =>
            budget.id === id
              ? { ...budget, ...updates, updatedAt: new Date().toISOString() }
              : budget
          ),
        }));
      },

      deleteBudget: (id) => {
        set((state) => ({
          budgets: state.budgets.filter((budget) => budget.id !== id),
          selectedBudget: state.selectedBudget?.id === id ? null : state.selectedBudget,
        }));
      },

      setSelectedBudget: (budget) => set({ selectedBudget: budget }),
      setCurrentPeriod: (period) => set({ currentPeriod: period }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'budget-storage',
      partialize: (state) => ({
        budgets: state.budgets,
        currentPeriod: state.currentPeriod,
      }),
    }
  )
);

// Goal Store
export const useGoalStore = create<GoalStore>()(
  persist(
    (set, get) => ({
      // Initial state
      goals: mockGoals,
      selectedGoal: null,
      isLoading: false,

      // Actions
      setGoals: (goals) => set({ goals }),

      addGoal: (goalData) => {
        const newGoal: Goal = {
          ...goalData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
              : goal
          ),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
          selectedGoal: state.selectedGoal?.id === id ? null : state.selectedGoal,
        }));
      },

      setSelectedGoal: (goal) => set({ selectedGoal: goal }),

      addContribution: (goalId, amount) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? { 
                  ...goal, 
                  currentAmount: goal.currentAmount + amount,
                  updatedAt: new Date().toISOString(),
                }
              : goal
          ),
        }));
      },

      setGoalLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'goal-storage',
      partialize: (state) => ({
        goals: state.goals,
      }),
    }
  )
);
