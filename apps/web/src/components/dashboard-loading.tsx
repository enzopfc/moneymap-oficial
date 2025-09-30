'use client';

import { DashboardLayout } from './dashboard-layout';
import { Button } from './ui/button';
import { CardSkeleton, ChartSkeleton, TransactionSkeleton, AccountSkeleton, GoalSkeleton } from './ui/skeleton';

export function DashboardLoading() {
  const headerActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" disabled>
        📊 Relatório
      </Button>
      <Button disabled>
        🔄 Carregando...
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Carregando seus dados financeiros..."
      headerActions={headerActions}
    >
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Interactive Chart */}
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>

        {/* Accounts Overview */}
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
            <Button variant="ghost" size="sm" disabled>
              Gerenciar
            </Button>
          </div>
          
          <div className="space-y-4">
            <AccountSkeleton />
            <AccountSkeleton />
            <AccountSkeleton />
            <AccountSkeleton />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Recent Transactions */}
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <Button variant="ghost" size="sm" disabled>
              Ver Todas
            </Button>
          </div>
          
          <div className="space-y-3">
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
          </div>
        </div>

        {/* Goals Progress */}
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
            <Button variant="ghost" size="sm" disabled>
              Ver Todas
            </Button>
          </div>
          
          <div className="space-y-4">
            <GoalSkeleton />
            <GoalSkeleton />
            <GoalSkeleton />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8">
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Button variant="outline" className="flex flex-col h-auto p-4 space-y-2" disabled>
              <span className="text-2xl opacity-50">💰</span>
              <span className="text-sm opacity-50">Carregando...</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col h-auto p-4 space-y-2" disabled>
              <span className="text-2xl opacity-50">💸</span>
              <span className="text-sm opacity-50">Carregando...</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col h-auto p-4 space-y-2" disabled>
              <span className="text-2xl opacity-50">🎯</span>
              <span className="text-sm opacity-50">Carregando...</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col h-auto p-4 space-y-2" disabled>
              <span className="text-2xl opacity-50">📄</span>
              <span className="text-sm opacity-50">Carregando...</span>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}