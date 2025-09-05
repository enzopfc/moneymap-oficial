import { z } from 'zod';

// Transaction Schema
export const transactionSchema = z.object({
  amount: z
    .number({ required_error: 'Valor é obrigatório' })
    .min(0.01, 'Valor deve ser maior que zero')
    .max(1000000, 'Valor muito alto'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(3, 'Descrição deve ter pelo menos 3 caracteres')
    .max(100, 'Descrição deve ter no máximo 100 caracteres'),
  category: z
    .string()
    .min(1, 'Categoria é obrigatória'),
  date: z
    .string()
    .min(1, 'Data é obrigatória')
    .refine((date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(now.getFullYear() + 1);
      
      return parsedDate >= oneYearAgo && parsedDate <= oneYearFromNow;
    }, 'Data deve estar entre 1 ano atrás e 1 ano no futuro'),
  type: z.enum(['income', 'expense'], {
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo deve ser receita ou despesa',
  }),
  account: z
    .string()
    .min(1, 'Conta é obrigatória'),
  tags: z
    .array(z.string())
    .optional()
    .default([]),
  isRecurring: z
    .boolean()
    .optional()
    .default(false),
});

// Budget Schema
export const budgetSchema = z.object({
  categoryId: z
    .string()
    .min(1, 'Categoria é obrigatória'),
  categoryName: z
    .string()
    .min(1, 'Nome da categoria é obrigatório'),
  categoryColor: z
    .string()
    .min(1, 'Cor da categoria é obrigatória')
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Cor deve ser um hexadecimal válido'),
  amount: z
    .number({ required_error: 'Valor do orçamento é obrigatório' })
    .min(1, 'Valor deve ser maior que zero')
    .max(1000000, 'Valor muito alto'),
  period: z.enum(['monthly', 'yearly'], {
    required_error: 'Período é obrigatório',
    invalid_type_error: 'Período deve ser mensal ou anual',
  }),
  startDate: z
    .string()
    .min(1, 'Data de início é obrigatória'),
  endDate: z
    .string()
    .optional(),
  isActive: z
    .boolean()
    .optional()
    .default(true),
  alerts: z.object({
    enabled: z.boolean().default(true),
    threshold: z
      .number()
      .min(1, 'Limite deve ser maior que 0%')
      .max(100, 'Limite deve ser menor que 100%')
      .default(80),
  }).optional().default({
    enabled: true,
    threshold: 80,
  }),
});

// Goal Schema
export const goalSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(50, 'Título deve ter no máximo 50 caracteres'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(200, 'Descrição deve ter no máximo 200 caracteres'),
  targetAmount: z
    .number({ required_error: 'Valor da meta é obrigatório' })
    .min(1, 'Valor deve ser maior que zero')
    .max(10000000, 'Valor muito alto'),
  currentAmount: z
    .number()
    .min(0, 'Valor atual não pode ser negativo')
    .default(0),
  targetDate: z
    .string()
    .min(1, 'Data da meta é obrigatória')
    .refine((date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      
      return parsedDate >= tomorrow;
    }, 'Data da meta deve ser no futuro'),
  category: z
    .string()
    .min(1, 'Categoria é obrigatória'),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Prioridade é obrigatória',
    invalid_type_error: 'Prioridade deve ser baixa, média ou alta',
  }),
  status: z.enum(['active', 'completed', 'paused'], {
    invalid_type_error: 'Status inválido',
  }).optional().default('active'),
  monthlyContribution: z
    .number()
    .min(0, 'Contribuição mensal não pode ser negativa')
    .optional(),
  color: z
    .string()
    .min(1, 'Cor é obrigatória')
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Cor deve ser um hexadecimal válido'),
  icon: z
    .string()
    .min(1, 'Ícone é obrigatório'),
});

// Category Schema
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(30, 'Nome deve ter no máximo 30 caracteres'),
  color: z
    .string()
    .min(1, 'Cor é obrigatória')
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Cor deve ser um hexadecimal válido'),
  icon: z
    .string()
    .min(1, 'Ícone é obrigatório'),
  type: z.enum(['income', 'expense'], {
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo deve ser receita ou despesa',
  }),
  budget: z
    .number()
    .min(0, 'Orçamento não pode ser negativo')
    .optional(),
  parentId: z
    .string()
    .optional(),
});

// Account Schema
export const accountSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  type: z.enum(['checking', 'savings', 'credit', 'investment'], {
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo de conta inválido',
  }),
  balance: z
    .number({ required_error: 'Saldo inicial é obrigatório' })
    .min(-1000000, 'Saldo muito baixo')
    .max(1000000, 'Saldo muito alto'),
  currency: z
    .string()
    .min(1, 'Moeda é obrigatória')
    .default('BRL'),
  isActive: z
    .boolean()
    .optional()
    .default(true),
  color: z
    .string()
    .min(1, 'Cor é obrigatória')
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Cor deve ser um hexadecimal válido'),
  icon: z
    .string()
    .min(1, 'Ícone é obrigatório'),
});

// Form data types
export type TransactionFormData = z.infer<typeof transactionSchema>;
export type BudgetFormData = z.infer<typeof budgetSchema>;
export type GoalFormData = z.infer<typeof goalSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type AccountFormData = z.infer<typeof accountSchema>;

// Extended schemas for editing (with optional fields)
export const editTransactionSchema = transactionSchema.partial();
export const editBudgetSchema = budgetSchema.partial();
export const editGoalSchema = goalSchema.partial();

export type EditTransactionFormData = z.infer<typeof editTransactionSchema>;
export type EditBudgetFormData = z.infer<typeof editBudgetSchema>;
export type EditGoalFormData = z.infer<typeof editGoalSchema>;
