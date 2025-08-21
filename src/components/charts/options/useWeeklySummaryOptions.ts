import { useMemo } from 'react';
import { Breakpoint } from '../hooks/useChartDimensions';
import { useChartTheme } from '../hooks/useChartTheme';

const weekDayAbbreviations: { [key: string]: string } = {
  domingo: 'dom',
  segunda: 'seg',
  terça: 'ter',
  quarta: 'qua',
  quinta: 'qui',
  sexta: 'sex',
  sábado: 'sab',
};

const formatXAxis = (tickItem: string) => {
  const lowercasedTick = tickItem.toLowerCase();
  return weekDayAbbreviations[lowercasedTick] || tickItem;
};

/**
 * Hook customizado para gerar as opções do gráfico de resumo semanal
 * de forma dinâmica, com base no breakpoint do contêiner.
 * @param breakpoint - O breakpoint atual ('sm', 'md', 'lg', 'xl').
 * @returns Um objeto com as configurações para o componente BarChart da recharts.
 */
export const useWeeklySummaryOptions = (breakpoint: Breakpoint) => {
  const { textColor } = useChartTheme();
  const options = useMemo(() => {
    const isSmallScreen = breakpoint === 'sm' || breakpoint === 'md';

    const xAxisProps = {
      dataKey: "day",
      axisLine: false,
      tickLine: false,
      tick: {
        fontSize: isSmallScreen ? 10 : 12,
        fill: textColor,
      },
      tickFormatter: formatXAxis,
      height: 30,
      interval: 0,
    };

    const yAxisProps = {
      axisLine: false,
      tickLine: false,
      tick: { fontSize: 12, fill: textColor },
      domain: [0, 500],
      ticks: [0, 100, 200, 300, 400, 500],
    };

    const barProps: { radius: [number, number, number, number]; barSize: number } = {
      radius: [4, 4, 0, 0],
      barSize: isSmallScreen ? 16 : 25,
    };

    return {
      xAxisProps,
      yAxisProps,
      barProps,
    };
  }, [breakpoint, textColor]);

  return options;
};