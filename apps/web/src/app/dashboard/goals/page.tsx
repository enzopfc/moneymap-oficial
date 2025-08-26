import Link from 'next/link';

export default function GoalsPage() {
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
            <Link href="/dashboard/goals" className="flex items-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
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
                <h1 className="text-2xl font-bold text-gray-900">Metas Financeiras</h1>
                <p className="text-sm text-gray-600">Defina e acompanhe seus objetivos financeiros</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition shadow-md">
                  + Nova Meta
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Metas Ativas</p>
                  <p className="text-3xl font-bold text-blue-600">6</p>
                  <p className="text-xs text-gray-500 mt-1">3 próximas do prazo</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🎯</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Valor Poupado</p>
                  <p className="text-3xl font-bold text-green-600">R$ 127.500</p>
                  <p className="text-xs text-green-500 mt-1">+15% este mês</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Progresso Médio</p>
                  <p className="text-3xl font-bold text-purple-600">68%</p>
                  <p className="text-xs text-purple-500 mt-1">Muito bom!</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Short-term Goals */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Metas de Curto Prazo</h3>
                <p className="text-sm text-gray-500">Até 12 meses</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🏖️</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Viagem Europa</h4>
                        <p className="text-sm text-gray-600">Prazo: 4 meses</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">R$ 12.000</span>
                    <span className="font-semibold text-gray-900">R$ 15.000</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2">Faltam apenas R$ 3.000! Continue assim! 🎉</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">💻</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Novo Notebook</h4>
                        <p className="text-sm text-gray-600">Prazo: 8 meses</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">R$ 2.800</span>
                    <span className="font-semibold text-gray-900">R$ 8.000</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">Economize R$ 650/mês para atingir a meta</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🚗</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Reforma do Carro</h4>
                        <p className="text-sm text-gray-600">Prazo: 6 meses</p>
                      </div>
                    </div>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">R$ 7.200</span>
                    <span className="font-semibold text-gray-900">R$ 12.000</span>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">No caminho certo! Economia de R$ 800/mês</p>
                </div>
              </div>
            </div>

            {/* Long-term Goals */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Metas de Longo Prazo</h3>
                <p className="text-sm text-gray-500">Mais de 12 meses</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🏡</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Casa Própria</h4>
                        <p className="text-sm text-gray-600">Prazo: 5 anos</p>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">R$ 65.000</span>
                    <span className="font-semibold text-gray-900">R$ 100.000</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-2">Excelente progresso! R$ 583/mês necessário</p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🎓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">MBA Internacional</h4>
                        <p className="text-sm text-gray-600">Prazo: 3 anos</p>
                      </div>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">R$ 18.750</span>
                    <span className="font-semibold text-gray-900">R$ 75.000</span>
                  </div>
                  <p className="text-xs text-indigo-600 mt-2">Acelere a economia: R$ 1.562/mês recomendado</p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🏖️</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Aposentadoria</h4>
                        <p className="text-sm text-gray-600">Prazo: 25 anos</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">R$ 180.000</span>
                    <span className="font-semibold text-gray-900">R$ 1.000.000</span>
                  </div>
                  <p className="text-xs text-emerald-600 mt-2">Investimento consistente de R$ 2.733/mês</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Conquistas Recentes</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🏆</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Reserva de Emergência</h4>
                  <p className="text-sm text-gray-600 mb-2">Completada em Nov/2024</p>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Meta Atingida!</span>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📱</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">iPhone Novo</h4>
                  <p className="text-sm text-gray-600 mb-2">Completada em Set/2024</p>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">R$ 4.500 poupados</span>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Primeira Meta</h4>
                  <p className="text-sm text-gray-600 mb-2">Completada em Jul/2024</p>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">Primeiro Sucesso!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
