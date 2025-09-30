'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { HomeButton } from '../../../components/Navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erro ao enviar e-mail');
      toast.success('Se o e-mail existir, enviaremos instruções de recuperação.');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao enviar e-mail de recuperação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-brand-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <HomeButton />
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-brand">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-surface-900 mb-2">Recuperar senha</h1>
          <p className="text-surface-600">Informe seu e-mail e enviaremos instruções para redefinição</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-soft border border-surface-200/60">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-surface-900">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-surface-50 border-2 rounded-xl text-surface-900 placeholder-surface-400 transition-all duration-200 focus:outline-none focus:ring-0 border-surface-200 focus:border-brand-500 hover:border-surface-300"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-4 px-6 rounded-xl shadow-brand transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Enviando...' : 'Enviar instruções'}
            </button>
            <div className="text-center">
              <Link href="/auth/login" className="text-sm text-brand-600 hover:text-brand-700 inline-flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
