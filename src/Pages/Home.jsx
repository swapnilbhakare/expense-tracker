import React, { useState } from "react";
import Header from "../Components/Layout/Header";
import AddExpense from "../Components/Expenses/AddExpense";
import Expenses from "../Components/Expenses/Expenses";
import { Container } from "react-bootstrap";

const Home = (props) => {
  const [expenses, setExpenses] = useState([]);
  const addExpensesHandler = (expenseData) => {
    setExpenses((prevExpenses) => [...prevExpenses, { expenseData }]);
  };
  return (
    <Container style={{ minHeight: "100vh", height: "100%" }}>
      <Header />
      <AddExpense onAddExpense={addExpensesHandler} />
      <Expenses expenses={expenses} />
    </Container>
  );
};

export default Home;
