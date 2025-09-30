'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, LogIn, Chrome } from 'lucide-react';
import toast from 'react-hot-toast';

import { loginSchema, type LoginFormData } from '../../../lib/validations/auth';
import { HomeButton } from '../../../components/Navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });
    setIsLoading(false);

    if (!result) {
      toast.error('Falha no login');
      return;
    }

    if (result.error) {
      toast.error(result.error || 'Email ou senha incorretos');
      return;
    }

    toast.success('Login realizado com sucesso!');
    router.push(result.url || callbackUrl);
  };

  const isFormLoading = isLoading || isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-brand-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-success-400/20 to-success-600/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-accent/20 to-accent-dark/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 left-4 z-10">
        <HomeButton />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-brand">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-surface-600 text-lg">
            Entre na sua conta para continuar sua jornada financeira
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-soft border border-surface-200/60">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-surface-900">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={`w-full pl-12 pr-4 py-4 bg-surface-50 border-2 rounded-xl text-surface-900 placeholder-surface-400 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors.email 
                      ? 'border-danger-400 focus:border-danger-500' 
                      : 'border-surface-200 focus:border-brand-500 hover:border-surface-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-danger-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-surface-900">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className={`w-full pl-12 pr-12 py-4 bg-surface-50 border-2 rounded-xl text-surface-900 placeholder-surface-400 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors.password 
                      ? 'border-danger-400 focus:border-danger-500' 
                      : 'border-surface-200 focus:border-brand-500 hover:border-surface-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-surface-100 rounded-r-xl transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-surface-400 hover:text-surface-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-surface-400 hover:text-surface-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-danger-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register('rememberMe')}
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-surface-300 rounded transition-colors"
                />
                <label htmlFor="rememberMe" className="ml-3 block text-sm text-surface-700 font-medium">
                  Lembrar de mim
                </label>
              </div>

              <Link 
                href="/auth/forgot-password" 
                className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isFormLoading}
              className="group relative w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-4 px-6 rounded-xl shadow-brand transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isFormLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Entrar na conta
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-surface-500 font-medium">ou continue com</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full bg-white border-2 border-surface-200 hover:border-surface-300 text-surface-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-soft group"
              >
                <div className="flex items-center justify-center">
                  <Chrome className="w-5 h-5 mr-3 text-surface-500 group-hover:text-surface-700" />
                  Continuar com Google
                </div>
              </button>
            </div>
          </form>

          {/* Bottom Links */}
          <div className="mt-8 text-center">
            <p className="text-surface-600">
              Não tem uma conta?{' '}
              <Link href="/auth/register" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                Cadastre-se gratuitamente
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-brand-50 border border-brand-200 rounded-xl">
          <p className="text-sm text-brand-700 text-center font-medium mb-2">
            🚀 Conta Demo para Teste
          </p>
          <div className="text-xs text-brand-600 text-center space-y-1">
            <p><strong>Email:</strong> demo@moneymap.com</p>
            <p><strong>Senha:</strong> demo123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-surface-500">
            Ao entrar, você concorda com nossos{' '}
            <Link href="/terms" className="underline hover:text-brand-600 transition-colors">
              Termos de Uso
            </Link>
            {' '}e{' '}
            <Link href="/privacy" className="underline hover:text-brand-600 transition-colors">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
