import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from 'lucide-react';

export interface AccountCard {
  id: string | number;
  name: string;
  balance: number;
  number?: string;
  gradient?: string;
  textColor?: string;
}

interface FigmaBalanceCardsProps {
  accounts: AccountCard[];
  activeAccountId: string | number | null;
  onAccountChange: (accountId: string | number | null) => void;
  userName?: string;
}

const FigmaBalanceCards: React.FC<FigmaBalanceCardsProps> = ({
  accounts,
  activeAccountId,
  onAccountChange,
  userName = "JOÃO SILVA"
}) => {
  const [showBalance, setShowBalance] = useState(true);

  const cards = accounts.map(account => ({
    ...account,
    gradient: account.gradient || "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600",
    textColor: account.textColor || "text-white",
    number: account.number || "**** **** **** 1234",
    name: account.name === 'Total' ? userName : account.name,
  }));

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Balance Cards */}
      <div className="relative w-full max-w-sm">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className={`
              ${card.gradient} ${card.textColor} border-0 cursor-pointer transition-all duration-300
              ${card.id === activeAccountId ? 'relative z-10 scale-100' : 'absolute top-2 left-2 z-0 scale-95 opacity-70'}
            `}
            style={{
              width: card.id === activeAccountId ? '100%' : 'calc(100% - 16px)',
              height: '200px'
            }}
            onClick={() => onAccountChange(card.id)}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90 font-medium">AutoFinance</p>
                  <p className="text-xs opacity-75 mt-1">{card.name}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBalance(!showBalance);
                  }}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              {/* Card Number */}
              <div className="text-center my-4">
                <p className="text-lg font-mono tracking-wider">{card.number}</p>
              </div>

              {/* Balance */}
              <div className="text-center">
                <p className="text-xs opacity-75 mb-1">Saldo disponível</p>
                <p className="text-2xl font-bold">
                  {showBalance ? formatBalance(card.balance) : "R$ ••••••"}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Card Indicators */}
      <div className="flex justify-center space-x-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onAccountChange(card.id)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              card.id === activeAccountId
                ? 'bg-blue-500 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FigmaBalanceCards;