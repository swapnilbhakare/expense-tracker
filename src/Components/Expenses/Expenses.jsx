import React from "react";
import stylesheet from "./Expenses.module.css";
import { Container, ListGroup } from "react-bootstrap";
const Expenses = ({ expenses }) => {
  console.log(expenses)
  return (
    <>
      <Container
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
        className={stylesheet.expenses}
      >
        <ListGroup as="ul" className={stylesheet.ul}>
          {expenses.map((expense, index) => 
          
            <ListGroup.Item key={index} as="li" style={{color:'#000'}} className={stylesheet.list}>
              ${expense.expenseData.amount} {expense.expenseData.amount}{expense.expenseData.category}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    </>
  );
};

export default Expenses;
