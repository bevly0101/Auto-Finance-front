import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useResponsive } from "@/hooks/useResponsive";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface BalanceStatisticsChartProps {
  data: ChartData[];
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-6">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-foreground/80 font-medium">
            {entry.value} ({((entry.payload.percent || 0) * 100).toFixed(0)}%)
          </span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceStatisticsChart({ data }: BalanceStatisticsChartProps): JSX.Element {
  const { isMobile } = useResponsive();

  return (
    <div className="bg-card rounded-[25px] p-6 border border-white/5">
      <h2 className="text-foreground text-[22px] font-semibold mb-6">
        Estatísticas de Transações por Conta
      </h2>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 40 : 60}
              outerRadius={isMobile ? 80 : 120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} transações`} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
