'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { Button, Card, Input } from '@moneymap/ui';

export default function AccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data para contas
  const summaryData = [
    { title: 'Saldo Total', value: 'R$ 47.429,70', icon: '💰', color: 'blue' },
    { title: 'Conta Corrente', value: 'R$ 12.429,70', icon: '🏦', color: 'green' },
    { title: 'Poupança', value: 'R$ 35.000,00', icon: '🐷', color: 'purple' },
    { title: 'Cartão de Crédito', value: 'R$ 1.580,90', icon: '💳', color: 'red', subtitle: '38% do limite' }
  ];

  const accounts = [
    {
      id: 1,
      name: 'Conta Corrente',
      bank: 'Banco do Brasil',
      type: 'checking',
      balance: 12429.70,
      details: 'Ag: 1234-5 • CC: 12345-6',
      icon: '🏦',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Poupança',
      bank: 'Banco do Brasil',
      type: 'savings',
      balance: 35000.00,
      details: 'Ag: 1234-5 • Poupança: 543210-9',
      icon: '🐷',
      color: 'purple',
      badge: '+0,65% a.m.'
    },
    {
      id: 3,
      name: 'Cartão Visa Gold',
      bank: 'Banco Itaú',
      type: 'credit',
      balance: -1580.90,
      details: 'Final: 4521',
      icon: '💳',
      color: 'red',
      limit: 4200.00,
      usage: 38
    },
    {
      id: 4,
      name: 'Investimentos',
      bank: 'XP Investimentos',
      type: 'investment',
      balance: 85420.30,
      details: 'Conta: 987654',
      icon: '📈',
      color: 'green',
      badge: '+12,5% no ano'
    }
  ];

  const quickActions = [
    { name: 'Transferir', icon: '💸', color: 'blue' },
    { name: 'Receber PIX', icon: '💰', color: 'green' },
    { name: 'Extrato PDF', icon: '📄', color: 'purple' },
    { name: 'Sincronizar', icon: '🔄', color: 'yellow' }
  ];

  return (
    <DashboardLayout activeItem="Contas">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contas</h1>
            <p className="text-gray-600 mt-1">Gerencie suas contas bancárias e cartões</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            + Nova Conta
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{item.title}</p>
                  <p className={`text-3xl font-bold text-${item.color}-600`}>{item.value}</p>
                  {item.subtitle && (
                    <p className="text-xs text-red-500">{item.subtitle}</p>
                  )}
                </div>
                <div className={`w-16 h-16 bg-gradient-to-r from-${item.color}-400 to-${item.color}-500 rounded-full flex items-center justify-center`}>
                  <span className="text-white text-2xl">{item.icon}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((account) => (
            <Card key={account.id} className="p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r from-${account.color}-400 to-${account.color}-500 rounded-xl flex items-center justify-center`}>
                  <span className="text-white text-2xl">{account.icon}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
                    <span className="text-sm">✏️</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                    <span className="text-sm">🗑️</span>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{account.name}</h3>
                <p className="text-sm text-gray-500">{account.bank}</p>
                <p className="text-xs text-gray-400">{account.details}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">
                  {account.type === 'credit' ? 'Fatura atual' : 
                   account.type === 'investment' ? 'Patrimônio' : 'Saldo disponível'}
                </p>
                <p className={`text-3xl font-bold ${
                  account.balance < 0 ? 'text-red-600' : 
                  account.color === 'green' ? 'text-green-600' :
                  account.color === 'purple' ? 'text-purple-600' :
                  account.color === 'blue' ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {account.balance < 0 ? 
                    `R$ ${Math.abs(account.balance).toFixed(2).replace('.', ',')}` :
                    `R$ ${account.balance.toFixed(2).replace('.', ',')}`
                  }
                </p>
                
                {account.badge && (
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {account.badge}
                    </span>
                  </div>
                )}

                {account.type === 'credit' && account.limit && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Limite utilizado</span>
                      <span className="text-sm font-medium text-gray-700">{account.usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full" 
                        style={{ width: `${account.usage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>R$ {Math.abs(account.balance).toFixed(2).replace('.', ',')}</span>
                      <span>R$ {account.limit.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Link 
                  href="/dashboard/transactions" 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {account.type === 'credit' ? 'Ver fatura' :
                   account.type === 'investment' ? 'Ver portfólio' : 'Ver extratos'}
                </Link>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  {account.type === 'credit' ? 'Pagar' :
                   account.type === 'investment' ? 'Investir' : 'Transferir'}
                </button>
              </div>
            </Card>
          ))}

          {/* Add New Account Card */}
          <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
            <div 
              className="flex flex-col items-center justify-center h-full min-h-[280px]"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">+</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Adicionar Nova Conta</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Conecte uma nova conta bancária ou cartão de crédito para ter controle total
              </p>
              <Button 
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                Conectar Conta
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <Card className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  className={`flex flex-col items-center p-6 bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 rounded-xl hover:from-${action.color}-100 hover:to-${action.color}-200 transition group`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                    <span className="text-white text-xl">{action.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.name}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal para Adicionar Nova Conta */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Adicionar Nova Conta</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Conta
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Selecione o tipo</option>
                    <option value="checking">Conta Corrente</option>
                    <option value="savings">Poupança</option>
                    <option value="credit">Cartão de Crédito</option>
                    <option value="investment">Investimentos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Conta
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Conta Corrente Banco do Brasil"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banco/Instituição
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Banco do Brasil"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saldo Inicial
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    className="w-full"
                  />
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
