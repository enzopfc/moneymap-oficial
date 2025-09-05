'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { goalSchema, type GoalFormData } from '../../../lib/validations/forms';
import { Input } from '../../ui/input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/button';
import { useCreateGoal, useUpdateGoal } from '../../../services/goalService';
import { toast } from 'react-hot-toast';

interface GoalFormProps {
  initialData?: Partial<GoalFormData>;
  goalId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const GOAL_CATEGORIES = [
  { value: 'emergency', label: '🚨 Reserva de Emergência' },
  { value: 'vacation', label: '✈️ Viagem/Férias' },
  { value: 'house', label: '🏠 Casa Própria' },
  { value: 'car', label: '🚗 Carro' },
  { value: 'education', label: '📚 Educação' },
  { value: 'retirement', label: '👴 Aposentadoria' },
  { value: 'wedding', label: '💒 Casamento' },
  { value: 'investment', label: '📈 Investimento' },
  { value: 'health', label: '⚕️ Saúde' },
  { value: 'other', label: '🎯 Outros' },
];

const PRIORITIES = [
  { value: 'low', label: '🟢 Baixa' },
  { value: 'medium', label: '🟡 Média' },
  { value: 'high', label: '🔴 Alta' },
];

const GOAL_ICONS = [
  { value: '🎯', label: '🎯 Meta' },
  { value: '💰', label: '💰 Dinheiro' },
  { value: '🏠', label: '🏠 Casa' },
  { value: '🚗', label: '🚗 Carro' },
  { value: '✈️', label: '✈️ Viagem' },
  { value: '📚', label: '📚 Educação' },
  { value: '💍', label: '💍 Casamento' },
  { value: '⚕️', label: '⚕️ Saúde' },
  { value: '🏖️', label: '🏖️ Férias' },
  { value: '🎓', label: '🎓 Formatura' },
];

const GOAL_COLORS = [
  { value: '#2563EB', label: '🔵 Azul' },
  { value: '#16A34A', label: '🟢 Verde' },
  { value: '#DC2626', label: '🔴 Vermelho' },
  { value: '#D4AF37', label: '🟡 Dourado' },
  { value: '#8B5CF6', label: '🟣 Roxo' },
  { value: '#F59E0B', label: '🟠 Laranja' },
  { value: '#EC4899', label: '🩷 Rosa' },
  { value: '#06B6D4', label: '🩵 Ciano' },
];

export function GoalForm({ 
  initialData, 
  goalId, 
  onSuccess, 
  onCancel 
}: GoalFormProps) {
  const createGoal = useCreateGoal();
  const updateGoal = useUpdateGoal();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      targetAmount: initialData?.targetAmount || 0,
      currentAmount: initialData?.currentAmount || 0,
      targetDate: initialData?.targetDate || '',
      category: initialData?.category || '',
      priority: initialData?.priority || 'medium',
      status: initialData?.status || 'active',
      monthlyContribution: initialData?.monthlyContribution || 0,
      color: initialData?.color || '#2563EB',
      icon: initialData?.icon || '🎯',
    },
  });

  const targetAmount = watch('targetAmount');
  const currentAmount = watch('currentAmount');
  const targetDate = watch('targetDate');

  // Calculate monthly contribution suggestion
  const calculateSuggestedContribution = () => {
    if (!targetAmount || !targetDate || targetAmount <= currentAmount) return 0;
    
    const remaining = targetAmount - currentAmount;
    const monthsToTarget = Math.ceil(
      (new Date(targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    
    return monthsToTarget > 0 ? Math.ceil(remaining / monthsToTarget) : remaining;
  };

  const suggestedContribution = calculateSuggestedContribution();

  const onSubmit = async (data: GoalFormData) => {
    try {
      if (goalId) {
        await updateGoal.mutateAsync({ id: goalId, data });
        toast.success('Meta atualizada com sucesso!');
      } else {
        await createGoal.mutateAsync(data);
        toast.success('Meta criada com sucesso!');
      }
      
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar meta. Tente novamente.');
      console.error('Goal form error:', error);
    }
  };

  const progressPercentage = targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-soft p-6 dark:bg-slate-800/80 dark:border-slate-700/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {goalId ? 'Editar Meta' : 'Nova Meta'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {goalId ? 'Atualize sua meta financeira' : 'Defina um objetivo financeiro para alcançar'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Título e Descrição */}
        <div className="space-y-4">
          <Input
            label="Título da Meta"
            placeholder="Ex: Reserva de Emergência"
            error={errors.title?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            {...register('title')}
          />

          <Textarea
            label="Descrição"
            placeholder="Descreva o objetivo e motivação para esta meta..."
            error={errors.description?.message}
            rows={3}
            {...register('description')}
          />
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            step="0.01"
            min="0"
            label="Valor da Meta"
            placeholder="0,00"
            error={errors.targetAmount?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            {...register('targetAmount', { valueAsNumber: true })}
          />

          <Input
            type="number"
            step="0.01"
            min="0"
            label="Valor Atual"
            placeholder="0,00"
            error={errors.currentAmount?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            {...register('currentAmount', { valueAsNumber: true })}
          />
        </div>

        {/* Progress Bar */}
        {targetAmount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Progresso</span>
              <span className="font-medium text-slate-800 dark:text-white">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Data e Categoria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Data da Meta"
            error={errors.targetDate?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            {...register('targetDate')}
          />

          <Select
            label="Categoria"
            options={GOAL_CATEGORIES}
            error={errors.category?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            {...register('category')}
          />
        </div>

        {/* Prioridade e Contribuição Mensal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Prioridade"
            options={PRIORITIES}
            error={errors.priority?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }
            {...register('priority')}
          />

          <Input
            type="number"
            step="0.01"
            min="0"
            label="Contribuição Mensal"
            placeholder="0,00"
            helpText={suggestedContribution > 0 ? `Sugerido: R$ ${suggestedContribution.toFixed(2)}` : undefined}
            error={errors.monthlyContribution?.message}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
            {...register('monthlyContribution', { valueAsNumber: true })}
          />
        </div>

        {/* Personalização */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Ícone"
            options={GOAL_ICONS}
            error={errors.icon?.message}
            {...register('icon')}
          />

          <Select
            label="Cor"
            options={GOAL_COLORS}
            error={errors.color?.message}
            {...register('color')}
          />
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
                {goalId ? 'Atualizar' : 'Criar'} Meta
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
