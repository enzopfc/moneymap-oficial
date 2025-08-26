import * as React from 'react';
import { cn } from '../lib/utils';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type?: 'bar' | 'line' | 'pie' | 'donut';
  width?: number;
  height?: number;
  className?: string;
  title?: string;
  showValues?: boolean;
  showLegend?: boolean;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ 
    data, 
    type = 'bar', 
    width = 400, 
    height = 300, 
    className, 
    title,
    showValues = true,
    showLegend = true 
  }, ref) => {
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ];

    const maxValue = Math.max(...data.map(d => d.value));
    const total = data.reduce((sum, d) => sum + d.value, 0);

    const renderBarChart = () => (
      <div className="space-y-2">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const color = item.color || colors[index % colors.length];
          
          return (
            <div key={item.label} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-gray-600 truncate">
                {item.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                />
                {showValues && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {item.value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );

    const renderDonutChart = () => {
      let cumulativePercentage = 0;
      const center = 50;
      const radius = 40;
      const strokeWidth = 12;

      return (
        <div className="flex flex-col items-center">
          <svg width={200} height={200} viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              const color = item.color || colors[index % colors.length];
              
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={item.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              );
            })}
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dy="0.3em"
              fontSize="12"
              fill="#374151"
              className="font-semibold transform rotate-90"
            >
              {total}
            </text>
          </svg>
        </div>
      );
    };

    const renderLegend = () => (
      <div className="flex flex-wrap gap-4 mt-4">
        {data.map((item, index) => {
          const color = item.color || colors[index % colors.length];
          const percentage = ((item.value / total) * 100).toFixed(1);
          
          return (
            <div key={item.label} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-gray-600">
                {item.label} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    );

    const renderChart = () => {
      switch (type) {
        case 'donut':
        case 'pie':
          return renderDonutChart();
        case 'line':
          return renderBarChart(); // Simplified - same as bar for now
        default:
          return renderBarChart();
      }
    };

    if (data.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg',
            className
          )}
          style={{ width, height }}
        >
          <div className="text-center text-gray-500">
            <div className="mb-2">📊</div>
            <div className="text-sm">Sem dados para exibir</div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('bg-white rounded-lg border border-gray-200 p-4', className)}
      >
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        
        <div className="flex items-center justify-center">
          {renderChart()}
        </div>
        
        {showLegend && renderLegend()}
      </div>
    );
  }
);

Chart.displayName = 'Chart';

export { Chart };
