import { createServer } from 'miragejs';

import { GlobalStyle } from "./styles/global";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transition 1',
          amount: 400,
          type: 'deposit',
          category: 'food',
          date: new Date(),
        }
      ]
    })
  }
})

export function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Dashboard />
    </>
  );
}
