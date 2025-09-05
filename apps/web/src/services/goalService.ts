'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGoalStore, type Goal } from '../stores/budgetStore';

// Query Keys
export const goalKeys = {
  all: ['goals'] as const,
  lists: () => [...goalKeys.all, 'list'] as const,
  list: (filters: any) => [...goalKeys.lists(), { filters }] as const,
  details: () => [...goalKeys.all, 'detail'] as const,
  detail: (id: string) => [...goalKeys.details(), id] as const,
  stats: () => [...goalKeys.all, 'stats'] as const,
};

// Mock API functions
const mockApi = {
  getGoals: async (filters?: any): Promise<Goal[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const { goals } = useGoalStore.getState();
    return goals.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getGoal: async (id: string): Promise<Goal | null> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const { goals } = useGoalStore.getState();
    return goals.find((goal: Goal) => goal.id === id) || null;
  },

  createGoal: async (data: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate potential API errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Falha na conexão. Tente novamente.');
    }

    const { addGoal } = useGoalStore.getState();
    addGoal(data);
    
    // Return created goal (need to simulate response)
    const newGoal: Goal = {
      ...data,
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newGoal;
  },

  updateGoal: async ({ id, data }: { id: string; data: Partial<Goal> }): Promise<Goal> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const { goals, updateGoal } = useGoalStore.getState();
    const existingGoal = goals.find((goal: Goal) => goal.id === id);
    
    if (!existingGoal) {
      throw new Error('Meta não encontrada');
    }

    // Simulate potential API errors (3% chance)
    if (Math.random() < 0.03) {
      throw new Error('Erro ao atualizar. Tente novamente.');
    }

    const updatedGoal: Goal = {
      ...existingGoal,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    updateGoal(id, updatedGoal);
    
    return updatedGoal;
  },

  deleteGoal: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { goals, deleteGoal } = useGoalStore.getState();
    const goalExists = goals.some((goal: Goal) => goal.id === id);
    
    if (!goalExists) {
      throw new Error('Meta não encontrada');
    }

    // Simulate potential API errors (2% chance)
    if (Math.random() < 0.02) {
      throw new Error('Erro ao excluir. Tente novamente.');
    }

    deleteGoal(id);
  },

  updateGoalProgress: async ({ id, amount }: { id: string; amount: number }): Promise<Goal> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const { goals, addContribution } = useGoalStore.getState();
    const existingGoal = goals.find((goal: Goal) => goal.id === id);
    
    if (!existingGoal) {
      throw new Error('Meta não encontrada');
    }

    addContribution(id, amount);
    
    return {
      ...existingGoal,
      currentAmount: existingGoal.currentAmount + amount,
      updatedAt: new Date().toISOString(),
    };
  },

  getGoalStats: async (period: string = 'month'): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { goals } = useGoalStore.getState();
    
    const totalGoals = goals.length;
    const completedGoals = goals.filter((goal: Goal) => goal.status === 'completed').length;
    const activeGoals = goals.filter((goal: Goal) => goal.status === 'active').length;
    const totalTargetAmount = goals.reduce((sum: number, goal: Goal) => sum + goal.targetAmount, 0);
    const totalCurrentAmount = goals.reduce((sum: number, goal: Goal) => sum + goal.currentAmount, 0);
    const totalProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;
    
    const monthlyContributions = goals
      .filter((goal: Goal) => goal.status === 'active' && goal.monthlyContribution)
      .reduce((sum: number, goal: Goal) => sum + (goal.monthlyContribution || 0), 0);
    
    return {
      totalGoals,
      completedGoals,
      activeGoals,
      pausedGoals: goals.filter((goal: Goal) => goal.status === 'paused').length,
      totalTargetAmount,
      totalCurrentAmount,
      totalProgress,
      monthlyContributions,
      completionRate: totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0,
      averageProgress: goals.length > 0 ? 
        goals.reduce((sum: number, goal: Goal) => sum + (goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0), 0) / goals.length : 0,
    };
  },
};

// React Query Hooks
export function useGoals(filters?: any) {
  return useQuery({
    queryKey: goalKeys.list(filters),
    queryFn: () => mockApi.getGoals(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: goalKeys.detail(id),
    queryFn: () => mockApi.getGoal(id),
    enabled: !!id,
  });
}

export function useGoalStats(period: string = 'month') {
  return useQuery({
    queryKey: goalKeys.stats(),
    queryFn: () => mockApi.getGoalStats(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.updateGoal,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
      queryClient.setQueryData(goalKeys.detail(data.id), data);
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useUpdateGoalProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.updateGoalProgress,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
      queryClient.setQueryData(goalKeys.detail(data.id), data);
    },
  });
}
