import { useMemo } from 'react';
import { Breakpoint } from '../hooks/useChartDimensions';

/**
 * Hook customizado para gerar as opções do gráfico de categorias de despesa.
 * @param breakpoint - O breakpoint atual ('sm', 'md', 'lg', 'xl').
 * @returns Um objeto com as configurações para o componente PieChart da recharts.
 */
export const useExpenseCategoryOptions = (breakpoint: Breakpoint) => {
  const options = useMemo(() => {
    const isSmallScreen = breakpoint === 'sm' || breakpoint === 'md';

    const pieProps = {
      outerRadius: isSmallScreen ? 80 : 100,
      labelLine: false,
    };

    return {
      pieProps,
      isSmallScreen,
    };
  }, [breakpoint]);

  return options;
};