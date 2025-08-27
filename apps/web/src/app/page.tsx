import Link from 'next/link';
import { Logo } from '../components/Logo';
import { HomeButton } from '../components/Navigation';
import { ArrowRight, Shield, TrendingUp, DollarSign, PieChart, Target, Users, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} className="hover:scale-105 transition-transform" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">MoneyMapp</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-surface-600 hover:text-brand-600 font-medium transition-colors">Recursos</Link>
              <Link href="#how-it-works" className="text-surface-600 hover:text-brand-600 font-medium transition-colors">Como Funciona</Link>
              <Link href="#testimonials" className="text-surface-600 hover:text-brand-600 font-medium transition-colors">Depoimentos</Link>
              <Link href="#pricing" className="text-surface-600 hover:text-brand-600 font-medium transition-colors">Preços</Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link
                href="/auth/login"
                className="text-surface-600 hover:text-brand-600 font-medium transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold rounded-xl shadow-soft hover:shadow-brand hover:opacity-95 transition-all duration-200"
              >
                Começar Grátis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-brand-400/20 to-brand-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-50 to-emerald-50 border border-brand-200 rounded-full text-brand-700 text-sm font-medium animate-fade-in">
              <Shield className="w-4 h-4" />
              <span>100% Seguro • Dados Criptografados • LGPD</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-surface-900 mb-2">Controle Total</span>
              <span className="block bg-gradient-to-r from-brand-600 via-emerald-600 to-brand-700 bg-clip-text text-transparent">
                das suas Finanças
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-surface-600 max-w-4xl mx-auto leading-relaxed">
              A plataforma mais <span className="font-semibold text-accent">inteligente</span> e <span className="font-semibold text-success-600">segura</span> 
              {' '}para gestão financeira pessoal no Brasil
            </p>
            
            <p className="text-lg text-surface-500 max-w-2xl mx-auto">
              Organize transações, defina orçamentos, acompanhe metas e tome decisões financeiras inteligentes 
              com nossa tecnologia de ponta e interface intuitiva.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white text-lg font-semibold rounded-xl shadow-soft hover:shadow-brand hover:scale-[1.02] transition-all duration-200"
              >
                <TrendingUp className="w-5 h-5" />
                Começar Gratuitamente
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-600 text-lg font-semibold rounded-xl border-2 border-brand-200 hover:bg-brand-50 hover:border-brand-300 transition-all duration-200"
              >
                <PieChart className="w-5 h-5" />
                Ver Demonstração
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-surface-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span>Configuração em 2 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span>Suporte especializado</span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="rounded-2xl bg-white shadow-soft p-6 border border-surface-200/60 hover:shadow-brand transition-all duration-300 animate-scale-in">
              <div className="text-3xl font-bold text-brand-600 mb-2">10K+</div>
              <div className="text-surface-600 font-medium">Usuários Ativos</div>
            </div>
            <div className="rounded-2xl bg-white shadow-soft p-6 border border-surface-200/60 hover:shadow-brand transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-success-600 mb-2">R$ 50M+</div>
              <div className="text-surface-600 font-medium">Patrimônio Gerenciado</div>
            </div>
            <div className="rounded-2xl bg-white shadow-soft p-6 border border-surface-200/60 hover:shadow-brand transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <div className="text-surface-600 font-medium">Satisfação dos Usuários</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-surface-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
              Recursos <span className="text-brand-600">Completos</span> para Sua Gestão
            </h2>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto">
              Tudo que você precisa para ter controle <span className="text-success-600 font-semibold">inteligente</span> 
              {' '}das suas finanças em uma única plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Transações */}
            <div className="group rounded-2xl bg-white shadow-soft p-8 border border-surface-200/60 hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Transações Inteligentes</h3>
              <p className="text-surface-600 mb-4 text-lg">Controle completo de receitas e despesas</p>
              <p className="text-surface-500">
                Importe extratos bancários automaticamente, categorização com IA e análise de padrões de gastos em tempo real.
              </p>
              <div className="mt-6 flex items-center text-brand-600 font-medium group-hover:text-brand-700 transition-colors">
                <span>Explorar recurso</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Orçamento */}
            <div className="group rounded-2xl bg-white shadow-soft p-8 border border-surface-200/60 hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Orçamento Inteligente</h3>
              <p className="text-surface-600 mb-4 text-lg">Planejamento financeiro automatizado</p>
              <p className="text-surface-500">
                Defina limites inteligentes por categoria com previsões baseadas em IA e receba alertas personalizados.
              </p>
              <div className="mt-6 flex items-center text-success-600 font-medium group-hover:text-success-700 transition-colors">
                <span>Explorar recurso</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Metas */}
            <div className="group rounded-2xl bg-white shadow-soft p-8 border border-surface-200/60 hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Metas & Objetivos</h3>
              <p className="text-surface-600 mb-4 text-lg">Alcance seus sonhos financeiros</p>
              <p className="text-surface-500">
                Crie metas de economia personalizadas com simuladores avançados e acompanhe seu progresso em tempo real.
              </p>
              <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                <span>Explorar recurso</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Investimentos */}
            <div className="group rounded-2xl bg-white shadow-soft p-8 border border-surface-200/60 hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Controle de Investimentos</h3>
              <p className="text-surface-600 mb-4 text-lg">Monitore sua carteira de investimentos</p>
              <p className="text-surface-500">
                Acompanhe ações, fundos e renda fixa com análises detalhadas e recomendações personalizadas.
              </p>
              <div className="mt-6 flex items-center text-accent font-medium hover:text-accent-dark transition-colors">
                <span>Explorar recurso</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Relatórios */}
            <div className="group rounded-2xl bg-white shadow-soft p-8 border border-surface-200/60 hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-info-500 to-info-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Relatórios Premium</h3>
              <p className="text-surface-600 mb-4 text-lg">Analytics avançado das suas finanças</p>
              <p className="text-surface-500">
                Dashboards interativos com insights baseados em IA e exportação de relatórios profissionais.
              </p>
              <div className="mt-6 flex items-center text-info-600 font-medium group-hover:text-info-700 transition-colors">
                <span>Explorar recurso</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Educação Financeira */}
            <div className="group rounded-2xl bg-white shadow-soft p-8 border border-surface-200/60 hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Educação Financeira</h3>
              <p className="text-surface-600 mb-4 text-lg">Aprenda e evolua constantemente</p>
              <p className="text-surface-500">
                Conteúdo exclusivo, cursos especializados e calculadoras avançadas para decisões mais inteligentes.
              </p>
              <div className="mt-6 flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
                <span>Explorar recurso</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
              Como <span className="text-brand-600">Funciona</span>
            </h2>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto">
              Apenas <span className="text-success-600 font-semibold">3 passos simples</span> para transformar sua vida financeira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mx-auto shadow-brand group-hover:scale-110 group-hover:shadow-brand-lg transition-all duration-300">
                  <span className="text-white text-3xl font-bold">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Conecte suas Contas</h3>
              <p className="text-surface-600 text-lg leading-relaxed">
                Importe seus extratos bancários ou conecte suas contas de forma{' '}
                <span className="text-brand-600 font-semibold">100% segura</span> para sincronização automática.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto shadow-success group-hover:scale-110 group-hover:shadow-success-lg transition-all duration-300">
                  <span className="text-white text-3xl font-bold">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Configure seu Orçamento</h3>
              <p className="text-surface-600 text-lg leading-relaxed">
                Defina seus limites de gastos por categoria e configure{' '}
                <span className="text-success-600 font-semibold">alertas inteligentes</span> personalizados.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-purple group-hover:scale-110 group-hover:shadow-purple-lg transition-all duration-300">
                  <span className="text-white text-3xl font-bold">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-4">Acompanhe e Evolua</h3>
              <p className="text-surface-600 text-lg leading-relaxed">
                Use nossos relatórios{' '}
                <span className="text-purple-600 font-semibold">baseados em IA</span> e recomendações personalizadas para otimizar continuamente.
              </p>
            </div>
          </div>

          {/* Connect Arrow */}
          <div className="hidden md:flex justify-center items-center mt-12">
            <div className="flex items-center space-x-8">
              <ArrowRight className="w-8 h-8 text-brand-400 animate-pulse" />
              <ArrowRight className="w-8 h-8 text-success-400 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gradient-to-b from-surface-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
              O que nossos <span className="text-brand-600">usuários dizem</span>
            </h2>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto">
              Mais de <span className="text-success-600 font-bold">50.000 pessoas</span> já transformaram suas finanças com o MoneyMapp
            </p>
            
            {/* Rating Summary */}
            <div className="flex items-center justify-center mt-8 space-x-2">
              <div className="flex text-2xl">⭐⭐⭐⭐⭐</div>
              <span className="text-2xl font-bold text-surface-900">4.9</span>
              <span className="text-surface-600">de 5 estrelas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-soft border border-surface-200/60 hover:shadow-brand hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
                <span className="ml-2 text-sm text-surface-500 font-medium">5.0</span>
              </div>
              <blockquote className="text-surface-700 text-lg mb-6 leading-relaxed">
                "O MoneyMapp mudou completamente minha relação com o dinheiro. Consegui{' '}
                <span className="text-success-600 font-semibold">quitar todas as minhas dívidas em 8 meses!</span>{' '}
                A interface é linda e muito fácil de usar."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-surface-900 text-lg">Maria Rosa</div>
                  <div className="text-surface-600">Professora • São Paulo</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-surface-500">
                <span className="inline-flex items-center px-2 py-1 bg-success-100 text-success-700 rounded-full">
                  ✓ Verificado
                </span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-soft border border-surface-200/60 hover:shadow-success hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
                <span className="ml-2 text-sm text-surface-500 font-medium">5.0</span>
              </div>
              <blockquote className="text-surface-700 text-lg mb-6 leading-relaxed">
                "Finalmente consegui organizar minhas finanças! A interface é{' '}
                <span className="text-brand-600 font-semibold">super intuitiva</span> e os relatórios são incríveis.{' '}
                Recomendo para todos os meus amigos!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg">
                  JS
                </div>
                <div>
                  <div className="font-semibold text-surface-900 text-lg">João Silva</div>
                  <div className="text-surface-600">Engenheiro • Rio de Janeiro</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-surface-500">
                <span className="inline-flex items-center px-2 py-1 bg-success-100 text-success-700 rounded-full">
                  ✓ Verificado
                </span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-soft border border-surface-200/60 hover:shadow-purple hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
                <span className="ml-2 text-sm text-surface-500 font-medium">5.0</span>
              </div>
              <blockquote className="text-surface-700 text-lg mb-6 leading-relaxed">
                "Uso o MoneyMapp há 2 anos e já consegui economizar{' '}
                <span className="text-accent font-semibold">mais de R$ 80.000</span> para meu apartamento próprio!{' '}
                Melhor investimento que fiz."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg">
                  AC
                </div>
                <div>
                  <div className="font-semibold text-surface-900 text-lg">Ana Clara</div>
                  <div className="text-surface-600">Designer • Belo Horizonte</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-surface-500">
                <span className="inline-flex items-center px-2 py-1 bg-success-100 text-success-700 rounded-full">
                  ✓ Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-surface-600 text-lg mb-6">
              Junte-se a milhares de pessoas que já transformaram suas vidas financeiras
            </p>
            <button className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-3 px-8 rounded-xl shadow-brand hover:shadow-brand-lg hover:scale-105 transition-all duration-300">
              Ver Mais Depoimentos
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-20 overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 -right-10 w-60 h-60 bg-success-400 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-10 left-1/2 w-80 h-80 bg-brand-400 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pronto para Transformar suas{' '}
            <span className="bg-gradient-to-r from-accent to-success-400 bg-clip-text text-transparent">
              Finanças?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de pessoas que já estão no{' '}
            <span className="text-accent font-semibold">controle total</span> de seu futuro financeiro
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="/auth/login"
              className="group bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-bold py-4 px-12 rounded-2xl shadow-brand text-lg transition-all duration-300 hover:shadow-accent hover:scale-105 min-w-[240px] inline-flex items-center justify-center"
            >
              Começar Gratuitamente
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/dashboard"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-12 rounded-2xl hover:bg-white/20 transition-all duration-300 text-lg min-w-[240px] inline-flex items-center justify-center"
            >
              <span className="w-6 h-6 mr-2">▶</span>
              Assistir Demo
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <span className="text-lg">Gratuito para sempre</span>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <span className="text-lg">Setup em 2 minutos</span>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <span className="text-lg">Sem necessidade de cartão</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl flex items-center justify-center mr-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Money<span className="text-brand-400">Mapp</span>
                </h3>
              </div>
              <p className="text-surface-400 text-lg mb-6 max-w-md">
                A plataforma de gestão financeira mais avançada do Brasil. Transforme sua relação com o dinheiro.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors cursor-pointer">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors cursor-pointer">
                  <span className="text-white font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors cursor-pointer">
                  <span className="text-white font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Produto</h4>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#features" className="hover:text-brand-400 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Preços</a></li>
                <li><a href="/dashboard" className="hover:text-brand-400 transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Integrações</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-surface-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-surface-500 text-sm">
              © 2024 MoneyMapp. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-surface-500 hover:text-brand-400 text-sm transition-colors">Privacidade</a>
              <a href="#" className="text-surface-500 hover:text-brand-400 text-sm transition-colors">Termos</a>
              <a href="#" className="text-surface-500 hover:text-brand-400 text-sm transition-colors">LGPD</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
