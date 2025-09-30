'use client';

import { DashboardLayout } from '../../components/dashboard-layout';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ExpenseChart, IncomeExpenseTrend, GoalProgressChart } from '../../components/charts';
import { 
  mockUser, 
  getTotalBalance, 
  getMonthlyIncome, 
  getMonthlyExpenses,
  mockAccounts,
  mockTransactions,
  mockGoals,
  getExpensesByCategory,
  getGoalProgress,
  getCategoryById,
  getIncomeExpenseTrend,
  getGoalChartData
} from '../../lib/mock-data';
import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [chartView, setChartView] = useState<'expenses' | 'trends' | 'goals'>('expenses');

  // Mock data calculations
  const totalBalance = getTotalBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const monthlyProfit = monthlyIncome - monthlyExpenses;
  const expensesByCategory = getExpensesByCategory();
  const trendData = getIncomeExpenseTrend();
  const goalChartData = getGoalChartData();
  
  // Recent transactions (last 5)
  const recentTransactions = mockTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Active goals
  const activeGoals = mockGoals.filter(goal => !goal.isCompleted).slice(0, 3);

  const handleAddTransaction = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Funcionalidade em desenvolvimento!');
    }, 1000);
  };

  const headerActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm">
        📊 Relatório
      </Button>
      <Button onClick={handleAddTransaction} disabled={isLoading}>
        {isLoading ? '🔄' : '+ Nova Transação'}
      </Button>
    </div>
  );

  const renderChart = () => {
    switch (chartView) {
      case 'expenses':
        return <ExpenseChart data={expensesByCategory} />;
      case 'trends':
        return <IncomeExpenseTrend data={trendData} />;
      case 'goals':
        return <GoalProgressChart data={goalChartData} />;
      default:
        return <ExpenseChart data={expensesByCategory} />;
    }
  };

  const getChartTitle = () => {
    switch (chartView) {
      case 'expenses':
        return 'Gastos por Categoria';
      case 'trends':
        return 'Tendência de Receitas vs Despesas';
      case 'goals':
        return 'Progresso das Metas';
      default:
        return 'Gastos por Categoria';
    }
  };

  return (
    <DashboardLayout 
      title="Dashboard" 
      description={`Bem-vindo de volta, ${mockUser.name}!`}
      headerActions={headerActions}
    >
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Balance */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Saldo Total</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(totalBalance)}
              </p>
            </div>
            <div className="text-3xl opacity-80">💰</div>
          </div>
        </Card>

        {/* Monthly Income */}
        <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Receita Mensal</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(monthlyIncome)}
              </p>
            </div>
            <div className="text-3xl opacity-80">📈</div>
          </div>
        </Card>

        {/* Monthly Expenses */}
        <Card className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Gastos Mensais</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(monthlyExpenses)}
              </p>
            </div>
            <div className="text-3xl opacity-80">📉</div>
          </div>
        </Card>

        {/* Monthly Profit */}
        <Card className={`p-6 text-white border-0 ${
          monthlyProfit >= 0 
            ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
            : 'bg-gradient-to-r from-orange-500 to-orange-600'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${monthlyProfit >= 0 ? 'text-purple-100' : 'text-orange-100'}`}>
                {monthlyProfit >= 0 ? 'Lucro' : 'Déficit'} Mensal
              </p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Math.abs(monthlyProfit))}
              </p>
            </div>
            <div className="text-3xl opacity-80">
              {monthlyProfit >= 0 ? '🎯' : '⚠️'}
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Interactive Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{getChartTitle()}</h3>
            <div className="flex gap-2">
              <Button
                variant={chartView === 'expenses' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartView('expenses')}
              >
                📊 Gastos
              </Button>
              <Button
                variant={chartView === 'trends' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartView('trends')}
              >
                📈 Tendências
              </Button>
              <Button
                variant={chartView === 'goals' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartView('goals')}
              >
                🎯 Metas
              </Button>
            </div>
          </div>
          
          <div className="h-[350px]">
            {renderChart()}
          </div>
        </Card>

        {/* Accounts Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Contas</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/accounts">Gerenciar</Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    account.type === 'checking' ? 'bg-blue-100 text-blue-600' :
                    account.type === 'savings' ? 'bg-green-100 text-green-600' :
                    account.type === 'credit' ? 'bg-red-100 text-red-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {account.type === 'checking' ? '🏦' :
                     account.type === 'savings' ? '🐷' :
                     account.type === 'credit' ? '💳' : '📈'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{account.name}</p>
                    <p className="text-sm text-gray-500">{account.bank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(account.balance)}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {account.type === 'checking' ? 'Corrente' :
                     account.type === 'savings' ? 'Poupança' :
                     account.type === 'credit' ? 'Crédito' : 'Investimento'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Transações Recentes</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/transactions">Ver Todas</Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction) => {
              const category = getCategoryById(transaction.categoryId);
              const isPositive = transaction.type === 'income';
              
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {category?.icon || '💰'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500">{category?.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Goals Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Metas em Progresso</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/goals">Ver Todas</Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {activeGoals.map((goal) => {
              const progress = getGoalProgress(goal.id);
              
              return (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{goal.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(goal.currentAmount)} de{' '}
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(goal.targetAmount)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                      goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col h-auto p-4 space-y-2"
              onClick={() => alert('Funcionalidade em desenvolvimento!')}
            >
              <span className="text-2xl">💰</span>
              <span className="text-sm">Adicionar Receita</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-auto p-4 space-y-2"
              onClick={() => alert('Funcionalidade em desenvolvimento!')}
            >
              <span className="text-2xl">💸</span>
              <span className="text-sm">Adicionar Despesa</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-auto p-4 space-y-2"
              asChild
            >
              <Link href="/dashboard/budget">
                <span className="text-2xl">🎯</span>
                <span className="text-sm">Definir Orçamento</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col h-auto p-4 space-y-2"
              onClick={() => alert('Funcionalidade em desenvolvimento!')}
            >
              <span className="text-2xl">📄</span>
              <span className="text-sm">Importar Extrato</span>
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}