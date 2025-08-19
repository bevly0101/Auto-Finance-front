import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ResponsiveChart } from "../charts/ResponsiveChart";
import { useExpenseCategoryOptions } from "../charts/options/useExpenseCategoryOptions";
interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface FigmaCategoryPieChartProps {
  data: CategoryData[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, ...props }: any) => {
  if (props.isDataEmpty) {
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

const FigmaCategoryPieChart: React.FC<FigmaCategoryPieChartProps> = ({ data }) => {

  const title = 'Gastos por categoria';
  
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);
  const isDataEmpty = !data || data.length === 0 || totalValue === 0;

  const chartData = isDataEmpty
    ? [{ name: 'Sem dados', value: 1, color: 'hsl(var(--muted))' }]
    : data;

  return (
    <div className="w-full bg-card rounded-[25px] p-6 shadow-sm border">
      <div className="mb-4">
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
      </div>
      <ResponsiveChart className="h-[350px] w-full">
        {(breakpoint) => {
          const { pieProps, isSmallScreen } = useExpenseCategoryOptions(breakpoint); // Será ajustado para ser genérico
          return (
            <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'} items-center justify-center h-full relative`}>
              {isDataEmpty && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-muted-foreground font-medium">Sem dados</span>
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
                    >
                      {chartData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className={`flex ${isSmallScreen ? 'flex-row flex-wrap justify-center content-center gap-x-4 gap-y-2' : 'flex-col justify-center pl-6 gap-y-2'} w-full`}
                style={{ height: isSmallScreen ? '30%' : '100%', width: isSmallScreen ? '100%' : '50%' }}
              >
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-muted-foreground">{item.name}</span>
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

export default FigmaCategoryPieChart;

