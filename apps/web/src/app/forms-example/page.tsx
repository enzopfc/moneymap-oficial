'use client';

import React, { useState } from 'react';
import { TransactionForm } from '../../components/forms/transaction/TransactionForm';
import { BudgetForm } from '../../components/forms/budget/BudgetForm';
import { GoalForm } from '../../components/forms/goal/GoalForm';

type FormType = 'transaction' | 'budget' | 'goal';

export default function FormsExamplePage() {
  const [activeForm, setActiveForm] = useState<FormType>('transaction');
  const [showForm, setShowForm] = useState(true);

  const handleFormSuccess = () => {
    setShowForm(false);
    setTimeout(() => setShowForm(true), 1000); // Reset form after 1 second
  };

  const renderForm = () => {
    if (!showForm) {
      return (
        <div className="flex items-center justify-center h-64 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-700">
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Formulário enviado com sucesso!
            </h3>
            <p className="text-green-600 dark:text-green-400">
              Os dados foram salvos e o formulário será resetado.
            </p>
          </div>
        </div>
      );
    }

    switch (activeForm) {
      case 'transaction':
        return (
          <TransactionForm
            onSuccess={handleFormSuccess}
            onCancel={() => console.log('Transaction form cancelled')}
          />
        );
      case 'budget':
        return (
          <BudgetForm
            onSuccess={handleFormSuccess}
            onCancel={() => console.log('Budget form cancelled')}
          />
        );
      case 'goal':
        return (
          <GoalForm
            onSuccess={handleFormSuccess}
            onCancel={() => console.log('Goal form cancelled')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            📝 Formulários Premium
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Demonstração dos formulários padronizados com validação em tempo real, 
            design premium e experiência de usuário otimizada.
          </p>
        </div>

        {/* Form Type Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { type: 'transaction' as FormType, label: '💰 Transação', icon: '📤' },
            { type: 'budget' as FormType, label: '📊 Orçamento', icon: '💳' },
            { type: 'goal' as FormType, label: '🎯 Meta', icon: '🏆' },
          ].map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => {
                setActiveForm(type);
                setShowForm(true);
              }}
              className={`
                px-6 py-3 rounded-xl font-medium transition-all duration-200 ease-in-out
                ${activeForm === type
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700'
                }
              `}
            >
              <span className="text-lg mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Features Badge */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            '✅ Validação em Tempo Real',
            '🎨 Design Premium',
            '📱 Responsivo',
            '🌙 Dark Mode',
            '🚀 React Hook Form',
            '🔍 Zod Validation',
          ].map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Form Container */}
        <div className="w-full">
          {renderForm()}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-soft dark:bg-slate-800/80 dark:border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            💡 Instruções de Teste
          </h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Todos os campos possuem validação em tempo real com feedback visual</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Experimente deixar campos vazios ou inserir valores inválidos</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Os formulários simulam APIs reais com loading states e tratamento de erros</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Design adaptativo funciona em desktop, tablet e mobile</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Suporte completo a dark mode com transições suaves</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
