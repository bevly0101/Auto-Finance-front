import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ResponsiveChart } from "./charts/ResponsiveChart";
import { useWeeklySummaryOptions } from "./charts/options/useWeeklySummaryOptions";

interface WeeklySummaryData {
  day: string;
  entradas: number;
  gastos: number;
}

interface WeeklySummaryChartProps {
  data: WeeklySummaryData[];
}

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 mb-4">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#20B2AA' }}></div>
      <span className="text-sm text-muted-foreground">Entradas</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4169E1' }}></div>
      <span className="text-sm text-muted-foreground">Gastos</span>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="label text-sm font-semibold">{`${label}`}</p>
        <p className="intro text-sm text-green-600">Entradas: {`${payload[0].value}`}</p>
        <p className="intro text-sm text-blue-600">Gastos: {`${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

export const WeeklySummaryChart: React.FC<WeeklySummaryChartProps> = ({ data }) => {
  const formatDayOfWeek = (day: string, isMobile: boolean) => {
    if (!isMobile) return day;
    const abbreviations: { [key: string]: string } = {
      'segunda': 'seg',
      'terça': 'ter',
      'quarta': 'qua',
      'quinta': 'qui',
      'sexta': 'sex',
      'sábado': 'sáb',
      'domingo': 'dom',
    };
    return abbreviations[day.toLowerCase()] || day;
  };

  return (
    <div className="w-full bg-card rounded-[25px] p-4 sm:p-6 shadow-sm border">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-foreground text-base sm:text-lg font-semibold">Resumo Semanal</h3>
      </div>
      <CustomLegend />
      <div className="h-[300px] sm:h-[350px] w-full">
        <ResponsiveChart>
          {(breakpoint) => {
            const { xAxisProps, yAxisProps, barProps } = useWeeklySummaryOptions(breakpoint);
            const isMobile = breakpoint === 'sm';
            return (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  barCategoryGap="20%"
                >
                  <XAxis {...xAxisProps} tickFormatter={(value) => formatDayOfWeek(value, isMobile)} />
                  <YAxis {...yAxisProps} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="entradas" fill="#20B2AA" {...barProps} />
                  <Bar dataKey="gastos" fill="#4169E1" {...barProps} />
                </BarChart>
              </ResponsiveContainer>
            );
          }}
        </ResponsiveChart>
      </div>
    </div>
  );
};

export default WeeklySummaryChart;

