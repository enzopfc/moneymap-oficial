'use client';

import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="p-6 m-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Algo deu errado
            </h2>
            <p className="text-gray-600 mb-4">
              Encontramos um problema inesperado. Por favor, tente novamente.
            </p>
            <div className="space-x-3">
              <Button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                variant="default"
              >
                Tentar Novamente
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Recarregar Página
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Simplified error component for inline errors
interface ErrorDisplayProps {
  error?: Error | string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({ error, onRetry, className }: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'Erro desconhecido';

  return (
    <Card className={`p-6 ${className}`}>
      <div className="text-center">
        <div className="text-4xl mb-3">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Erro ao carregar dados
        </h3>
        <p className="text-gray-600 mb-4">
          {errorMessage}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            🔄 Tentar Novamente
          </Button>
        )}
      </div>
    </Card>
  );
}