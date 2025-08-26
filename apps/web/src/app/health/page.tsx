import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Check | MoneyMapp',
  description: 'Status da aplicação MoneyMapp'
};

async function getHealthStatus() {
  try {
    const apiUrl = process.env.API_BASE_URL || 'http://localhost:3333';
    const response = await fetch(`${apiUrl}/health`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      services: {
        api: 'unreachable'
      }
    };
  }
}

export default async function HealthPage() {
  const health = await getHealthStatus();
  const isHealthy = health.status === 'ok';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isHealthy 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-red-500 to-pink-500'
          }`}>
            <span className="text-white text-2xl">
              {isHealthy ? '✅' : '❌'}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Health Check
          </h1>
          
          <p className="text-lg text-gray-600">
            Status da aplicação MoneyMapp
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Status Geral</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isHealthy 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {health.status || 'unknown'}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Timestamp:</span>
                <span className="text-gray-900 text-sm">
                  {new Date(health.timestamp).toLocaleString('pt-BR')}
                </span>
              </div>
              
              {health.uptime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime:</span>
                  <span className="text-gray-900">{health.uptime}s</span>
                </div>
              )}
              
              {health.version && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Versão:</span>
                  <span className="text-gray-900">{health.version}</span>
                </div>
              )}
              
              {health.environment && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Ambiente:</span>
                  <span className="text-gray-900 capitalize">{health.environment}</span>
                </div>
              )}
            </div>
          </div>

          {/* Services Status */}
          {health.services && (
            <>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Banco de Dados</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    health.services.database === 'healthy' 
                      ? 'bg-green-100 text-green-800'
                      : health.services.database === 'disabled'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {health.services.database}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    health.services.database === 'healthy' 
                      ? 'bg-green-500'
                      : health.services.database === 'disabled'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-600 capitalize">
                    {health.services.database === 'healthy' ? 'Conectado' : 
                     health.services.database === 'disabled' ? 'Desabilitado' : 'Erro de conexão'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Redis Cache</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    health.services.redis === 'healthy' 
                      ? 'bg-green-100 text-green-800'
                      : health.services.redis === 'disabled'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {health.services.redis}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    health.services.redis === 'healthy' 
                      ? 'bg-green-500'
                      : health.services.redis === 'disabled'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-600 capitalize">
                    {health.services.redis === 'healthy' ? 'Conectado' : 
                     health.services.redis === 'disabled' ? 'Desabilitado' : 'Erro de conexão'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">E-mail (SMTP)</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    health.services.smtp === 'configured' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {health.services.smtp}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    health.services.smtp === 'configured' 
                      ? 'bg-green-500'
                      : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-gray-600">
                    {health.services.smtp === 'configured' ? 'Configurado' : 'Não configurado'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Error Details */}
        {health.error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Erro de Conectividade</h3>
            <p className="text-red-700 mb-4">
              Não foi possível conectar com a API do MoneyMapp.
            </p>
            <details className="text-sm">
              <summary className="font-medium text-red-800 cursor-pointer">
                Detalhes técnicos
              </summary>
              <pre className="mt-2 text-red-600 whitespace-pre-wrap">
                {health.error}
              </pre>
            </details>
          </div>
        )}

        {/* Actions */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition"
            >
              Atualizar Status
            </button>
            
            <a
              href="/"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Voltar ao Início
            </a>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Esta página mostra o status em tempo real dos serviços do MoneyMapp.
          </p>
        </div>
      </div>
    </div>
  );
}
