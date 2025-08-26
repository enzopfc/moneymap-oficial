'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { mockBudgets, mockCategories } from '../../../lib/mock-data';

export default function BudgetPage() {
  const [budgets] = useState(mockBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const getBudgetStatus = (budget: typeof budgets[0]) => {
    const percentage = (budget.spent / budget.amount) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'danger': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const headerActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm">
        📊 Relatório
      </Button>
      <Button onClick={() => setIsModalOpen(true)}>
        + Novo Orçamento
      </Button>
    </div>
  );

  return (
    <DashboardLayout
      title="Orçamento" 
      description="Gerencie seus orçamentos e acompanhe seus gastos"
      headerActions={headerActions}
      showBackButton
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Orçamento Total</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(totalBudget)}
              </p>
            </div>
            <div className="text-3xl opacity-80">🎯</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Gasto</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(totalSpent)}
              </p>
            </div>
            <div className="text-3xl opacity-80">💸</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Disponível</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(remainingBudget)}
              </p>
            </div>
            <div className="text-3xl opacity-80">💰</div>
          </div>
        </Card>
      </div>

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const category = mockCategories.find(cat => cat.id === budget.categoryId);
          const status = getBudgetStatus(budget);
          const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
          
          return (
            <Card key={budget.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 text-2xl mr-3">
                    {category?.icon || '📊'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
                    <p className="text-sm text-gray-500">{budget.period}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert('Funcionalidade em desenvolvimento!')}>
                  ✏️
                </Button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Progresso</p>
                  <p className={`text-sm font-medium ${getStatusColor(status)}`}>
                    {percentage.toFixed(1)}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressColor(status)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Orçado:</span>
                  <span className="text-sm font-medium">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(budget.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Gasto:</span>
                  <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(budget.spent)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Restante:</span>
                  <span className={`text-sm font-medium ${
                    budget.amount - budget.spent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(budget.amount - budget.spent)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/transactions?category=${budget.categoryId}`}>
                    Ver Gastos
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => alert('Funcionalidade em desenvolvimento!')}>
                  Ajustar
                </Button>
              </div>
            </Card>
          );
        })}

        {/* Add New Budget Card */}
        <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
          <div 
            className="flex flex-col items-center justify-center h-full min-h-[300px]"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Criar Orçamento</h3>
            <p className="text-sm text-gray-500 text-center">
              Defina um novo orçamento para uma categoria
            </p>
          </div>
        </Card>
      </div>

      {/* Add Budget Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Novo Orçamento</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Orçamento</label>
                  <Input placeholder="Ex: Alimentação Mensal" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Selecione uma categoria</option>
                    {mockCategories.filter(cat => cat.type === 'expense').map(category => (
                      <option key={category.id} value={category.id}>{category.icon} {category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor do Orçamento</label>
                  <Input type="number" placeholder="0,00" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="monthly">Mensal</option>
                    <option value="weekly">Semanal</option>
                    <option value="yearly">Anual</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => {
                    setIsModalOpen(false);
                    alert('Funcionalidade em desenvolvimento!');
                  }}>
                    Criar Orçamento
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
