import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { useResponsive } from "@/hooks/useResponsive";

interface ChartData {
  month: string;
  value: number;
  active: boolean;
}

interface TransactionsExpenseChartProps {
  data: {
    name: string;
    expenses: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-card border border-border rounded-lg shadow-sm">
        <p className="label text-foreground">{`${label} : ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
      </div>
    );
  }

  return null;
};

export default function TransactionsExpenseChart({ data }: TransactionsExpenseChartProps): JSX.Element {
  
  const { isMobile } = useResponsive();
  
  const chartData: ChartData[] = data.map((item, index) => ({
    month: item.name,
    value: item.expenses,
    // O penúltimo item é o mês atual (índice data.length - 2)
    active: index === data.length - 2,
  }));

  const currentMonthExpense = chartData.find(d => d.active)?.value || 0;

  return (
    <div className="bg-card rounded-2xl p-6 border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Meus Gastos</h3>
        <span className="text-lg font-semibold text-foreground">
          {currentMonthExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--foreground) / 0.8)' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar
              dataKey="value"
              radius={[8, 8, 8, 8]}
              barSize={isMobile ? 20 : 50}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.active ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
