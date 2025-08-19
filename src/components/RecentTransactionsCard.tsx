import React from "react";
import { CreditCard, DollarSign, Banknote, ShoppingBag, Home, Car, Heart, GraduationCap, PartyPopper, Lightbulb } from "lucide-react";
import { Transaction } from "../components/dashboard/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RecentTransactionsCardProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case "Alimentação":
      return <ShoppingBag className="w-6 h-6 text-orange-500 dark:text-orange-400" />;
    case "Moradia":
      return <Home className="w-6 h-6 text-blue-500 dark:text-blue-400" />;
    case "Transporte":
      return <Car className="w-6 h-6 text-green-500 dark:text-green-400" />;
    case "Saúde":
      return <Heart className="w-6 h-6 text-red-500 dark:text-red-400" />;
    case "Educação":
      return <GraduationCap className="w-6 h-6 text-purple-500 dark:text-purple-400" />;
    case "Lazer":
      return <PartyPopper className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />;
    case "Utilidades":
      return <Lightbulb className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />;
    case "Entretenimento":
      return <PartyPopper className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />;
    case "Streaming":
      return <CreditCard className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />;
    case "Comida":
      return <ShoppingBag className="w-6 h-6 text-pink-500 dark:text-pink-400" />;
    case "Gasto Fixo":
      return <Banknote className="w-6 h-6 text-blue-500 dark:text-blue-400" />;
    default:
      return <CreditCard className="w-6 h-6 text-gray-500 dark:text-gray-400" />;
  }
};

const getBgColor = (type: "entrada" | "saída") => {
  return type === "entrada" ? "bg-green-100 dark:bg-green-500/20" : "bg-red-100 dark:bg-red-500/20";
};

const getAmountColor = (type: "entrada" | "saída") => {
  return type === "entrada" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400";
};

export const RecentTransactionsCard: React.FC<RecentTransactionsCardProps> = ({ transactions }) => {
  return (
    <div className="w-full bg-card rounded-[25px] p-6 shadow-sm border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-foreground text-lg font-semibold">Transações recentes</h3>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 sm:py-0">
              {/* Icon and Info */}
              <div className="flex items-center gap-4 mb-2 sm:mb-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${getBgColor(transaction.type)} rounded-full flex items-center justify-center`}>
                  {getCategoryIcon(transaction.category)}
                </div>
                <div>
                  <p className="text-foreground text-sm sm:text-base font-medium">{transaction.description}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{format(new Date(transaction.date), "dd MMMM yyyy", { locale: ptBR })}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className={`text-sm sm:text-base font-semibold ${getAmountColor(transaction.type)}`}>
                  {`${transaction.type === "saída" ? "-" : "+"}R$${transaction.amount.toFixed(2)}`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center">Nenhuma transação recente.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactionsCard;

