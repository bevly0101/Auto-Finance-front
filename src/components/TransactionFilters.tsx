import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';

// Tipos para os filtros
export interface TransactionFiltersState {
  type: 'all' | 'income' | 'expense';
  period: string;
  categories: string[];
}

interface TransactionFiltersProps {
  // Supondo que você tenha uma lista de categorias para popular o seletor
  allCategories: { id: string; name: string }[];
  onApplyFilters: (filters: TransactionFiltersState) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ allCategories, onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionFiltersState>({
    type: 'all',
    period: 'all',
    categories: [],
  });

  const handleApply = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar Transações</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Filtro por Tipo */}
          <div>
            <Label>Tipo</Label>
            <div className="flex space-x-2 mt-2">
              <Button variant={filters.type === 'all' ? 'default' : 'outline'} onClick={() => setFilters(f => ({ ...f, type: 'all' }))}>Todos</Button>
              <Button variant={filters.type === 'income' ? 'default' : 'outline'} onClick={() => setFilters(f => ({ ...f, type: 'income' }))}>Entradas</Button>
              <Button variant={filters.type === 'expense' ? 'default' : 'outline'} onClick={() => setFilters(f => ({ ...f, type: 'expense' }))}>Saídas</Button>
            </div>
          </div>

          {/* Filtro por Período */}
          <div>
            <Label htmlFor="period">Período</Label>
            <Select value={filters.period} onValueChange={(value) => setFilters(f => ({ ...f, period: value }))}>
              <SelectTrigger id="period">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo o Período</SelectItem>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Este Mês</SelectItem>
                <SelectItem value="last_month">Mês Passado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Categoria (Exemplo simples, pode ser melhorado com um multi-select) */}
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={(value) => setFilters(f => ({ ...f, categories: [value] }))}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {allCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleApply}>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionFilters;