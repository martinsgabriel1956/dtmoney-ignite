import { useState } from "react";
import Modal from "react-modal";

import { createServer, Model } from "miragejs";

import { GlobalStyle } from "./styles/global";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from "./components/NewTransactionModal";

import { TransactionsContext, TransactionProvider } from "./TransactionsContext";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Salário",
          type: "deposit",
          category: "Salary",
          amount: 2000,
          createdAt: new Date("2021-10-05 09:45:00"),
        },
        {
          id: 2,
          title: "Compras do mês",
          type: "withdraw",
          category: "Food",
          amount: 500,
          createdAt: new Date("2021-10-10 18:45:00"),
        }
      ]
    })
  },

  routes() {

    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all('transaction');
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  },
});

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

    const { Provider } = TransactionsContext;

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}
