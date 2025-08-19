import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ResponsiveChart } from "./charts/ResponsiveChart";
import { useExpenseCategoryOptions } from "./charts/options/useExpenseCategoryOptions"; // Manter por enquanto, será ajustado

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoryChartProps {
  data: CategoryData[];
  type: 'income' | 'expense';
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }: any) => {
  if (value === 0) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="hsl(var(--foreground))" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = payload[0].totalValue;
    const percentage = total > 0 ? ((data.value / total) * 100).toFixed(0) : 0;
    return (
      <div className="custom-tooltip p-2 bg-card border border-border rounded-md shadow-md">
        <p className="label text-sm font-semibold">{`${data.name}`}</p>
        <p className="intro text-xs text-muted-foreground">{`Total: R$${data.value.toFixed(2)}`}</p>
        <p className="desc text-xs text-muted-foreground">{`Porcentagem: ${percentage}%`}</p>
      </div>
    );
  }

  return null;
};

export const CategoryChart: React.FC<CategoryChartProps> = ({ data, type }) => {
  const title = type === 'expense' ? 'Gastos por categoria' : 'Receitas por categoria';
  
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);
  const isDataEmpty = !data || data.length === 0 || totalValue === 0;

  const chartData = isDataEmpty
    ? [{ name: 'Sem dados', value: 1, color: 'hsl(var(--muted))' }]
    : data.filter(entry => entry.value > 0);

  return (
    <div className="w-full bg-card rounded-[25px] p-4 sm:p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-foreground text-base sm:text-lg font-semibold">{title}</h3>
      </div>
      <ResponsiveChart className="h-[300px] sm:h-[350px] w-full">
        {(breakpoint) => {
          const { pieProps, isSmallScreen } = useExpenseCategoryOptions(breakpoint); // Será ajustado para ser genérico
          return (
            <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'} items-center justify-center h-full relative`}>
              {isDataEmpty && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-muted-foreground font-medium text-sm">Sem dados</span>
                </div>
              )}
              <div className="w-full" style={{ height: isSmallScreen ? '70%' : '100%', width: isSmallScreen ? '100%' : '50%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      label={(props) => renderCustomizedLabel({ ...props, isDataEmpty })}
                      dataKey="value"
                      {...pieProps}
                      stroke="hsl(var(--card))"
                      strokeWidth={2}
                    >
                      {chartData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className={`flex ${isSmallScreen ? 'flex-row flex-wrap justify-center content-center gap-x-2 gap-y-1 sm:gap-x-4 sm:gap-y-2' : 'flex-col justify-center pl-4 sm:pl-6 gap-y-2'} w-full`}
                style={{ height: isSmallScreen ? '30%' : '100%', width: isSmallScreen ? '100%' : '50%' }}
              >
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs sm:text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </ResponsiveChart>
    </div>
  );
};

export default CategoryChart;


