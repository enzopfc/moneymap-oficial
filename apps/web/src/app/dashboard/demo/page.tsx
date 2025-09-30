'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { DashboardLoading } from '../../../components/dashboard-loading';
import { ErrorBoundary, ErrorDisplay } from '../../../components/error-boundary';
import DashboardPage from '../page';

type DemoState = 'normal' | 'loading' | 'error';

export default function DashboardDemo() {
  const [demoState, setDemoState] = useState<DemoState>('normal');
  const [forceError, setForceError] = useState(false);

  // Component that throws an error for testing
  const ErrorComponent = () => {
    if (forceError) {
      throw new Error('Este é um erro simulado para testar o Error Boundary!');
    }
    return null;
  };

  if (demoState === 'loading') {
    return <DashboardLoading />;
  }

  if (demoState === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Estados de Demonstração</h2>
              <div className="flex gap-2 mb-4">
                <Button onClick={() => setDemoState('normal')} variant="outline">
                  Normal
                </Button>
                <Button onClick={() => setDemoState('loading')} variant="outline">
                  Loading
                </Button>
                <Button onClick={() => setDemoState('error')} variant="default">
                  Error
                </Button>
              </div>
            </Card>
          </div>
          
          <ErrorDisplay 
            error="Falha ao conectar com o servidor de dados financeiros. Verifique sua conexão com a internet."
            onRetry={() => setDemoState('normal')}
          />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="fixed top-4 right-4 z-[100]">
        <Card className="p-4 shadow-lg">
          <h3 className="text-sm font-semibold mb-3">Demo States</h3>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={() => setDemoState('normal')} 
              variant={demoState === 'normal' ? 'default' : 'outline'}
              size="sm"
            >
              ✅ Normal
            </Button>
            <Button 
              onClick={() => setDemoState('loading')} 
              variant="outline"
              size="sm"
            >
              🔄 Loading
            </Button>
            <Button 
              onClick={() => setDemoState('error')} 
              variant="outline"
              size="sm"
            >
              ❌ Error
            </Button>
            <Button 
              onClick={() => setForceError(!forceError)} 
              variant={forceError ? 'secondary' : 'outline'}
              size="sm"
            >
              💥 Force Error
            </Button>
          </div>
        </Card>
      </div>
      
      <ErrorComponent />
      <DashboardPage />
    </ErrorBoundary>
  );
}