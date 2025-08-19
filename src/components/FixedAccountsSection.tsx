import React from 'react';
import { Apple, User, Gamepad2, User2 } from 'lucide-react';

interface FixedAccount {
  id: string;
  name: string;
  timeAgo: string;
  amount: string;
  icon: React.ReactNode;
  iconBg: string;
}

const FixedAccountsSection: React.FC = () => {
  const fixedAccounts: FixedAccount[] = [
    {
      id: '1',
      name: 'Apple Store',
      timeAgo: '5h atrás',
      amount: 'R$450',
      icon: <Apple size={20} className="text-foreground" />,
      iconBg: 'bg-muted'
    },
    {
      id: '2',
      name: 'Michael',
      timeAgo: '2 dias atrás',
      amount: 'R$160',
      icon: <User size={20} color="#F59E0B" />,
      iconBg: 'bg-muted'
    },
    {
      id: '3',
      name: 'Playstation',
      timeAgo: '5 dias atrás',
      amount: 'R$1085',
      icon: <Gamepad2 size={20} color="#3B82F6" />,
      iconBg: 'bg-muted'
    },
    {
      id: '4',
      name: 'William',
      timeAgo: '10 dias atrás',
      amount: 'R$90',
      icon: <User2 size={20} color="#EC4899" />,
      iconBg: 'bg-muted'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Contas Fixas</h2>
      <div className="space-y-4">
        {fixedAccounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${account.iconBg}`}>
                {account.icon}
              </div>
              <div>
                <p className="font-medium text-foreground">{account.name}</p>
                <p className="text-sm text-muted-foreground">{account.timeAgo}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{account.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixedAccountsSection;

