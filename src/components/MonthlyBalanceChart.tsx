import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ResponsiveChart } from "./charts/ResponsiveChart";
import { useMonthlyBalanceOptions } from "./charts/options/useMonthlyBalanceOptions";
import { useTheme } from "@/contexts/ThemeContext";

interface MonthlyBalanceData {
  month: string;
  balance: number;
}

interface MonthlyBalanceChartProps {
  data: MonthlyBalanceData[];
}

export const MonthlyBalanceChart: React.FC<MonthlyBalanceChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const effectiveTheme = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
  
  const chartColor = effectiveTheme === 'light' ? '#3b82f6' : 'hsl(var(--primary))';

  return (
    <div className="w-full bg-card rounded-[25px] p-4 sm:p-6 shadow-sm border">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-foreground text-base sm:text-lg font-semibold">Balanço Mensal</h3>
      </div>
      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveChart>
          {(breakpoint) => {
            const { xAxisProps, yAxisProps } = useMonthlyBalanceOptions(breakpoint);
            return (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis {...xAxisProps} />
                  <YAxis {...yAxisProps} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke={chartColor}
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

export default MonthlyBalanceChart;

