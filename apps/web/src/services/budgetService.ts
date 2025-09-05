'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useBudgetStore, useGoalStore, type Budget, type Goal } from '../stores/budgetStore';

// Query Keys
export const budgetKeys = {
  all: ['budgets'] as const,
  lists: () => [...budgetKeys.all, 'list'] as const,
  list: (period: string) => [...budgetKeys.lists(), period] as const,
  details: () => [...budgetKeys.all, 'detail'] as const,
  detail: (id: string) => [...budgetKeys.details(), id] as const,
  stats: () => [...budgetKeys.all, 'stats'] as const,
};

export const goalKeys = {
  all: ['goals'] as const,
  lists: () => [...goalKeys.all, 'list'] as const,
  details: () => [...goalKeys.all, 'detail'] as const,
  detail: (id: string) => [...goalKeys.details(), id] as const,
  progress: () => [...goalKeys.all, 'progress'] as const,
};

// Mock API functions
const budgetApi = {
  getBudgets: async (period?: string): Promise<Budget[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const { budgets } = useBudgetStore.getState();
    
    return budgets.filter(budget => budget.isActive);
  },

  getBudget: async (id: string): Promise<Budget> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const { budgets } = useBudgetStore.getState();
    const budget = budgets.find(b => b.id === id);
    
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }
    
    return budget;
  },

  createBudget: async (data: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Budget> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBudget: Budget = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    useBudgetStore.getState().addBudget(data);
    
    return newBudget;
  },

  updateBudget: async (id: string, data: Partial<Budget>): Promise<Budget> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { budgets, updateBudget } = useBudgetStore.getState();
    const budget = budgets.find(b => b.id === id);
    
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }
    
    const updatedBudget = {
      ...budget,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    updateBudget(id, data);
    
    return updatedBudget;
  },

  deleteBudget: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    useBudgetStore.getState().deleteBudget(id);
  },

  getBudgetStats: async (): Promise<{
    totalBudget: number;
    totalSpent: number;
    remaining: number;
    overBudgetCount: number;
    budgetUtilization: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { budgets } = useBudgetStore.getState();
    const activeBudgets = budgets.filter(b => b.isActive);
    
    const totalBudget = activeBudgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = activeBudgets.reduce((sum, b) => sum + b.spent, 0);
    const remaining = totalBudget - totalSpent;
    const overBudgetCount = activeBudgets.filter(b => b.spent > b.amount).length;
    const budgetUtilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    
    return {
      totalBudget,
      totalSpent,
      remaining,
      overBudgetCount,
      budgetUtilization,
    };
  },
};

const goalApi = {
  getGoals: async (): Promise<Goal[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const { goals } = useGoalStore.getState();
    
    return goals.sort((a, b) => {
      // Sort by priority and then by target date
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
    });
  },

  getGoal: async (id: string): Promise<Goal> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const { goals } = useGoalStore.getState();
    const goal = goals.find(g => g.id === id);
    
    if (!goal) {
      throw new Error('Meta não encontrada');
    }
    
    return goal;
  },

  createGoal: async (data: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newGoal: Goal = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    useGoalStore.getState().addGoal(data);
    
    return newGoal;
  },

  updateGoal: async (id: string, data: Partial<Goal>): Promise<Goal> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { goals, updateGoal } = useGoalStore.getState();
    const goal = goals.find(g => g.id === id);
    
    if (!goal) {
      throw new Error('Meta não encontrada');
    }
    
    const updatedGoal = {
      ...goal,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    updateGoal(id, data);
    
    return updatedGoal;
  },

  deleteGoal: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    useGoalStore.getState().deleteGoal(id);
  },

  addContribution: async (goalId: string, amount: number): Promise<Goal> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { goals, addContribution } = useGoalStore.getState();
    const goal = goals.find(g => g.id === goalId);
    
    if (!goal) {
      throw new Error('Meta não encontrada');
    }
    
    addContribution(goalId, amount);
    
    return { ...goal, currentAmount: goal.currentAmount + amount };
  },

  getGoalProgress: async (): Promise<{
    totalGoals: number;
    activeGoals: number;
    completedGoals: number;
    totalTarget: number;
    totalSaved: number;
    overallProgress: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { goals } = useGoalStore.getState();
    
    const totalGoals = goals.length;
    const activeGoals = goals.filter(g => g.status === 'active').length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;
    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
    const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
    
    return {
      totalGoals,
      activeGoals,
      completedGoals,
      totalTarget,
      totalSaved,
      overallProgress,
    };
  },
};

// Budget React Query Hooks
export function useBudgets(period?: string) {
  return useQuery({
    queryKey: budgetKeys.list(period || 'current'),
    queryFn: () => budgetApi.getBudgets(period),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useBudget(id: string) {
  return useQuery({
    queryKey: budgetKeys.detail(id),
    queryFn: () => budgetApi.getBudget(id),
    enabled: !!id,
  });
}

export function useBudgetStats() {
  return useQuery({
    queryKey: budgetKeys.stats(),
    queryFn: budgetApi.getBudgetStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: budgetApi.createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) =>
      budgetApi.updateBudget(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
      queryClient.invalidateQueries({ queryKey: budgetKeys.detail(id) });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: budgetApi.deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
    },
  });
}

// Goal React Query Hooks
export function useGoals() {
  return useQuery({
    queryKey: goalKeys.lists(),
    queryFn: goalApi.getGoals,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: goalKeys.detail(id),
    queryFn: () => goalApi.getGoal(id),
    enabled: !!id,
  });
}

export function useGoalProgress() {
  return useQuery({
    queryKey: goalKeys.progress(),
    queryFn: goalApi.getGoalProgress,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: goalApi.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Goal> }) =>
      goalApi.updateGoal(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
      queryClient.invalidateQueries({ queryKey: goalKeys.detail(id) });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: goalApi.deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useAddContribution() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ goalId, amount }: { goalId: string; amount: number }) =>
      goalApi.addContribution(goalId, amount),
    onSuccess: (_, { goalId }) => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
      queryClient.invalidateQueries({ queryKey: goalKeys.detail(goalId) });
    },
  });
}
