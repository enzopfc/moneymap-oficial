'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  categoryColor: string;
  date: string;
  type: 'income' | 'expense';
  account: string;
  tags?: string[];
  isRecurring?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
  budget?: number;
  spent?: number;
  parentId?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  isActive: boolean;
  color: string;
  icon: string;
}

// State interfaces
interface TransactionState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  filters: {
    dateRange: [string, string] | null;
    categories: string[];
    accounts: string[];
    types: ('income' | 'expense')[];
    search: string;
  };
  isLoading: boolean;
}

interface TransactionActions {
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  updateFilters: (filters: Partial<TransactionState['filters']>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
}

type TransactionStore = TransactionState & TransactionActions;

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    description: 'Salário',
    category: 'Salário',
    categoryColor: '#16a34a',
    date: '2024-01-15',
    type: 'income',
    account: 'Conta Corrente',
    tags: ['trabalho'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    amount: -120,
    description: 'Supermercado Extra',
    category: 'Alimentação',
    categoryColor: '#f59e0b',
    date: '2024-01-14',
    type: 'expense',
    account: 'Cartão de Débito',
    tags: ['mercado', 'alimentação'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    amount: -80,
    description: 'Combustível',
    category: 'Transporte',
    categoryColor: '#3b82f6',
    date: '2024-01-13',
    type: 'expense',
    account: 'Cartão de Crédito',
    tags: ['carro', 'combustível'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      transactions: mockTransactions,
      selectedTransaction: null,
      filters: {
        dateRange: null,
        categories: [],
        accounts: [],
        types: [],
        search: '',
      },
      isLoading: false,

      // Actions
      setTransactions: (transactions) => set({ transactions }),

      addTransaction: (transactionData) => {
        const newTransaction: Transaction = {
          ...transactionData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === id
              ? { ...transaction, ...updates, updatedAt: new Date().toISOString() }
              : transaction
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== id),
          selectedTransaction: state.selectedTransaction?.id === id ? null : state.selectedTransaction,
        }));
      },

      setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),

      updateFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      clearFilters: () => {
        set({
          filters: {
            dateRange: null,
            categories: [],
            accounts: [],
            types: [],
            search: '',
          },
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'transaction-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        filters: state.filters,
      }),
    }
  )
);
