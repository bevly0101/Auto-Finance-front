import React from 'react';
import { Badge } from "@/components/ui/badge";

interface CategoryDetailsDisplayProps {
  data: Array<{ name: string; value: number; }>;
  total: number;
  isExpenses: boolean;
}

export const CategoryDetailsDisplay: React.FC<CategoryDetailsDisplayProps> = ({ 
  data, 
  total, 
  isExpenses 
}) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500'
  ];

  return (
    <div className="space-y-3 mt-4">
      <h4 className="text-sm font-medium text-muted-foreground">
        {isExpenses ? 'Categorias de Gastos' : 'Categorias de Entradas'}
      </h4>
      {data.map((item, index) => {
        const percentage = total > 0 ? (item.value / total * 100) : 0;
        return (
          <div key={item.name} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                R$ {item.value.toFixed(2)}
              </span>
              <Badge variant="secondary" className="text-xs">
                {percentage.toFixed(1)}%
              </Badge>
            </div>
          </div>
        );
      })}
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Nenhuma categoria encontrada
        </p>
      )}
    </div>
  );
};