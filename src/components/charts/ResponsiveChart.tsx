import React, { useRef, ReactNode } from 'react';
import { useChartDimensions, Breakpoint } from './hooks/useChartDimensions';

interface ResponsiveChartProps {
  children: (breakpoint: Breakpoint) => ReactNode;
  className?: string;
}

/**
 * Um componente wrapper que detecta o breakpoint de seu contêiner
 * e o fornece a seus filhos através de uma render prop.
 */
export const ResponsiveChart: React.FC<ResponsiveChartProps> = ({ children, className }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const breakpoint = useChartDimensions(chartContainerRef);

  return (
    <div ref={chartContainerRef} className={className || 'w-full h-full'}>
      {/* Sempre renderiza o filho para manter a contagem de hooks consistente. */}
      {children(breakpoint)}
    </div>
  );
};