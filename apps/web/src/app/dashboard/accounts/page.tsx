'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { mockAccounts, getTotalBalance } from '../../../lib/mock-data';

export default function AccountsPage() {
  const [accounts] = useState(mockAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalBalance = getTotalBalance();
  const checkingBalance = accounts
    .filter(acc => acc.type === 'checking')
    .reduce((sum, acc) => sum + acc.balance, 0);
  const savingsBalance = accounts
    .filter(acc => acc.type === 'savings')
    .reduce((sum, acc) => sum + acc.balance, 0);
  const creditUsed = accounts
    .filter(acc => acc.type === 'credit')
    .reduce((sum, acc) => sum + Math.abs(Math.min(acc.balance, 0)), 0);

  const handleAddAccount = () => {
    setIsModalOpen(true);
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking': return '🏦';
      case 'savings': return '🐷';
      case 'credit': return '💳';
      case 'investment': return '📈';
      default: return '💰';
    }
  };

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case 'checking': return 'Conta Corrente';
      case 'savings': return 'Poupança';
      case 'credit': return 'Cartão de Crédito';
      case 'investment': return 'Investimento';
      default: return 'Outro';
    }
  };

  const getAccountColor = (type: string) => {
    switch (type) {
      case 'checking': return 'bg-blue-100 text-blue-600';
      case 'savings': return 'bg-green-100 text-green-600';
      case 'credit': return 'bg-red-100 text-red-600';
      case 'investment': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const headerActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm">
        📊 Relatório
      </Button>
      <Button onClick={handleAddAccount}>
        + Nova Conta
      </Button>
    </div>
  );

  return (
    <DashboardLayout
      title="Contas" 
      description="Gerencie suas contas bancárias e cartões"
      headerActions={headerActions}
      showBackButton
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Conta Corrente</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(checkingBalance)}
              </p>
            </div>
            <div className="text-3xl opacity-80">🏦</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Poupança</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(savingsBalance)}
              </p>
            </div>
            <div className="text-3xl opacity-80">🐷</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Crédito Usado</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(creditUsed)}
              </p>
            </div>
            <div className="text-3xl opacity-80">💳</div>
          </div>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getAccountColor(account.type)}`}>
                <span className="text-2xl">{getAccountIcon(account.type)}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => alert('Funcionalidade em desenvolvimento!')}>
                  ✏️
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('Funcionalidade em desenvolvimento!')}>
                  🗑️
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{account.name}</h3>
              <p className="text-sm text-gray-500">{account.bank}</p>
              <p className="text-xs text-gray-400">{getAccountTypeName(account.type)}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Saldo atual</p>
              <p className={`text-2xl font-bold ${
                account.balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(account.balance)}
              </p>
            </div>

            {account.type === 'credit' && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Limite usado</p>
                  <p className="text-sm font-medium text-gray-700">
                    {account.creditLimit ? 
                      `${((Math.abs(Math.min(account.balance, 0)) / account.creditLimit) * 100).toFixed(0)}%` 
                      : '0%'}
                  </p>
                </div>
                {account.creditLimit && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((Math.abs(Math.min(account.balance, 0)) / account.creditLimit) * 100, 100)}%` 
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/transactions?account=${account.id}`}>
                  Ver Transações
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => alert('Funcionalidade em desenvolvimento!')}>
                Detalhes
              </Button>
            </div>
          </Card>
        ))}

        {/* Add New Account Card */}
        <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
          <div 
            className="flex flex-col items-center justify-center h-full min-h-[300px]"
            onClick={handleAddAccount}
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Adicionar Nova Conta</h3>
            <p className="text-sm text-gray-500 text-center">
              Conecte uma nova conta bancária ou cartão de crédito
            </p>
          </div>
        </Card>
      </div>

      {/* Add Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Nova Conta</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Conta</label>
                  <Input placeholder="Ex: Conta Corrente Itaú" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banco</label>
                  <Input placeholder="Ex: Itaú, Bradesco, Nubank..." />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Conta</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="checking">Conta Corrente</option>
                    <option value="savings">Poupança</option>
                    <option value="credit">Cartão de Crédito</option>
                    <option value="investment">Investimento</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Saldo Inicial</label>
                  <Input type="number" placeholder="0,00" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Limite (opcional)</label>
                  <Input type="number" placeholder="Para cartões de crédito" />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => {
                    setIsModalOpen(false);
                    alert('Funcionalidade em desenvolvimento!');
                  }}>
                    Salvar Conta
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
