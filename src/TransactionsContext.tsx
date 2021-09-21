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

type TransactionInputProps = Omit<TransactionProps, 'id' | 'createdAt'>

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionContextDataProps {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInputProps) =>void;
}

export const TransactionsContext = createContext<TransactionContextDataProps>({} as TransactionContextDataProps);

export function TransactionProvider({children}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionInputProps) {
    api.post("/transactions", transaction);
  }


  const { Provider } = TransactionsContext;

  return (
    <Provider value={{transactions,createTransaction }}>
      {children}
    </Provider>
  )
}