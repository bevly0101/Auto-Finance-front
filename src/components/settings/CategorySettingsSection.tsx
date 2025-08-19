import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserSettings, Category } from '@/hooks/useUserSettings';
import { Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import AddCategoryDialog from './AddCategoryDialog';

const CategoryList: React.FC<{
  title: string;
  categories: Category;
  onAdd: () => void;
  onRemove: (categoryName: string) => void;
  isLoading: boolean;
}> = ({ title, categories, onAdd, onRemove, isLoading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="mb-4 w-full" onClick={onAdd}>
          Adicionar Categoria
        </Button>
        <div className="flex flex-col space-y-3">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </>
          ) : Object.entries(categories).length > 0 ? (
            Object.entries(categories).map(([name, description]) => (
              <div
                key={name}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-muted-foreground">{description.descricao}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onRemove(name)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              Nenhuma categoria encontrada.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


const CategorySettingsSection: React.FC = () => {
    const {
        expenseCategories,
        incomeCategories,
        updateCategories,
        loading,
      } = useUserSettings();
    
      const [isDialogOpen, setDialogOpen] = useState(false);
      const [dialogType, setDialogType] = useState<'expense' | 'income'>('expense');
    
      const handleRemoveCategory = async (type: 'expense' | 'income', categoryName: string) => {
        const currentCategories = type === 'expense' ? { ...expenseCategories } : { ...incomeCategories };
        delete currentCategories[categoryName];
        await updateCategories(type, currentCategories);
      };
    
      const handleOpenDialog = (type: 'expense' | 'income') => {
        setDialogType(type);
        setDialogOpen(true);
      };
    
      const handleAddCategory = async (name: string, description: string) => {
        const currentCategories = dialogType === 'expense' ? { ...expenseCategories } : { ...incomeCategories };
        const newCategories = { ...currentCategories, [name]: { descricao: description } };
        await updateCategories(dialogType, newCategories);
        setDialogOpen(false);
      };


  return (
    <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium">Categorias</h3>
            <p className="text-sm text-muted-foreground">
                Gerencie suas categorias de despesas e receitas para organizar suas transações.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryList
            title="Categorias de Despesas"
            categories={expenseCategories}
            onAdd={() => handleOpenDialog('expense')}
            onRemove={(name) => handleRemoveCategory('expense', name)}
            isLoading={loading}
        />
        <CategoryList
            title="Categorias de Receitas"
            categories={incomeCategories}
            onAdd={() => handleOpenDialog('income')}
            onRemove={(name) => handleRemoveCategory('income', name)}
            isLoading={loading}
        />
        </div>
        <AddCategoryDialog
            open={isDialogOpen}
            onOpenChange={setDialogOpen}
            onAddCategory={handleAddCategory}
            categoryType={dialogType === 'expense' ? 'despesa' : 'receita'}
      />
    </div>
  );
};

export default CategorySettingsSection;
