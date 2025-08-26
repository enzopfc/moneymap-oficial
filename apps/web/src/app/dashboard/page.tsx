import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MoneyMapp</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">João Silva</p>
                <p className="text-xs text-gray-500">joao@email.com</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <span className="mr-3">📊</span>
              Dashboard
            </Link>
            <Link href="/dashboard/transactions" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <span className="mr-3">💳</span>
              Transações
            </Link>
            <Link href="/dashboard/budget" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <span className="mr-3">🎯</span>
              Orçamento
            </Link>
            <Link href="/dashboard/reports" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <span className="mr-3">📈</span>
              Relatórios
            </Link>
            <Link href="/dashboard/goals" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <span className="mr-3">🏆</span>
              Metas
            </Link>
            <Link href="/dashboard/accounts" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <span className="mr-3">🏪</span>
              Contas
            </Link>
            <Link href="/dashboard/settings" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
              <span className="mr-3">⚙️</span>
              Configurações
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-4 border-t border-gray-200">
            <Link href="/" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
              <span className="mr-3">🏠</span>
              Página Inicial
            </Link>
            <Link href="/" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
              <span className="mr-3">🚪</span>
              Sair
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Bem-vindo de volta! Aqui está um resumo das suas finanças.</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition shadow-md">
                  + Nova Transação
                </button>
                <div className="relative">
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <span className="text-xl">🔔</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Receitas do Mês</p>
                  <p className="text-3xl font-bold text-green-600">R$ 8.750</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+12%</span>
                    <span className="text-xs text-gray-500 ml-2">vs mês anterior</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">📈</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Despesas do Mês</p>
                  <p className="text-3xl font-bold text-red-600">R$ 6.420</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">+5%</span>
                    <span className="text-xs text-gray-500 ml-2">vs mês anterior</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">📉</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Saldo Atual</p>
                  <p className="text-3xl font-bold text-blue-600">R$ 2.330</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">+7%</span>
                    <span className="text-xs text-gray-500 ml-2">crescimento</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Taxa de Poupança</p>
                  <p className="text-3xl font-bold text-purple-600">26.7%</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Meta: 30%</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🎯</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Spending by Category */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Gastos por Categoria</h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>Este mês</option>
                    <option>Últimos 3 meses</option>
                    <option>Este ano</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">🍔 Alimentação</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 min-w-0">R$ 2.480</span>
                      <span className="text-xs text-gray-500 min-w-0">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">🚗 Transporte</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 min-w-0">R$ 1.860</span>
                      <span className="text-xs text-gray-500 min-w-0">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">🎬 Lazer</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 min-w-0">R$ 930</span>
                      <span className="text-xs text-gray-500 min-w-0">15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">🏠 Casa</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 min-w-0">R$ 930</span>
                      <span className="text-xs text-gray-500 min-w-0">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Goals */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Metas Financeiras</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">🏡 Casa Própria</span>
                    <span className="text-xs text-gray-500">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>R$ 65.000</span>
                    <span>R$ 100.000</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">🚗 Carro Novo</span>
                    <span className="text-xs text-gray-500">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>R$ 22.500</span>
                    <span>R$ 50.000</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">🏖️ Viagem Europa</span>
                    <span className="text-xs text-gray-500">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>R$ 12.000</span>
                    <span>R$ 15.000</span>
                  </div>
                </div>

                <Link href="/dashboard/goals" className="block w-full text-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 py-2 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition text-sm font-medium">
                  Ver Todas as Metas
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Transações Recentes</h3>
                  <Link href="/dashboard/transactions" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver todas</Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🍔</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Restaurante Italiano</p>
                        <p className="text-xs text-gray-500">Hoje, 12:30 • Cartão de Crédito</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-600">-R$ 89,90</span>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">💼</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Freelance Design</p>
                        <p className="text-xs text-gray-500">Ontem, 14:22 • Conta Corrente</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+R$ 1.200,00</span>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">⛽</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Posto Ipiranga</p>
                        <p className="text-xs text-gray-500">2 dias, 08:15 • Débito</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-600">-R$ 145,50</span>
                  </div>

                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🎬</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Netflix</p>
                        <p className="text-xs text-gray-500">3 dias, 10:00 • Cartão de Crédito</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-600">-R$ 29,90</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition group">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <span className="text-white text-xl">💰</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">Adicionar Receita</span>
                  </button>

                  <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition group">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <span className="text-white text-xl">💸</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">Adicionar Despesa</span>
                  </button>

                  <Link href="/dashboard/budget" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition group">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">Definir Orçamento</span>
                  </Link>

                  <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <span className="text-white text-xl">📄</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">Importar Extrato</span>
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  <Link href="/dashboard/reports" className="block w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition shadow-md text-center">
                    📊 Ver Relatórios Detalhados
                  </Link>
                  <Link href="/dashboard/goals" className="block w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-500 hover:to-orange-600 transition shadow-md text-center">
                    🎯 Gerenciar Metas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
