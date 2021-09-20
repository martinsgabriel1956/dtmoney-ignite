import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";


interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionProps[]>([]);

export function TransactionProvider({children}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  const { Provider } = TransactionsContext;

  return (
    <Provider value={transactions}>
      {children}
    </Provider>
  )
}