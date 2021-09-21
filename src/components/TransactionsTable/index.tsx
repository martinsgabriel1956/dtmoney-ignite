import { Container } from "./styles";

import { useTransactions } from "../../hook/useTransactions";

export function TransactionsTable() {
  const { transactions } = useTransactions();

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
          {transactions.map(
            ({ title, amount, type, createdAt, category, id }) => (
              <tr key={id}>
                <td>{title}</td>
                <td className={type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(amount)}
                </td>
                <td>{category}</td>
                <td>{new Intl.DateTimeFormat("pt-BR").format(new Date(createdAt))}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
}
