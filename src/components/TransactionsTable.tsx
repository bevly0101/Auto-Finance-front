import React, { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Transaction } from "@/components/dashboard/types"; // Usar o tipo global
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionsTableProps {
  transactions: Transaction[];
  selectedBankName: string;
  onTransactionClick: (transaction: Transaction) => void;
}

export default function TransactionsTable({ transactions, selectedBankName, onTransactionClick }: TransactionsTableProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<"todas" | "entradas" | "gastos">("todas");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === "entradas") return transaction.type === "entrada";
    if (activeTab === "gastos") return transaction.type === "saída";
    return true;
  });

  // Lógica de Paginação
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formatted;
  };

  const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
        return "Data inválida";
    }
    return format(new Date(dateString), "dd MMM, HH:mm", { locale: ptBR });
  };

  return (
    <div className="bg-card rounded-2xl border border-white/5">
      {/* Header with tabs */}
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-foreground mb-6">Histórico de Transações</h3>
        
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-border">
          <button
            onClick={() => { setActiveTab("todas"); setCurrentPage(1); }}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "todas"
                ? "text-primary border-primary"
                : "text-foreground/80 border-transparent hover:text-primary"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => { setActiveTab("entradas"); setCurrentPage(1); }}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "entradas"
                ? "text-primary border-primary"
                : "text-foreground/80 border-transparent hover:text-primary"
            }`}
          >
            Entradas
          </button>
          <button
            onClick={() => { setActiveTab("gastos"); setCurrentPage(1); }}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "gastos"
                ? "text-primary border-primary"
                : "text-foreground/80 border-transparent hover:text-primary"
            }`}
          >
            Gastos
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {paginatedTransactions.length > 0 ? paginatedTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-muted/50 rounded-xl p-4 space-y-3" onClick={() => onTransactionClick(transaction)}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center`}>
                  {transaction.type === "saída" ? (
                    <ArrowUp className="w-5 h-5 text-destructive" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-success" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{transaction.description}</p>
                  <p className="text-sm text-foreground/80">{transaction.category}</p>
                </div>
              </div>
              <span className={`text-lg font-bold ${transaction.type === "saída" ? "text-destructive" : "text-success"}`}>
                {transaction.type === 'saída' ? '-' : '+'} {formatAmount(transaction.amount)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-foreground/80 pt-2 border-t border-border">
              <span>{selectedBankName}</span>
              <span>{formatDate(transaction.date)}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-10 text-foreground/80">
            Nenhuma transação encontrada.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-6 text-sm font-medium text-foreground/80">Descrição</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-foreground/80">Categoria</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-foreground/80">Conta</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-foreground/80">Data</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-foreground/80">Quantia</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-foreground/80">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? paginatedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border hover:bg-primary/10">
                <td className="py-4 px-6" onClick={() => onTransactionClick(transaction)}>
                  <div className="flex items-center cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      {transaction.type === "saída" ? (
                        <ArrowUp className="w-4 h-4 text-destructive" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">{transaction.description}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-foreground/80">{transaction.category}</td>
                <td className="py-4 px-6 text-sm text-foreground/80">{selectedBankName}</td>
                <td className="py-4 px-6 text-sm text-foreground/80">{formatDate(transaction.date)}</td>
                <td className={`py-4 px-6 text-sm font-medium text-right ${transaction.type === "saída" ? "text-destructive" : "text-success"}`}>
                  {transaction.type === 'saída' ? '-' : '+'} {formatAmount(transaction.amount)}
                </td>
                <td className="py-4 px-6 text-center">
                  <button onClick={() => onTransactionClick(transaction)} className="px-3 py-1 text-xs text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors">
                    Editar
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-foreground/80">
                  Nenhuma transação encontrada para esta seleção.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-primary disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <span>← Anterior</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-foreground/80">
              Página {currentPage} de {totalPages}
            </span>
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-primary disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <span>Próximo →</span>
          </button>
        </div>
      )}
    </div>
  );
}
