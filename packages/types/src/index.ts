import { z } from 'zod';

// Base types
export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.date(),
});

export const AccountSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  type: z.enum(['corrente', 'poupanca', 'manual']),
  balance: z.number(),
  userId: z.string().cuid(),
  createdAt: z.date(),
});

export const CategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  type: z.enum(['income', 'expense']),
  userId: z.string().cuid(),
});

export const TransactionSchema = z.object({
  id: z.string().cuid(),
  accountId: z.string().cuid(),
  categoryId: z.string().cuid().optional(),
  date: z.date(),
  amount: z.number(),
  description: z.string().min(1),
  source: z.enum(['manual', 'import']),
  importId: z.string().cuid().optional(),
  createdAt: z.date(),
});

export const BudgetSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  categoryId: z.string().cuid(),
  month: z.string().regex(/^\d{4}-\d{2}$/), // YYYY-MM
  limit: z.number().positive(),
});

export const GoalSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  name: z.string().min(1),
  target: z.number().positive(),
  deadline: z.date(),
  createdAt: z.date(),
});

export const DebtSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  name: z.string().min(1),
  principal: z.number().positive(),
  rateAA: z.number().positive(), // annual rate
  dueDay: z.number().int().min(1).max(31),
  createdAt: z.date(),
});

export const ImportJobSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  filename: z.string().min(1),
  status: z.enum(['pending', 'processed', 'failed']),
  createdAt: z.date(),
});

// DTO Schemas for API
export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const CreateAccountSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['corrente', 'poupanca', 'manual']),
  balance: z.number().default(0),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1),
  type: z.enum(['income', 'expense']),
});

export const CreateTransactionSchema = z.object({
  accountId: z.string().cuid(),
  categoryId: z.string().cuid().optional(),
  date: z.string().datetime(),
  amount: z.number(),
  description: z.string().min(1),
});

export const CreateBudgetSchema = z.object({
  categoryId: z.string().cuid(),
  month: z.string().regex(/^\d{4}-\d{2}$/),
  limit: z.number().positive(),
});

export const CreateGoalSchema = z.object({
  name: z.string().min(1),
  target: z.number().positive(),
  deadline: z.string().datetime(),
});

export const CreateDebtSchema = z.object({
  name: z.string().min(1),
  principal: z.number().positive(),
  rateAA: z.number().positive(),
  dueDay: z.number().int().min(1).max(31),
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Budget = z.infer<typeof BudgetSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type Debt = z.infer<typeof DebtSchema>;
export type ImportJob = z.infer<typeof ImportJobSchema>;

// DTO types
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>;
export type CreateAccount = z.infer<typeof CreateAccountSchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type CreateBudget = z.infer<typeof CreateBudgetSchema>;
export type CreateGoal = z.infer<typeof CreateGoalSchema>;
export type CreateDebt = z.infer<typeof CreateDebtSchema>;

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query parameters
export const TransactionFiltersSchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  categoryId: z.string().cuid().optional(),
  accountId: z.string().cuid().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type TransactionFilters = z.infer<typeof TransactionFiltersSchema>;

// Report types
export interface CashFlowReport {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface NetWorthReport {
  assets: Array<{
    accountId: string;
    accountName: string;
    balance: number;
  }>;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export interface BudgetStatus {
  categoryId: string;
  categoryName: string;
  limit: number;
  spent: number;
  percentage: number;
  status: 'ok' | 'warning' | 'critical';
}

// Financial calculation types
export interface DebtSimulation {
  strategy: 'snowball' | 'avalanche';
  debts: Array<{
    id: string;
    name: string;
    balance: number;
    minimumPayment: number;
    interestRate: number;
    payoffOrder: number;
  }>;
  totalPayments: number;
  totalInterest: number;
  payoffTimeMonths: number;
}

export interface GoalSimulation {
  monthlyContribution: number;
  projectedCompletion: Date;
  totalContributions: number;
}

// Notification types
export interface NotificationRule {
  id: string;
  type: 'budget_alert' | 'goal_deadline' | 'debt_reminder';
  enabled: boolean;
  threshold?: number; // for budget alerts (percentage)
  daysBeforeDeadline?: number; // for goal/debt reminders
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Import types
export interface ImportMapping {
  dateColumn: string;
  amountColumn: string;
  descriptionColumn: string;
  accountColumn?: string;
  categoryMapping?: Record<string, string>;
}

export interface ImportPreview {
  total: number;
  duplicates: number;
  new: number;
  transactions: Array<{
    date: string;
    amount: number;
    description: string;
    isDuplicate: boolean;
  }>;
}
