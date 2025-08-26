import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">MoneyMapp</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition">Recursos</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition">Como Funciona</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition">Depoimentos</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition">Preços</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Entrar
              </Link>
              <Link
                href="/auth/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition shadow-md"
              >
                Começar Grátis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              ✨ Controle total das suas finanças
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MoneyMapp
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Sua plataforma completa para gestão financeira pessoal
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Organize suas finanças, alcance seus objetivos e tome decisões inteligentes com nossa plataforma intuitiva e poderosa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Começar Agora - Grátis
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition shadow-md"
            >
              👀 Ver Demo
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600 font-medium">Usuários Ativos</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">R$ 50M+</div>
            <div className="text-gray-600 font-medium">Gerenciados</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600 font-medium">Satisfação</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos Completos para Sua Gestão Financeira
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tudo que você precisa para ter controle total das suas finanças em uma única plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transações</h3>
              <p className="text-gray-600 mb-4 text-lg">Controle todas suas receitas e despesas</p>
              <p className="text-gray-500">
                Importe extratos bancários, categorize automaticamente e acompanhe seu fluxo de caixa em tempo real.
              </p>
              <div className="mt-6 flex items-center text-blue-600 font-medium">
                <span>Saiba mais</span>
                <span className="ml-2 group-hover:translate-x-1 transition">→</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Orçamento</h3>
              <p className="text-gray-600 mb-4 text-lg">Planeje e controle seus gastos mensais</p>
              <p className="text-gray-500">
                Defina limites por categoria e receba alertas quando estiver próximo do limite.
              </p>
              <div className="mt-6 flex items-center text-green-600 font-medium">
                <span>Saiba mais</span>
                <span className="ml-2 group-hover:translate-x-1 transition">→</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Metas</h3>
              <p className="text-gray-600 mb-4 text-lg">Alcance seus objetivos financeiros</p>
              <p className="text-gray-500">
                Crie metas de economia e acompanhe seu progresso com simuladores inteligentes.
              </p>
              <div className="mt-6 flex items-center text-purple-600 font-medium">
                <span>Saiba mais</span>
                <span className="ml-2 group-hover:translate-x-1 transition">→</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dívidas</h3>
              <p className="text-gray-600 mb-4 text-lg">Quite suas dívidas de forma estratégica</p>
              <p className="text-gray-500">
                Estratégias bola de neve e avalanche para eliminar dívidas rapidamente.
              </p>
              <div className="mt-6 flex items-center text-red-600 font-medium">
                <span>Saiba mais</span>
                <span className="ml-2 group-hover:translate-x-1 transition">→</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Relatórios</h3>
              <p className="text-gray-600 mb-4 text-lg">Análises detalhadas das suas finanças</p>
              <p className="text-gray-500">
                Dashboards interativos e exportação de relatórios em PDF/CSV.
              </p>
              <div className="mt-6 flex items-center text-indigo-600 font-medium">
                <span>Saiba mais</span>
                <span className="ml-2 group-hover:translate-x-1 transition">→</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Educação</h3>
              <p className="text-gray-600 mb-4 text-lg">Aprenda sobre educação financeira</p>
              <p className="text-gray-500">
                Conteúdos educativos e calculadoras financeiras para tomar melhores decisões.
              </p>
              <div className="mt-6 flex items-center text-yellow-600 font-medium">
                <span>Saiba mais</span>
                <span className="ml-2 group-hover:translate-x-1 transition">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Apenas 3 passos simples para transformar sua vida financeira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conecte suas Contas</h3>
              <p className="text-gray-600 text-lg">
                Importe seus extratos bancários ou conecte suas contas de forma segura para sincronização automática.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Configure seu Orçamento</h3>
              <p className="text-gray-600 text-lg">
                Defina seus limites de gastos por categoria e configure alertas personalizados para manter o controle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Acompanhe e Evolua</h3>
              <p className="text-gray-600 text-lg">
                Use nossos relatórios inteligentes e recomendações personalizadas para otimizar suas finanças continuamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de 10.000 pessoas já transformaram suas finanças com o MoneyMapp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                "O MoneyMapp mudou completamente minha relação com o dinheiro. Consegui quitar todas as minhas dívidas em 8 meses!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maria Rosa</div>
                  <div className="text-gray-600">Professora, São Paulo</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                "Finalmente consegui organizar minhas finanças! A interface é super intuitiva e os relatórios são incríveis."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-bold">JS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">João Silva</div>
                  <div className="text-gray-600">Engenheiro, Rio de Janeiro</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                "Uso o MoneyMapp há 2 anos e já consegui economizar mais de R$ 50.000 para meu apartamento próprio!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-700 font-bold">AC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ana Clara</div>
                  <div className="text-gray-600">Designer, Belo Horizonte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de usuários que já estão no controle total de suas finanças
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Começar Gratuitamente
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition"
            >
              👀 Ver Demonstração
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            ✅ Grátis para sempre • ✅ Sem cartão de crédito • ✅ Dados 100% seguros
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h3 className="text-2xl font-bold">MoneyMapp</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg max-w-md">
                A plataforma mais completa para gestão financeira pessoal do Brasil.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
                  <span>📧</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
                  <span>📱</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
                  <span>💬</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Produto</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Recursos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Preços</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Segurança</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Integrações</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Suporte</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Central de Ajuda</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Contato</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2024 MoneyMapp. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">LGPD</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
