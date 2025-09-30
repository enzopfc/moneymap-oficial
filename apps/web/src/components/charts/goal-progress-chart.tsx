'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GoalProgressChartProps {
  data: Array<{
    title: string;
    current: number;
    target: number;
    progress: number;
  }>;
}

export function GoalProgressChart({ data }: GoalProgressChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="title" 
          className="text-sm"
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tickFormatter={(value) => formatCurrency(value).replace('R$', 'R$')}
          className="text-sm"
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatCurrency(value), 
            name === 'current' ? 'Valor Atual' : 'Meta'
          ]}
          labelFormatter={(label) => `Meta: ${label}`}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Bar dataKey="current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}