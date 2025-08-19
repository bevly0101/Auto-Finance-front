import { useState, useLayoutEffect, RefObject } from 'react';

// Define os breakpoints alinhados com o TailwindCSS padrão
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

export type Breakpoint = keyof typeof breakpoints | 'xl';

/**
 * Hook customizado que monitora as dimensões de um elemento de referência
 * e retorna o breakpoint atual (sm, md, lg, xl).
 * @param targetRef - A referência (RefObject) para o elemento a ser observado.
 * @returns O breakpoint atual como uma string.
 */
export const useChartDimensions = (targetRef: RefObject<HTMLElement>): Breakpoint => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const getWidth = () => targetRef.current?.offsetWidth || 0;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    if (targetRef.current) {
      setWidth(getWidth());
      resizeObserver.observe(targetRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [targetRef]);

  if (width < breakpoints.sm) return 'sm';
  if (width < breakpoints.md) return 'md';
  if (width < breakpoints.lg) return 'lg';
  return 'xl';
};