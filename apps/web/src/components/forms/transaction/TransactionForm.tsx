'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, type TransactionFormData } from '../../../lib/validations/forms';
import { Input } from '../../ui/input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/button';
import { useCreateTransaction, useUpdateTransaction } from '../../../services/transactionService';
import { toast } from 'react-hot-toast';

interface TransactionFormProps {
  initialData?: Partial<TransactionFormData>;
  transactionId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Mock data for dropdowns
const CATEGORIES = [
  { value: 'food', label: '🍽️ Alimentação', color: '#f59e0b' },
  { value: 'transport', label: '🚗 Transporte', color: '#8b5cf6' },
  { value: 'health', label: '⚕️ Saúde', color: '#ef4444' },
  { value: 'education', label: '📚 Educação', color: '#3b82f6' },
  { value: 'entertainment', label: '🎬 Entretenimento', color: '#ec4899' },
  { value: 'shopping', label: '🛍️ Compras', color: '#06b6d4' },
  { value: 'bills', label: '📋 Contas', color: '#84cc16' },
  { value: 'salary', label: '💰 Salário', color: '#10b981' },
  { value: 'investment', label: '📈 Investimentos', color: '#f97316' },
  { value: 'other', label: '📁 Outros', color: '#6b7280' },
];

const ACCOUNTS = [
  { value: 'checking', label: '🏦 Conta Corrente' },
  { value: 'savings', label: '💳 Poupança' },
  { value: 'credit', label: '💳 Cartão de Crédito' },
  { value: 'cash', label: '💵 Dinheiro' },
];

const TRANSACTION_TYPES = [
  { value: 'expense', label: '📤 Despesa' },
  { value: 'income', label: '📥 Receita' },
];

export function TransactionForm({ 
  initialData, 
  transactionId, 
  onSuccess, 
  onCancel 
}: TransactionFormProps) {
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: initialData?.amount || 0,
      description: initialData?.description || '',
      category: initialData?.category || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      type: initialData?.type || 'expense',
      account: initialData?.account || '',
      tags: initialData?.tags || [],
      isRecurring: initialData?.isRecurring || false,
    },
  });

  const transactionType = watch('type');
  const selectedCategory = watch('category');

  const onSubmit = async (data: TransactionFormData) => {
    try {
      // Find category color
      const categoryData = CATEGORIES.find(cat => cat.value === data.category);
      const categoryColor = categoryData?.color || '#6b7280';

      const transactionData = {
        ...data,
        categoryColor,
      };

      if (transactionId) {
        await updateTransaction.mutateAsync({ id: transactionId, data: transactionData });
        toast.success('Transação atualizada com sucesso!');
      } else {
        await createTransaction.mutateAsync(transactionData);
        toast.success('Transação criada com sucesso!');
      }
      
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar transação. Tente novamente.');
      console.error('Transaction form error:', error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-soft p-6 dark:bg-slate-800/80 dark:border-slate-700/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {transactionId ? 'Editar Transação' : 'Nova Transação'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {transactionId ? 'Atualize os dados da transação' : 'Adicione uma nova receita ou despesa'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tipo e Valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tipo da Transação"
            options={TRANSACTION_TYPES}
            error={errors.type?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
            {...register('type')}
          />

          <Input
            type="number"
            step="0.01"
            min="0"
            label="Valor"
            placeholder="0,00"
            error={errors.amount?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            className={transactionType === 'income' ? 'focus:border-green-400 focus:ring-green-100' : 'focus:border-red-400 focus:ring-red-100'}
            {...register('amount', { valueAsNumber: true })}
          />
        </div>

        {/* Descrição */}
        <Input
          label="Descrição"
          placeholder="Descreva a transação..."
          error={errors.description?.message}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          }
          {...register('description')}
        />

        {/* Categoria e Conta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Categoria"
            options={CATEGORIES}
            error={errors.category?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            {...register('category')}
          />

          <Select
            label="Conta"
            options={ACCOUNTS}
            error={errors.account?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            {...register('account')}
          />
        </div>

        {/* Data */}
        <Input
          type="date"
          label="Data"
          error={errors.date?.message}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          {...register('date')}
        />

        {/* Transação Recorrente */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isRecurring"
            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
            {...register('isRecurring')}
          />
          <label htmlFor="isRecurring" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Transação recorrente
          </label>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant={transactionType === 'income' ? 'default' : 'secondary'}
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
                {transactionId ? 'Atualizar' : 'Criar'} Transação
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
