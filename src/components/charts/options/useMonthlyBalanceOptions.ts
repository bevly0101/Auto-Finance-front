import { useMemo } from 'react';
import { Breakpoint } from '../hooks/useChartDimensions';
import { useChartTheme } from '../hooks/useChartTheme';

/**
 * Hook customizado para gerar as opções do gráfico de balanço mensal.
 * @param breakpoint - O breakpoint atual ('sm', 'md', 'lg', 'xl').
 * @returns Um objeto com as configurações para o componente AreaChart da recharts.
 */
export const useMonthlyBalanceOptions = (breakpoint: Breakpoint) => {
  const { textColor } = useChartTheme();
  const options = useMemo(() => {
    const isSmallScreen = breakpoint === 'sm' || breakpoint === 'md';

    const axisProps = {
      axisLine: false,
      tickLine: false,
      tick: {
        fontSize: isSmallScreen ? 10 : 12,
        fill: textColor,
      },
    };

    return {
      xAxisProps: { ...axisProps, dataKey: "month" },
      yAxisProps: { ...axisProps, domain: [0, 800], ticks: [0, 200, 400, 600, 800] },
    };
  }, [breakpoint, textColor]);

  return options;
};