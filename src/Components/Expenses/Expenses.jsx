import React, { useContext, useState, useEffect } from "react";
import stylesheet from "./Expenses.module.css";
import { Container, ListGroup } from "react-bootstrap";
import AuthContext from "../../Store/AuthContext";

const Expenses = () => {
  const authcontext = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const email = authcontext.email.replace(/[^a-zA-Z0-9]/g, "");

  const fetchExpenseHandler = () => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}.json`
    ).then((res) => {
      if (res.ok) {
        console.log("successful");
        return res.json();
      } else {
        return res.json().then((data) => {
          alert("Failed to fetch expenses");
        });
      }
    }).then((data)=>{
      let fetchedExpenses =[]
      for(const key in data){
        
        fetchedExpenses.push({
          id:key,
          currency:data[key].currency,
          amount:data[key].amount,
          description:data[key].description,
          category:data[key].category
   
        })
      }
      setExpenses(fetchedExpenses)
     
    }).catch(error=>{
      console.error("Error",error)
    })
  };

  

  useEffect(() => {
    fetchExpenseHandler();
  }, [fetchExpenseHandler]);

  return (
    <>
      <Container
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
        className={stylesheet.expenses}
      >
        <ListGroup as="ul" className={stylesheet.ul}>
          {expenses.map(
            (expense, index) => 
            (
              <ListGroup.Item
                key={index}
                as="li"
                style={{ color: "#000" }}
                className={stylesheet.list}
              >
                {expense.currency}
                {expense.amount} - {expense.description}
               -  {expense.category}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </Container>
    </>
  );
};

export default Expenses;
