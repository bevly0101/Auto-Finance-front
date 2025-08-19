import React from 'react';
import { Transaction, UserBank } from '@/components/dashboard/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Music, Wrench, User, ShoppingCart, Car, HeartPulse, GraduationCap, PartyPopper, Lightbulb, HelpCircle, Home } from 'lucide-react';

interface LastTransactionsSectionProps {
  transactions: Transaction[];
  userBanks: UserBank[];
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Entretenimento': <Music size={20} className="text-success" />,
  'Streaming': <Music size={20} className="text-primary" />,
  'Comida': <ShoppingCart size={20} className="text-secondary" />,
  'Gasto Fixo': <Wrench size={20} className="text-orange-400" />,
  'Alimentação': <ShoppingCart size={20} className="text-accent" />,
  'Moradia': <Home size={20} className="text-yellow-400" />,
  'Transporte': <Car size={20} className="text-indigo-400" />,
  'Saúde': <HeartPulse size={20} className="text-destructive" />,
  'Educação': <GraduationCap size={20} className="text-teal-400" />,
  'Lazer': <PartyPopper size={20} className="text-cyan-400" />,
  'Utilidades': <Lightbulb size={20} className="text-foreground/80" />,
  'default': <HelpCircle size={20} className="text-foreground/60" />
};

const LastTransactionsSection: React.FC<LastTransactionsSectionProps> = ({ transactions, userBanks }) => {

  const getAccountName = (transaction: Transaction) => {
    if (transaction.bank_id) {
      const bank = userBanks.find(b => b.id === transaction.bank_id);
      return bank?.accountName || 'Conta Desconhecida';
    }
    if (transaction.specificType === 'Cédula') {
      return 'Carteira';
    }
    return 'Não especificado';
  };

  const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return "Data inválida";
    }
    return format(new Date(dateString), "dd MMM yyyy", { locale: ptBR });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-card rounded-2xl border border-white/5 p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Últimas Transações</h2>
      {/* Grid Header */}
      <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 p-3 font-semibold text-foreground/80 border-b border-border mb-2">
        <span className="text-left">Transação</span>
        <span className="text-right">Categoria</span>
        <span className="text-right">Conta</span>
        <span className="text-right">Tipo</span>
        <span className="text-right">Valor</span>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            {/* Mobile Card View */}
            <div className="lg:hidden p-4 bg-muted/50 rounded-xl flex items-center gap-4">
              <div className={`p-3 rounded-full bg-muted`}>
                {categoryIcons[transaction.category || 'default'] || categoryIcons['default']}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-foreground">{transaction.description}</p>
                  <span className={`font-bold text-right ${transaction.type === "entrada" ? "text-success" : "text-destructive"}`}>
                    {transaction.type === 'entrada' ? '+' : '-'} {formatAmount(transaction.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1 text-sm text-foreground/80">
                  <span>{transaction.category}</span>
                  <span>{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 items-center p-3 hover:bg-primary/10 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full bg-muted`}>
                  {categoryIcons[transaction.category || 'default'] || categoryIcons['default']}
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  <p className="text-sm text-foreground/80">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <span className="text-foreground/80 text-right">{transaction.category}</span>
              <span className="text-foreground/80 text-right">{getAccountName(transaction)}</span>
              <span className="text-foreground/80 text-right">{transaction.specificType}</span>
              <span className={`font-semibold text-right ${transaction.type === "entrada" ? "text-success" : "text-destructive"}`}>
                {transaction.type === 'entrada' ? '+' : '-'} {formatAmount(transaction.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastTransactionsSection;
