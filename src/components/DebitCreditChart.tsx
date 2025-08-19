import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useResponsive } from '@/hooks/useResponsive';

interface DebitCreditChartProps {
  data: {
    weeklyChart: { name: string; Debito: number; Credito: number }[];
    totalDebitMonth: number;
    totalCreditMonth: number;
  };
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-card border border-border rounded-lg shadow-sm">
          <p className="label text-foreground">{label}</p>
          {payload.map((pld: any, index: number) => (
            <p key={index} style={{ color: pld.fill }}>
              {`${pld.name}: ${formatCurrency(pld.value)}`}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
};

const DebitCreditChart: React.FC<DebitCreditChartProps> = ({ data }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="bg-card rounded-2xl p-6 border border-white/5">
      <h2 className="text-xl font-semibold text-foreground mb-2">Débito & Crédito</h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <p className="text-sm text-foreground/80">
          <span className="font-semibold text-foreground">{formatCurrency(data.totalDebitMonth)}</span> <span className="text-primary">Débito</span> e <span className="font-semibold text-foreground">{formatCurrency(data.totalCreditMonth)}</span> <span className="text-secondary">Crédito</span> neste Mês
        </p>
        <div className="flex items-center space-x-4 sm:ml-auto">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-foreground/80">Débito</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-sm text-foreground/80">Crédito</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data.weeklyChart}
          margin={{
            top: 20,
            right: isMobile ? 0 : 30,
            left: isMobile ? -20 : 20,
            bottom: 5,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--foreground) / 0.8)' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--foreground) / 0.8)' }}
            tickFormatter={(value) => formatCurrency(value as number)}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--primary) / 0.2)'}} />
          <Bar
            dataKey="Debito"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            maxBarSize={isMobile ? 20 : 40}
          />
          <Bar
            dataKey="Credito"
            fill="hsl(var(--secondary))"
            radius={[4, 4, 0, 0]}
            maxBarSize={isMobile ? 20 : 40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DebitCreditChart;
