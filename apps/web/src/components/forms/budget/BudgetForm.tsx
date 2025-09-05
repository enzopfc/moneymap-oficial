'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetSchema, type BudgetFormData } from '../../../lib/validations/forms';
import { Input } from '../../ui/input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/button';
import { useCreateBudget, useUpdateBudget } from '../../../services/budgetService';
import { toast } from 'react-hot-toast';

interface BudgetFormProps {
  initialData?: Partial<BudgetFormData>;
  budgetId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CATEGORIES = [
  { value: 'food', label: '🍽️ Alimentação', color: '#f59e0b' },
  { value: 'transport', label: '🚗 Transporte', color: '#8b5cf6' },
  { value: 'health', label: '⚕️ Saúde', color: '#ef4444' },
  { value: 'education', label: '📚 Educação', color: '#3b82f6' },
  { value: 'entertainment', label: '🎬 Entretenimento', color: '#ec4899' },
  { value: 'shopping', label: '🛍️ Compras', color: '#06b6d4' },
  { value: 'bills', label: '📋 Contas', color: '#84cc16' },
  { value: 'housing', label: '🏠 Moradia', color: '#f97316' },
  { value: 'other', label: '📁 Outros', color: '#6b7280' },
];

const PERIODS = [
  { value: 'monthly', label: '📅 Mensal' },
  { value: 'yearly', label: '📆 Anual' },
];

export function BudgetForm({ 
  initialData, 
  budgetId, 
  onSuccess, 
  onCancel 
}: BudgetFormProps) {
  const createBudget = useCreateBudget();
  const updateBudget = useUpdateBudget();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      categoryName: initialData?.categoryName || '',
      categoryColor: initialData?.categoryColor || '#6b7280',
      amount: initialData?.amount || 0,
      period: initialData?.period || 'monthly',
      startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
      endDate: initialData?.endDate || '',
      isActive: initialData?.isActive ?? true,
      alerts: {
        enabled: initialData?.alerts?.enabled ?? true,
        threshold: initialData?.alerts?.threshold ?? 80,
      },
    },
  });

  const selectedCategory = watch('categoryId');

  // Update category details when category changes
  React.useEffect(() => {
    if (selectedCategory) {
      const category = CATEGORIES.find(cat => cat.value === selectedCategory);
      if (category) {
        setValue('categoryName', category.label.split(' ')[1] || category.label);
        setValue('categoryColor', category.color);
      }
    }
  }, [selectedCategory, setValue]);

  const onSubmit = async (data: BudgetFormData) => {
    try {
      const budgetData = {
        ...data,
        spent: 0, // Initialize spent as 0 for new budgets
      };

      if (budgetId) {
        await updateBudget.mutateAsync({ id: budgetId, data: budgetData });
        toast.success('Orçamento atualizado com sucesso!');
      } else {
        await createBudget.mutateAsync(budgetData);
        toast.success('Orçamento criado com sucesso!');
      }
      
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar orçamento. Tente novamente.');
      console.error('Budget form error:', error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-soft p-6 dark:bg-slate-800/80 dark:border-slate-700/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {budgetId ? 'Editar Orçamento' : 'Novo Orçamento'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {budgetId ? 'Atualize o limite de gastos' : 'Defina um limite de gastos para uma categoria'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Categoria */}
        <Select
          label="Categoria"
          options={CATEGORIES}
          error={errors.categoryId?.message}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
          {...register('categoryId')}
        />

        {/* Valor e Período */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            step="0.01"
            min="0"
            label="Valor do Orçamento"
            placeholder="0,00"
            error={errors.amount?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            {...register('amount', { valueAsNumber: true })}
          />

          <Select
            label="Período"
            options={PERIODS}
            error={errors.period?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            {...register('period')}
          />
        </div>

        {/* Data Início e Fim */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Data de Início"
            error={errors.startDate?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            {...register('startDate')}
          />

          <Input
            type="date"
            label="Data de Fim (Opcional)"
            helpText="Deixe vazio para orçamento contínuo"
            error={errors.endDate?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            {...register('endDate')}
          />
        </div>

        {/* Configurações de Alerta */}
        <div className="space-y-4 p-4 bg-slate-50/80 dark:bg-slate-700/30 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Configurações de Alerta
          </h3>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="alertsEnabled"
              className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              {...register('alerts.enabled')}
            />
            <label htmlFor="alertsEnabled" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Receber alertas quando atingir o limite
            </label>
          </div>

          <Input
            type="number"
            min="1"
            max="100"
            label="Limite de Alerta (%)"
            placeholder="80"
            helpText="Receba um alerta quando atingir esta porcentagem do orçamento"
            error={errors.alerts?.threshold?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }
            {...register('alerts.threshold', { valueAsNumber: true })}
          />
        </div>

        {/* Status Ativo */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isActive"
            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
            {...register('isActive')}
          />
          <label htmlFor="isActive" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Orçamento ativo
          </label>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {budgetId ? 'Atualizar' : 'Criar'} Orçamento
              </>
            )}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
