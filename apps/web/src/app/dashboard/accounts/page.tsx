import Link from 'next/link';

export default function AccountsPage() {
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
            <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
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
            <Link href="/dashboard/accounts" className="flex items-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
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
                <h1 className="text-2xl font-bold text-gray-900">Minhas Contas</h1>
                <p className="text-sm text-gray-600">Gerencie todas as suas contas financeiras</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition shadow-md">
                  + Adicionar Conta
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total em Contas</p>
                  <p className="text-3xl font-bold text-blue-600">R$ 47.830</p>
                  <p className="text-xs text-blue-500 mt-1">5 contas ativas</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🏪</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Conta Corrente</p>
                  <p className="text-3xl font-bold text-green-600">R$ 8.450</p>
                  <p className="text-xs text-green-500 mt-1">Disponível</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🏦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Poupança</p>
                  <p className="text-3xl font-bold text-purple-600">R$ 25.600</p>
                  <p className="text-xs text-purple-500 mt-1">Rendimento 0,5%</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🐷</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Investimentos</p>
                  <p className="text-3xl font-bold text-orange-600">R$ 13.780</p>
                  <p className="text-xs text-orange-500 mt-1">+8.5% este ano</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">📈</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accounts List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bank Accounts */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Contas Bancárias</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">BB</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Banco do Brasil</h4>
                      <p className="text-sm text-gray-600">Conta Corrente • ****-1234</p>
                      <p className="text-xs text-gray-500">Atualizado há 2 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">R$ 8.450,00</p>
                    <div className="flex items-center mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-xs text-green-600">Ativa</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">BB</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Banco do Brasil</h4>
                      <p className="text-sm text-gray-600">Poupança • ****-5678</p>
                      <p className="text-xs text-gray-500">Atualizado há 1 dia</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">R$ 25.600,00</p>
                    <div className="flex items-center mt-1">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      <span className="text-xs text-purple-600">Ativa</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">NU</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Nubank</h4>
                      <p className="text-sm text-gray-600">Conta Digital • ****-9012</p>
                      <p className="text-xs text-gray-500">Atualizado há 3 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">R$ 2.180,00</p>
                    <div className="flex items-center mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-xs text-green-600">Ativa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Cards */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Cartões de Crédito</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Nubank Mastercard</h4>
                      <p className="text-sm text-gray-600">**** **** **** 1234</p>
                      <p className="text-xs text-gray-500">Fatura vence em 15 dias</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">R$ 1.250,00</p>
                    <p className="text-xs text-gray-500">de R$ 8.000 disponível</p>
                    <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                      <div className="bg-red-500 h-1 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Banco do Brasil Visa</h4>
                      <p className="text-sm text-gray-600">**** **** **** 5678</p>
                      <p className="text-xs text-gray-500">Fatura vence em 8 dias</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">R$ 850,00</p>
                    <p className="text-xs text-gray-500">de R$ 5.000 disponível</p>
                    <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                      <div className="bg-yellow-500 h-1 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Inter Platinum</h4>
                      <p className="text-sm text-gray-600">**** **** **** 9012</p>
                      <p className="text-xs text-gray-500">Sem anuidade</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">R$ 0,00</p>
                    <p className="text-xs text-gray-500">de R$ 3.000 disponível</p>
                    <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Accounts */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Investimentos</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver detalhes</button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">+12.5%</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tesouro Direto</h4>
                  <p className="text-2xl font-bold text-blue-600">R$ 8.500</p>
                  <p className="text-xs text-gray-500 mt-1">Selic 2029</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📈</span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">+8.2%</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fundo DI</h4>
                  <p className="text-2xl font-bold text-green-600">R$ 3.850</p>
                  <p className="text-xs text-gray-500 mt-1">CDI + 0,5%</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🏢</span>
                    </div>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">-2.1%</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ações</h4>
                  <p className="text-2xl font-bold text-purple-600">R$ 1.430</p>
                  <p className="text-xs text-gray-500 mt-1">Portfolio diversificado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <span className="text-white text-xl">🏪</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">Adicionar Conta</span>
                </button>

                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition group">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <span className="text-white text-xl">💳</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">Adicionar Cartão</span>
                </button>

                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <span className="text-white text-xl">🔄</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">Sincronizar</span>
                </button>

                <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition group">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">Investir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
