import Link from 'next/link';

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MoneyMapp</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</Link>
              <Link href="/dashboard/transactions" className="text-gray-500 hover:text-gray-700">Transações</Link>
              <Link href="/dashboard/budget" className="text-blue-600 font-medium">Orçamento</Link>
              <Link href="/dashboard/reports" className="text-gray-500 hover:text-gray-700">Relatórios</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Olá, João</span>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">Sair</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Planejamento de Orçamento</h2>
            <p className="text-gray-600">Defina e acompanhe seus limites mensais por categoria</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
              + Nova Categoria
            </button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Resumo do Orçamento - Dezembro 2024</h3>
              
              {/* Overall Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Orçamento Total</span>
                  <span className="text-sm text-gray-500">R$ 4.850,00 de R$ 5.500,00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Gasto: 88%</span>
                  <span>Restante: R$ 650,00</span>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🍔</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Alimentação</h4>
                      <p className="text-sm text-gray-500">R$ 820,00 de R$ 800,00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '102%' }}></div>
                    </div>
                    <span className="text-xs text-red-600 font-medium">+2% acima</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⛽</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Transporte</h4>
                      <p className="text-sm text-gray-500">R$ 450,00 de R$ 600,00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">25% restante</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🎬</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Lazer</h4>
                      <p className="text-sm text-gray-500">R$ 285,00 de R$ 400,00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">29% restante</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🏠</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Casa</h4>
                      <p className="text-sm text-gray-500">R$ 1.200,00 de R$ 1.500,00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">20% restante</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🏥</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Saúde</h4>
                      <p className="text-sm text-gray-500">R$ 180,00 de R$ 300,00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">40% restante</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📚</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Educação</h4>
                      <p className="text-sm text-gray-500">R$ 95,00 de R$ 200,00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '47%' }}></div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">53% restante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Monthly Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo Mensal</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Orçamento Total</span>
                  <span className="text-sm font-medium text-gray-900">R$ 5.500,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Gasto até agora</span>
                  <span className="text-sm font-medium text-red-600">R$ 4.850,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Disponível</span>
                  <span className="text-sm font-medium text-green-600">R$ 650,00</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">Economia do mês</span>
                  <span className="text-sm font-bold text-green-600">R$ 650,00</span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Alertas</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-500">⚠️</span>
                  <div>
                    <p className="text-sm font-medium text-red-800">Orçamento ultrapassado</p>
                    <p className="text-xs text-red-600">Alimentação está 2% acima do limite</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-500">⚡</span>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Atenção</p>
                    <p className="text-xs text-yellow-600">Transporte usando 75% do orçamento</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  📊 Copiar orçamento do mês anterior
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  📈 Ajustar limites automaticamente
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  📝 Configurar alertas
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  📧 Relatório por email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Comparison */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Comparação com Meses Anteriores</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Novembro</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Outubro</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Setembro</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Dezembro</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Variação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">🍔 Alimentação</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 750</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 680</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 720</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-gray-900">R$ 820</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-red-600">+9%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">⛽ Transporte</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 520</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 480</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 510</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-gray-900">R$ 450</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-green-600">-13%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">🎬 Lazer</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 380</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 320</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">R$ 290</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-gray-900">R$ 285</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-green-600">-25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
