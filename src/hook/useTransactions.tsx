import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from "../services/api";

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
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextDataProps>({} as TransactionContextDataProps);

export function TransactionProvider({children}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInputProps) {
    const res = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = res.data;

    setTransactions([...transactions, transaction]);
  }


  const { Provider } = TransactionsContext;

  return (
    <Provider value={{transactions,createTransaction }}>
      {children}
    </Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}