'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTransactionStore, type Transaction } from '../stores/transactionStore';

// Query Keys
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters: any) => [...transactionKeys.lists(), { filters }] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
  stats: () => [...transactionKeys.all, 'stats'] as const,
};

// Mock API functions
const mockApi = {
  getTransactions: async (filters?: any): Promise<Transaction[]> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    // Get transactions from store
    const { transactions } = useTransactionStore.getState();
    
    // Apply filters if any
    let filteredTransactions = [...transactions];
    
    if (filters?.search) {
      filteredTransactions = filteredTransactions.filter(t => 
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters?.types?.length > 0) {
      filteredTransactions = filteredTransactions.filter(t => 
        filters.types.includes(t.type)
      );
    }
    
    if (filters?.categories?.length > 0) {
      filteredTransactions = filteredTransactions.filter(t => 
        filters.categories.includes(t.category)
      );
    }
    
    if (filters?.dateRange) {
      const [startDate, endDate] = filters.dateRange;
      filteredTransactions = filteredTransactions.filter(t => 
        t.date >= startDate && t.date <= endDate
      );
    }
    
    return filteredTransactions.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  getTransaction: async (id: string): Promise<Transaction> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const { transactions } = useTransactionStore.getState();
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) {
      throw new Error('Transação não encontrada');
    }
    
    return transaction;
  },

  createTransaction: async (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTransaction: Transaction = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    useTransactionStore.getState().addTransaction(data);
    
    return newTransaction;
  },

  updateTransaction: async (id: string, data: Partial<Transaction>): Promise<Transaction> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { transactions, updateTransaction } = useTransactionStore.getState();
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) {
      throw new Error('Transação não encontrada');
    }
    
    const updatedTransaction = {
      ...transaction,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    updateTransaction(id, data);
    
    return updatedTransaction;
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const { transactions, deleteTransaction } = useTransactionStore.getState();
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) {
      throw new Error('Transação não encontrada');
    }
    
    deleteTransaction(id);
  },

  getTransactionStats: async (period: string = 'month'): Promise<{
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
    categoryBreakdown: Array<{ category: string; amount: number; percentage: number; color: string }>;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const { transactions } = useTransactionStore.getState();
    
    // Filter by period (simplified - would be more complex in real app)
    const now = new Date();
    const startOfPeriod = period === 'month' 
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : new Date(now.getFullYear(), 0, 1);
    
    const filteredTransactions = transactions.filter(t => 
      new Date(t.date) >= startOfPeriod
    );
    
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const balance = totalIncome - totalExpense;
    
    // Category breakdown
    const categoryMap = new Map<string, { amount: number; color: string }>();
    
    filteredTransactions.forEach(t => {
      const current = categoryMap.get(t.category) || { amount: 0, color: t.categoryColor };
      categoryMap.set(t.category, {
        amount: current.amount + Math.abs(t.amount),
        color: t.categoryColor,
      });
    });
    
    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      amount: data.amount,
      percentage: totalExpense > 0 ? (data.amount / totalExpense) * 100 : 0,
      color: data.color,
    }));
    
    return {
      totalIncome,
      totalExpense,
      balance,
      transactionCount: filteredTransactions.length,
      categoryBreakdown: categoryBreakdown.sort((a, b) => b.amount - a.amount),
    };
  },
};

// React Query Hooks
export function useTransactions(filters?: any) {
  return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => mockApi.getTransactions(filters),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => mockApi.getTransaction(id),
    enabled: !!id,
  });
}

export function useTransactionStats(period: string = 'month') {
  return useQuery({
    queryKey: [...transactionKeys.stats(), period],
    queryFn: () => mockApi.getTransactionStats(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) =>
      mockApi.updateTransaction(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: transactionKeys.detail(id) });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
