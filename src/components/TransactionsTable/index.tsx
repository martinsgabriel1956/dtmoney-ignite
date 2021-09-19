import { useEffect, useState } from "react";

import { Container } from "./styles";

import { api } from "../../services/api";

interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;

}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api.get("transactions").then((res) => setTransactions(res.data.transactions));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ title, amount, type, createdAt, category, id }) => (
            <tr key={id}>
              <td>{title}</td>
              <td className= {type}>- R${amount}</td>
              <td>{category}</td>
              <td>{createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
