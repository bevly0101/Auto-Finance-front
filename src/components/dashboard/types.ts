
export interface Transaction {
  id: string;
  user_id?: string;
  type: 'entrada' | 'saída';
  description: string;
  amount: number;
  date: string;
  category?: string;
  bank_id?: string;
  specificType?: string;
  tipo?: string;
  tipo_especificado?: string;
  created_at?: string;
}

export interface WeeklySummaryData {
  day: string;
  entradas: number;
  gastos: number;
}

export interface UserBank {
  id: string;
  bankName: string;
  custom_name?: string;
  accountName: string;
  lastFourDigits: string;
  cardBrand: 'visa' | 'mastercard' | 'amex' | 'elo';
  balance: number;
  color_rgb: string;
  bankCode?: string;
}

export interface Category {
  id?: string;
  user_id?: string;
  name: string;
  color: string;
  value: number;
}

export interface MonthlyData {
  name: string; // Mês
  expenses: number;
  income: number;
  balance: number; // Adicionado para o MonthlyBalanceChart
}

export interface User {
  id: string;
  email?: string | null;
  reset_option?: string;
  especificar_tipo?: boolean;
  // Add other user properties if needed
}

export interface Archive {
  id: string;
  user_id: string;
  period_type: string;
  period_start: string;
  period_end: string;
  total_income: number;
  total_expenses: number;
  total_balance: number;
  transactions_data: Transaction[];
  created_at: string;
}

// For toast function signature, if complex
export type ToastFunction = (options: {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  // Add other toast options if necessary
}) => void;
