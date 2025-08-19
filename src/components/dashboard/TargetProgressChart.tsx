
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface TargetProgressChartProps {
  totalIncome: number;
  totalExpenses: number;
  expenseCategoriesData: { name: string; value: number }[];
  incomeCategoriesData: { name: string; value: number }[];
}

const TargetProgressChart: React.FC<TargetProgressChartProps> = ({ 
  totalIncome, 
  totalExpenses,
  expenseCategoriesData = [],
  incomeCategoriesData = []
}) => {
  const [showExpenses, setShowExpenses] = useState(true);
  
  // Cores para as categorias
  const colors = [
    'hsl(var(--primary))',
    '#10B981',
    '#F59E0B', 
    '#EF4444',
    '#8B5CF6',
    '#06B6D4',
    '#84CC16',
    '#F97316',
    '#EC4899',
    '#6366F1'
  ];

  // Dados baseados na seleção (gastos ou receitas)
  const currentData = showExpenses ? expenseCategoriesData : incomeCategoriesData;
  
  // Preparar dados do gráfico com cores
  const chartData = currentData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length]
  }));

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="h-[450px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">
            {showExpenses ? 'Seus Gastos' : 'Suas Receitas'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {showExpenses ? 'Gastos organizados por categoria' : 'Receitas organizadas por categoria'}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowExpenses(true)}>
              Seus Gastos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowExpenses(false)}>
              Suas Receitas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col h-[370px]">
        {chartData.length > 0 ? (
          <>
            {/* Gráfico de Pizza com margens aumentadas */}
            <div className="flex-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}`,
                      'Valor'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Lista de Categorias */}
            <div className="space-y-2 mt-4 max-h-32 overflow-y-auto">
              {chartData.map((item, index) => {
                const percentage = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium truncate">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-sm">
                        R$ {item.value.toLocaleString('pt-BR', { 
                          minimumFractionDigits: 2, 
                          maximumFractionDigits: 2 
                        })}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                {showExpenses ? 'Nenhuma categoria de gasto encontrada' : 'Nenhuma categoria de receita encontrada'}
              </p>
              <p className="text-xs mt-1">
                {showExpenses ? 'Adicione alguns gastos para ver a distribuição' : 'Adicione algumas receitas para ver a distribuição'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TargetProgressChart;
