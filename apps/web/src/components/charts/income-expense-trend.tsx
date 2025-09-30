'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface IncomeExpenseTrendProps {
  data: Array<{
    month: string;
    income: number;
    expense: number;
    net: number;
  }>;
}

export function IncomeExpenseTrend({ data }: IncomeExpenseTrendProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMonth = (month: string) => {
    const months = {
      '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr',
      '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Ago',
      '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez'
    };
    return months[month as keyof typeof months] || month;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="month" 
          tickFormatter={formatMonth}
          className="text-sm"
        />
        <YAxis 
          tickFormatter={(value) => formatCurrency(value).replace('R$', 'R$')}
          className="text-sm"
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatCurrency(value), 
            name === 'income' ? 'Receita' : name === 'expense' ? 'Despesa' : 'Líquido'
          ]}
          labelFormatter={(label) => `Mês: ${formatMonth(label)}`}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="1"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="expense"
          stackId="2"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.6}
        />
        <Line
          type="monotone"
          dataKey="net"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}