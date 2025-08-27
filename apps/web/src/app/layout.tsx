import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MoneyMapp - Gestão Financeira Pessoal',
  description: 'Controle suas finanças de forma inteligente e segura',
  keywords: ['finanças', 'gestão', 'orçamento', 'investimentos'],
  authors: [{ name: 'MoneyMapp Team' }],
  creator: 'MoneyMapp',
  publisher: 'MoneyMapp',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
