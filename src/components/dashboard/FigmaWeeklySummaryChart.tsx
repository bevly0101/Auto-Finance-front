import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ResponsiveChart } from "../charts/ResponsiveChart";
import { useWeeklySummaryOptions } from "../charts/options/useWeeklySummaryOptions";
import { Transaction } from './types';

interface WeeklySummaryData {
  day: string;
  entradas: number;
  gastos: number;
}

interface FigmaWeeklySummaryChartProps {
  transactions: Transaction[];
}

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 mb-4">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-destructive rounded-full"></div>
      <span className="text-sm text-muted-foreground">Entradas</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <span className="text-sm text-muted-foreground">Gastos</span>
    </div>
  </div>
);

const FigmaWeeklySummaryChart: React.FC<FigmaWeeklySummaryChartProps> = ({ transactions }) => {
  // Get last 7 days data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const chartData = last7Days.map(date => {
    const dayTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.toDateString() === date.toDateString();
    });

    const gastos = dayTransactions
      .filter(t => t.type === 'saída')
      .reduce((sum, t) => sum + t.amount, 0);

    const entradas = dayTransactions
      .filter(t => t.type === 'entrada')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      day: date.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase(),
      gastos: gastos,
      entradas: entradas,
      fullDate: date.toISOString().split('T')[0]
    };
  });

  return (
    <div className="w-full bg-card rounded-[25px] p-6 shadow-sm border">
      <div className="mb-6">
        <h3 className="text-foreground text-lg font-semibold">Resumo Semanal</h3>
      </div>
      <CustomLegend />
      <div className="h-[350px] w-full">
        <ResponsiveChart>
          {(breakpoint) => {
            const { xAxisProps, yAxisProps, barProps } = useWeeklySummaryOptions(breakpoint);
            return (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  barCategoryGap="20%"
                >
                  <XAxis {...xAxisProps} />
                  <YAxis {...yAxisProps} />
                  <Bar dataKey="entradas" fill="hsl(var(--destructive))" {...barProps} />
                  <Bar dataKey="gastos" fill="hsl(var(--primary))" {...barProps} />
                </BarChart>
              </ResponsiveContainer>
            );
          }}
        </ResponsiveChart>
      </div>
    </div>
  );
};

export default FigmaWeeklySummaryChart;

