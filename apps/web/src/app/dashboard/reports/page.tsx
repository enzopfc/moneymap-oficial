import Link from 'next/link';

export default function ReportsPage() {
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
              <Link href="/dashboard/budget" className="text-gray-500 hover:text-gray-700">Orçamento</Link>
              <Link href="/dashboard/reports" className="text-blue-600 font-medium">Relatórios</Link>
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
            <h2 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h2>
            <p className="text-gray-600">Visualize insights detalhados sobre suas finanças</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium">
              📊 Exportar PDF
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
              📈 Gerar Relatório
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros de Análise</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Últimos 12 meses</option>
                <option>Últimos 6 meses</option>
                <option>Últimos 3 meses</option>
                <option>Este ano</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Análise</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Visão Geral</option>
                <option>Por Categoria</option>
                <option>Por Conta</option>
                <option>Tendências</option>
                <option>Comparativo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categorias</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Todas</option>
                <option>Despesas Fixas</option>
                <option>Despesas Variáveis</option>
                <option>Receitas</option>
                <option>Investimentos</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Receita Média</p>
                <p className="text-2xl font-bold text-green-600">R$ 8.200,00</p>
                <p className="text-sm text-green-500">+5% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">📈</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Gasto Médio</p>
                <p className="text-2xl font-bold text-red-600">R$ 6.050,00</p>
                <p className="text-sm text-red-500">+2% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">📊</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Taxa de Poupança</p>
                <p className="text-2xl font-bold text-blue-600">26%</p>
                <p className="text-sm text-green-500">+3% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Meta de Economia</p>
                <p className="text-2xl font-bold text-purple-600">85%</p>
                <p className="text-sm text-purple-500">R$ 1.700 de R$ 2.000</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spending by Category Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Gastos por Categoria</h3>
              <span className="text-sm text-gray-500">Últimos 30 dias</span>
            </div>
            <div className="relative">
              {/* Simplified chart representation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">Alimentação</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">R$ 1.850</span>
                    <span className="text-xs text-gray-500 ml-2">32%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">Transporte</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">R$ 1.200</span>
                    <span className="text-xs text-gray-500 ml-2">21%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">Lazer</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">R$ 950</span>
                    <span className="text-xs text-gray-500 ml-2">16%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '16%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">Casa</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">R$ 750</span>
                    <span className="text-xs text-gray-500 ml-2">13%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '13%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">Outros</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">R$ 1.050</span>
                    <span className="text-xs text-gray-500 ml-2">18%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Tendência Mensal</h3>
              <span className="text-sm text-gray-500">Últimos 6 meses</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Julho</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">+R$ 7.800</span>
                  <span className="text-red-600">-R$ 5.200</span>
                  <span className="font-medium">R$ 2.600</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Agosto</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">+R$ 8.200</span>
                  <span className="text-red-600">-R$ 5.800</span>
                  <span className="font-medium">R$ 2.400</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Setembro</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">+R$ 8.100</span>
                  <span className="text-red-600">-R$ 6.100</span>
                  <span className="font-medium">R$ 2.000</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Outubro</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">+R$ 8.400</span>
                  <span className="text-red-600">-R$ 6.300</span>
                  <span className="font-medium">R$ 2.100</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Novembro</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">+R$ 8.300</span>
                  <span className="text-red-600">-R$ 6.000</span>
                  <span className="font-medium">R$ 2.300</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm bg-blue-50 p-3 rounded-lg">
                <span className="text-gray-800 font-medium">Dezembro</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600 font-medium">+R$ 8.500</span>
                  <span className="text-red-600 font-medium">-R$ 6.200</span>
                  <span className="font-bold text-blue-600">R$ 2.300</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Análise Detalhada</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Financial Health Score */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">Score de Saúde Financeira</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Controle de Gastos</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Reserva de Emergência</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Diversificação</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">70%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Planejamento</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">90%</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏆</span>
                  <div>
                    <p className="font-medium text-green-800">Excelente!</p>
                    <p className="text-sm text-green-600">Score geral: 76/100 - Continue assim!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">Recomendações Personalizadas</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-500">💡</span>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Otimize gastos com alimentação</p>
                    <p className="text-xs text-blue-600">Considere cozinhar mais em casa. Potencial economia: R$ 300/mês</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-500">📈</span>
                  <div>
                    <p className="text-sm font-medium text-green-800">Aumente sua reserva</p>
                    <p className="text-xs text-green-600">Meta: R$ 15.000 (3 meses de gastos). Faltam R$ 6.000</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-500">🎯</span>
                  <div>
                    <p className="text-sm font-medium text-purple-800">Diversifique investimentos</p>
                    <p className="text-xs text-purple-600">Considere fundos de ações para longo prazo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-500">⚠️</span>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Atenção aos gastos variáveis</p>
                    <p className="text-xs text-yellow-600">Lazer aumentou 15% este mês. Revise o orçamento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Opções de Exportação</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Relatório PDF</h4>
              <p className="text-sm text-gray-500 mb-4">Relatório completo com gráficos e análises</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">
                Gerar PDF
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Planilha Excel</h4>
              <p className="text-sm text-gray-500 mb-4">Dados para análise personalizada</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium">
                Exportar Excel
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Envio por Email</h4>
              <p className="text-sm text-gray-500 mb-4">Receba relatórios mensais automaticamente</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                Configurar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
