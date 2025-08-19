import React, { useState } from 'react';
import { CreditCard, Edit, Trash2 } from 'lucide-react';
import { useResponsive } from '@/hooks/useResponsive';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { UserBank } from '@/components/dashboard/types';
import EditAccountForm from './EditAccountForm';
import { updateAccount } from '@/services/accountService';
import { useToast } from './ui/use-toast';

interface AccountCardProps {
  account: UserBank;
  onUpdate: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onUpdate }) => {
  const { isMobile } = useResponsive();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (updatedName: string) => {
    const result = await updateAccount(account.id, { custom_name: updatedName });
    if (result) {
      toast({
        title: "Sucesso!",
        description: "Sua conta foi atualizada.",
      });
      onUpdate();
      setIsEditing(false);
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a conta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance);
  };

  const renderModalContent = () => {
    if (isEditing) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Editar Conta</DialogTitle>
            <DialogDescription>
              Altere o nome da sua conta para facilitar a identificação.
            </DialogDescription>
          </DialogHeader>
          <EditAccountForm
            account={account}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        </>
      );
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle>Detalhes da Conta</DialogTitle>
          <DialogDescription>
            Visualize os detalhes da sua conta. Você pode editar ou excluir a conta a qualquer momento.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Banco</span>
            <span className="text-sm font-semibold text-foreground">{account.bankName || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Nome da Conta</span>
            <span className="text-sm font-semibold text-foreground">{account.accountName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Saldo</span>
            <span className="text-sm font-semibold text-foreground">{formatBalance(account.balance)}</span>
          </div>
        </div>
        <DialogFooter className="mt-6 sm:justify-between gap-2">
          <Button variant="destructive" className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
          <Button className="w-full sm:w-auto" onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Conta
          </Button>
        </DialogFooter>
      </>
    );
  };

  // Desktop View
  if (!isMobile) {
    return (
      <div className="flex items-center py-4 border-b border-border last:border-b-0">
        <div className="w-[60px] h-[60px] rounded-[15px] flex items-center justify-center mr-4" style={{ backgroundColor: account.color_rgb }}>
          <CreditCard className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1 grid grid-cols-4 gap-4 items-center">
          <div>
            <p className="text-muted-foreground text-sm font-medium">Banco</p>
            <p className="text-foreground text-base font-medium">{account.bankName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium">Saldo</p>
            <p className="text-foreground text-base font-medium">{formatBalance(account.balance)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium">Nome da conta</p>
            <p className="text-foreground text-base font-medium">{account.accountName}</p>
          </div>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">Ver detalhes</Button>
          </DialogTrigger>
          <DialogContent>
            {renderModalContent()}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Mobile View
  return (
    <div className="flex items-center py-4 border-b border-border last:border-b-0">
      <div className="w-[50px] h-[50px] rounded-[12px] flex items-center justify-center mr-4" style={{ backgroundColor: account.color_rgb }}>
        <CreditCard className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <p className="text-foreground text-base font-medium">{account.accountName}</p>
        <p className="text-muted-foreground text-sm font-medium">{account.bankName || 'N/A'}</p>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">Ver detalhes</Button>
        </DialogTrigger>
        <DialogContent>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountCard;