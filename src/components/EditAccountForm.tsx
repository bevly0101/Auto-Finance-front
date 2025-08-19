import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserBank } from '@/components/dashboard/types'; // Usaremos o tipo enriquecido para exibição

interface EditAccountFormProps {
  account: UserBank;
  onSave: (updatedName: string) => void;
  onCancel: () => void;
}

const EditAccountForm: React.FC<EditAccountFormProps> = ({ account, onSave, onCancel }) => {
  const [accountName, setAccountName] = useState(account.accountName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(accountName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="accountName">Nome da Conta</Label>
        <Input
          id="accountName"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Ex: Conta Corrente"
          required
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Banco</span>
        <span className="text-sm font-semibold text-foreground">{account.bankName || 'N/A'}</span>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
};

export default EditAccountForm;