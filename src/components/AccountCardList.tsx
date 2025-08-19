import React from 'react';
import AccountCard from './AccountCard';
import { UserBank } from '@/components/dashboard/types'; // Usar o tipo global

interface AccountCardListProps {
  accounts: UserBank[];
  onUpdate: () => void;
}

const AccountCardList: React.FC<AccountCardListProps> = ({ accounts, onUpdate }) => {
  return (
    <div className="bg-card rounded-[25px] p-6 shadow-sm">
      <h2 className="text-foreground text-[22px] font-semibold mb-6">
        Lista de Contas
      </h2>
      
      <div className="space-y-4">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <p>Nenhuma conta encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default AccountCardList;
