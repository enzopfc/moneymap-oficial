import { z } from 'zod';

// Auth schemas
export const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// User schemas
export const updateUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo').optional(),
  email: z.string().email('Email inválido').optional(),
});

// Category schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  type: z.enum(['INCOME', 'EXPENSE'], { required_error: 'Tipo é obrigatório' }),
});

export const updateCategorySchema = createCategorySchema.partial();

// Account schemas
export const createAccountSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  type: z.enum(['CORRENTE', 'POUPANCA', 'MANUAL'], { required_error: 'Tipo é obrigatório' }),
  balance: z.number().optional().default(0),
});

export const updateAccountSchema = createAccountSchema.partial();

// Transaction schemas
export const createTransactionSchema = z.object({
  accountId: z.string().cuid('ID da conta inválido'),
  categoryId: z.string().cuid('ID da categoria inválido').optional(),
  date: z.string().datetime('Data inválida').or(z.date()),
  amount: z.number({ required_error: 'Valor é obrigatório' })
    .refine(val => val !== 0, 'Valor não pode ser zero'),
  description: z.string().min(1, 'Descrição é obrigatória').max(200, 'Descrição muito longa'),
  source: z.enum(['MANUAL', 'IMPORT']).optional().default('MANUAL'),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export const transactionFiltersSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().max(100).optional().default(20),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  categoryId: z.string().cuid().optional(),
  accountId: z.string().cuid().optional(),
  q: z.string().max(100).optional(), // Search query
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
  minAmount: z.coerce.number().optional(),
  maxAmount: z.coerce.number().optional(),
});

// Budget schemas
export const createBudgetSchema = z.object({
  categoryId: z.string().cuid('ID da categoria inválido'),
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Formato do mês inválido (YYYY-MM)'),
  limit: z.number().positive('Limite deve ser positivo'),
});

export const updateBudgetSchema = createBudgetSchema.partial();

export const budgetFiltersSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  categoryId: z.string().cuid().optional(),
});

// Response schemas
export const paginationSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
});

export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  message: z.string().optional(),
  errors: z.array(z.string()).optional(),
  pagination: paginationSchema.optional(),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type TransactionFilters = z.infer<typeof transactionFiltersSchema>;
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
export type BudgetFilters = z.infer<typeof budgetFiltersSchema>;
export type ApiResponse<T = unknown> = z.infer<typeof apiResponseSchema> & { data?: T };
export type Pagination = z.infer<typeof paginationSchema>;