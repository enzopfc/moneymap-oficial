'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, UserPlus, Chrome } from 'lucide-react';
import toast from 'react-hot-toast';

import { registerSchema, type RegisterFormData } from '../../../lib/validations/auth';
import { HomeButton } from '../../../components/Navigation';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erro ao registrar');

      // Auto login after register
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('Conta criada com sucesso! Bem-vindo ao MoneyMapp!');
      router.push(result?.url || '/dashboard');
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormLoading = isLoading || isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-success-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-success-400/20 to-success-600/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-accent/20 to-accent-dark/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 left-4 z-10">
        <HomeButton />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-success">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-2">
            Crie sua conta
          </h1>
          <p className="text-surface-600 text-lg">
            Comece sua jornada financeira gratuitamente
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-soft border border-surface-200/60">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-surface-900">
                Nome completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className={`w-full pl-12 pr-4 py-4 bg-surface-50 border-2 rounded-xl text-surface-900 placeholder-surface-400 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors.name 
                      ? 'border-danger-400 focus:border-danger-500' 
                      : 'border-surface-200 focus:border-success-500 hover:border-surface-300'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-danger-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>
                  {errors.name.message}
                </p>
              )}
            </div>

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
                      : 'border-surface-200 focus:border-success-500 hover:border-surface-300'
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
                  placeholder="Crie uma senha forte"
                  className={`w-full pl-12 pr-12 py-4 bg-surface-50 border-2 rounded-xl text-surface-900 placeholder-surface-400 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors.password 
                      ? 'border-danger-400 focus:border-danger-500' 
                      : 'border-surface-200 focus:border-success-500 hover:border-surface-300'
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-surface-900">
                Confirmar senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  className={`w-full pl-12 pr-12 py-4 bg-surface-50 border-2 rounded-xl text-surface-900 placeholder-surface-400 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors.confirmPassword 
                      ? 'border-danger-400 focus:border-danger-500' 
                      : 'border-surface-200 focus:border-success-500 hover:border-surface-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-surface-100 rounded-r-xl transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-surface-400 hover:text-surface-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-surface-400 hover:text-surface-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-danger-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  {...register('acceptTerms')}
                  id="acceptTerms"
                  type="checkbox"
                  className="h-4 w-4 text-success-600 focus:ring-success-500 border-surface-300 rounded transition-colors mt-1"
                />
                <label htmlFor="acceptTerms" className="ml-3 block text-sm text-surface-700">
                  Aceito os{' '}
                  <Link href="/terms" className="font-semibold text-success-600 hover:text-success-700 transition-colors">
                    Termos de Uso
                  </Link>
                  {' '}e{' '}
                  <Link href="/privacy" className="font-semibold text-success-600 hover:text-success-700 transition-colors">
                    Política de Privacidade
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-danger-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isFormLoading}
              className="group relative w-full bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white font-semibold py-4 px-6 rounded-xl shadow-success transition-all duration-300 hover:shadow-success-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isFormLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                  Criando conta...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Criar conta gratuitamente
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-surface-500 font-medium">ou cadastre-se com</span>
              </div>
            </div>

            {/* Social Register */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full bg-white border-2 border-surface-200 hover:border-surface-300 text-surface-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-soft group"
              >
                <div className="flex items-center justify-center">
                  <Chrome className="w-5 h-5 mr-3 text-surface-500 group-hover:text-surface-700" />
                  Cadastrar-se com Google
                </div>
              </button>
            </div>
          </form>

          {/* Bottom Links */}
          <div className="mt-8 text-center">
            <p className="text-surface-600">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="font-semibold text-success-600 hover:text-success-700 transition-colors">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-success-50 border border-success-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🆓</div>
            <p className="text-sm text-success-700 font-medium">100% Gratuito</p>
          </div>
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-brand-700 font-medium">Dados Seguros</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-surface-500">
            Ao criar uma conta, você concorda que suas informações serão tratadas de acordo com nossa Política de Privacidade
          </p>
        </div>
      </div>
    </div>
  );
}
