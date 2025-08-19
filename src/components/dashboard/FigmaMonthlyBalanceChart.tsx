import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ResponsiveChart } from "../charts/ResponsiveChart";
import { useMonthlyBalanceOptions } from "../charts/options/useMonthlyBalanceOptions";
import { Transaction } from './types';

interface MonthlyBalanceData {
  month: string;
  balance: number;
}

interface FigmaMonthlyBalanceChartProps {
  transactions: Transaction[];
}

export const FigmaMonthlyBalanceChart: React.FC<FigmaMonthlyBalanceChartProps> = ({ transactions }) => {
  // Get last 12 months data and calculate balance
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    return date;
  });

  let runningBalance = 0;
  const data: MonthlyBalanceData[] = last12Months.map(date => {
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === date.getMonth() && 
             transactionDate.getFullYear() === date.getFullYear();
    });

    const income = monthTransactions
      .filter(t => t.type === 'entrada')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter(t => t.type === 'saída')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;
    runningBalance += balance; // Calculate running balance

    return {
      month: date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase(),
      balance: runningBalance, // Use running balance for the chart
    };
  });

  return (
    <div className="w-full bg-card rounded-[25px] p-6 shadow-sm border">
      <div className="mb-6">
        <h3 className="text-foreground text-lg font-semibold">Balanço Mensal</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveChart>
          {(breakpoint) => {
            const { xAxisProps, yAxisProps } = useMonthlyBalanceOptions(breakpoint);
            return (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis {...xAxisProps} />
                  <YAxis {...yAxisProps} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            );
          }}
        </ResponsiveChart>
      </div>
    </div>
  );
};

export default FigmaMonthlyBalanceChart;

