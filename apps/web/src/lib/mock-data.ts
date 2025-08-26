// Mock data para desenvolvimento frontend

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  bank: string;
  currency: string;
  isActive: boolean;
  creditLimit?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
  parentId?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  categoryId: string;
  accountId: string;
  status: 'completed' | 'pending' | 'cancelled';
  tags?: string[];
}

export interface Budget {
  id: string;
  name: string;
  categoryId: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
  startDate: string;
  endDate: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  type: 'savings' | 'investment' | 'purchase' | 'debt';
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
}

export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: string;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
}

// Mock User Data
export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  createdAt: '2024-01-15T10:00:00Z'
};

// Mock Accounts
export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Conta Corrente',
    type: 'checking',
    balance: 15420.50,
    bank: 'Banco do Brasil',
    currency: 'BRL',
    isActive: true
  },
  {
    id: '2',
    name: 'Poupança',
    type: 'savings',
    balance: 8750.00,
    bank: 'Itaú',
    currency: 'BRL',
    isActive: true
  },
  {
    id: '3',
    name: 'Cartão de Crédito',
    type: 'credit',
    balance: -2340.80,
    bank: 'Nubank',
    currency: 'BRL',
    isActive: true,
    creditLimit: 8000
  },
  {
    id: '4',
    name: 'Investimentos',
    type: 'investment',
    balance: 25600.00,
    bank: 'XP Investimentos',
    currency: 'BRL',
    isActive: true
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  // Income categories
  { id: '1', name: 'Salário', color: '#10B981', icon: '💼', type: 'income' },
  { id: '2', name: 'Freelance', color: '#059669', icon: '💻', type: 'income' },
  { id: '3', name: 'Investimentos', color: '#0D9488', icon: '📈', type: 'income' },
  { id: '4', name: 'Outros', color: '#0891B2', icon: '💰', type: 'income' },
  
  // Expense categories
  { id: '5', name: 'Alimentação', color: '#EF4444', icon: '🍽️', type: 'expense' },
  { id: '6', name: 'Transporte', color: '#F97316', icon: '🚗', type: 'expense' },
  { id: '7', name: 'Moradia', color: '#8B5CF6', icon: '🏠', type: 'expense' },
  { id: '8', name: 'Saúde', color: '#EC4899', icon: '🏥', type: 'expense' },
  { id: '9', name: 'Educação', color: '#3B82F6', icon: '📚', type: 'expense' },
  { id: '10', name: 'Lazer', color: '#14B8A6', icon: '🎯', type: 'expense' },
  { id: '11', name: 'Roupas', color: '#F59E0B', icon: '👕', type: 'expense' },
  { id: '12', name: 'Tecnologia', color: '#6366F1', icon: '📱', type: 'expense' }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 5200.00,
    description: 'Salário Mensal',
    date: '2024-08-01T09:00:00Z',
    type: 'income',
    categoryId: '1',
    accountId: '1',
    status: 'completed',
    tags: ['trabalho', 'mensal']
  },
  {
    id: '2',
    amount: -85.50,
    description: 'Supermercado Extra',
    date: '2024-08-02T14:30:00Z',
    type: 'expense',
    categoryId: '5',
    accountId: '1',
    status: 'completed',
    tags: ['compras', 'essencial']
  },
  {
    id: '3',
    amount: -45.00,
    description: 'Uber para reunião',
    date: '2024-08-02T16:45:00Z',
    type: 'expense',
    categoryId: '6',
    accountId: '1',
    status: 'completed'
  },
  {
    id: '4',
    amount: 1200.00,
    description: 'Projeto Freelance',
    date: '2024-08-03T11:00:00Z',
    type: 'income',
    categoryId: '2',
    accountId: '1',
    status: 'completed',
    tags: ['freelance', 'extra']
  },
  {
    id: '5',
    amount: -1200.00,
    description: 'Aluguel Apartamento',
    date: '2024-08-05T08:00:00Z',
    type: 'expense',
    categoryId: '7',
    accountId: '1',
    status: 'completed',
    tags: ['aluguel', 'fixo']
  },
  {
    id: '6',
    amount: -150.00,
    description: 'Plano de Saúde',
    date: '2024-08-05T10:00:00Z',
    type: 'expense',
    categoryId: '8',
    accountId: '1',
    status: 'completed',
    tags: ['saúde', 'mensal']
  },
  {
    id: '7',
    amount: -280.00,
    description: 'Curso Online',
    date: '2024-08-06T19:00:00Z',
    type: 'expense',
    categoryId: '9',
    accountId: '1',
    status: 'completed',
    tags: ['educação', 'investimento']
  },
  {
    id: '8',
    amount: -75.90,
    description: 'Cinema + Pipoca',
    date: '2024-08-07T20:15:00Z',
    type: 'expense',
    categoryId: '10',
    accountId: '1',
    status: 'completed',
    tags: ['lazer', 'cinema']
  },
  {
    id: '9',
    amount: -199.99,
    description: 'Tênis Nike',
    date: '2024-08-08T15:30:00Z',
    type: 'expense',
    categoryId: '11',
    accountId: '3',
    status: 'pending',
    tags: ['roupas', 'tênis']
  },
  {
    id: '10',
    amount: -899.00,
    description: 'iPhone 15 - Entrada',
    date: '2024-08-10T11:45:00Z',
    type: 'expense',
    categoryId: '12',
    accountId: '3',
    status: 'completed',
    tags: ['tecnologia', 'celular']
  }
];

// Mock Budgets
export const mockBudgets: Budget[] = [
  {
    id: '1',
    name: 'Alimentação Agosto',
    categoryId: '5',
    amount: 800.00,
    spent: 450.30,
    period: 'monthly',
    startDate: '2024-08-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z'
  },
  {
    id: '2',
    name: 'Transporte Agosto',
    categoryId: '6',
    amount: 300.00,
    spent: 180.00,
    period: 'monthly',
    startDate: '2024-08-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z'
  },
  {
    id: '3',
    name: 'Lazer Agosto',
    categoryId: '10',
    amount: 400.00,
    spent: 320.50,
    period: 'monthly',
    startDate: '2024-08-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z'
  },
  {
    id: '4',
    name: 'Roupas Agosto',
    categoryId: '11',
    amount: 500.00,
    spent: 199.99,
    period: 'monthly',
    startDate: '2024-08-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z'
  }
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Reserva de Emergência',
    description: 'Guardar 6 meses de gastos para emergências',
    targetAmount: 18000.00,
    currentAmount: 8750.00,
    targetDate: '2024-12-31T00:00:00Z',
    type: 'savings',
    priority: 'high',
    isCompleted: false
  },
  {
    id: '2',
    title: 'Viagem para Europa',
    description: 'Juntar dinheiro para uma viagem de 15 dias pela Europa',
    targetAmount: 12000.00,
    currentAmount: 3200.00,
    targetDate: '2025-06-01T00:00:00Z',
    type: 'purchase',
    priority: 'medium',
    isCompleted: false
  },
  {
    id: '3',
    title: 'Notebook Gamer',
    description: 'Comprar um notebook para trabalho e jogos',
    targetAmount: 4500.00,
    currentAmount: 1800.00,
    targetDate: '2024-11-15T00:00:00Z',
    type: 'purchase',
    priority: 'medium',
    isCompleted: false
  },
  {
    id: '4',
    title: 'Investimentos CDB',
    description: 'Aplicar R$ 10.000 em CDB para renda passiva',
    targetAmount: 10000.00,
    currentAmount: 10000.00,
    targetDate: '2024-08-01T00:00:00Z',
    type: 'investment',
    priority: 'high',
    isCompleted: true
  }
];

// Mock Debts
export const mockDebts: Debt[] = [
  {
    id: '1',
    name: 'Cartão Nubank',
    totalAmount: 3500.00,
    remainingAmount: 2340.80,
    interestRate: 12.5,
    minimumPayment: 234.00,
    dueDate: '2024-08-15T00:00:00Z',
    type: 'credit_card'
  },
  {
    id: '2',
    name: 'Financiamento Carro',
    totalAmount: 45000.00,
    remainingAmount: 18600.00,
    interestRate: 1.2,
    minimumPayment: 890.00,
    dueDate: '2024-08-10T00:00:00Z',
    type: 'loan'
  },
  {
    id: '3',
    name: 'Empréstimo Pessoal',
    totalAmount: 8000.00,
    remainingAmount: 2400.00,
    interestRate: 2.8,
    minimumPayment: 320.00,
    dueDate: '2024-08-20T00:00:00Z',
    type: 'loan'
  }
];

// Utility functions for mock data
export const getAccountById = (id: string): Account | undefined => {
  return mockAccounts.find(account => account.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find(category => category.id === id);
};

export const getTransactionsByAccount = (accountId: string): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.accountId === accountId);
};

export const getTransactionsByCategory = (categoryId: string): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.categoryId === categoryId);
};

export const getIncomeTransactions = (): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.type === 'income');
};

export const getExpenseTransactions = (): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.type === 'expense');
};

export const getTotalBalance = (): number => {
  return mockAccounts.reduce((total, account) => total + account.balance, 0);
};

export const getMonthlyIncome = (): number => {
  return getIncomeTransactions()
    .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const getMonthlyExpenses = (): number => {
  return Math.abs(getExpenseTransactions()
    .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((total, transaction) => total + transaction.amount, 0));
};

export const getBudgetProgress = (budgetId: string): number => {
  const budget = mockBudgets.find(b => b.id === budgetId);
  if (!budget) return 0;
  return (budget.spent / budget.amount) * 100;
};

export const getGoalProgress = (goalId: string): number => {
  const goal = mockGoals.find(g => g.id === goalId);
  if (!goal) return 0;
  return (goal.currentAmount / goal.targetAmount) * 100;
};

// Chart data helpers
export const getExpensesByCategory = () => {
  const expenseCategories = mockCategories.filter(c => c.type === 'expense');
  return expenseCategories.map(category => {
    const categoryTransactions = getTransactionsByCategory(category.id);
    const total = Math.abs(categoryTransactions.reduce((sum, t) => sum + t.amount, 0));
    return {
      label: category.name,
      value: total,
      color: category.color
    };
  }).filter(item => item.value > 0);
};

export const getIncomesByCategory = () => {
  const incomeCategories = mockCategories.filter(c => c.type === 'income');
  return incomeCategories.map(category => {
    const categoryTransactions = getTransactionsByCategory(category.id);
    const total = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    return {
      label: category.name,
      value: total,
      color: category.color
    };
  }).filter(item => item.value > 0);
};
