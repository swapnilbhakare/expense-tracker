import React, { useContext, useState, useEffect } from "react";
import stylesheet from "./Expenses.module.css";
import { Button, Container, ListGroup, Modal, Form } from "react-bootstrap";
import AuthContext from "../../Store/AuthContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
const Expenses = () => {
  const authcontext = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const email = authcontext.email.replace(/[^a-zA-Z0-9]/g, "");

  const deleteExpenseHandler = (id) => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}/${id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        console.log("delete");
        return res.json();
      }
    });
  };

  const handlerEditExpense = (event) => {
    event.preventDefault();
    const updatedExpense = {
     
      currency: event.target.currency.value,
      amount: event.target.amount.value,
      description: event.target.description.value,
      category: event.target.category.value,
    };
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}/${updatedExpense.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res)=>{
      if(res.ok){
        console.log("sucessful")
        return res.json()
      }else{
        res.json().then((data)=>{
          console.log("Failed to update expense")
        })
      }
    })
  };

  const fetchExpenseHandler = () => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}.json`
    )
      .then((res) => {
        if (res.ok) {
          console.log("successful");
          return res.json();
        } else {
          return res.json().then((data) => {
            alert("Failed to fetch expenses");
          });
        }
      })
      .then((data) => {
        let fetchedExpenses = [];
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            currency: data[key].currency,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setExpenses(fetchedExpenses);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
    fetchExpenseHandler();
  }, [fetchExpenseHandler]);

  return (
    <>
      <Container className={stylesheet.expenses}>
        <ListGroup as="ul" className={stylesheet.ul}>
          <ListGroup.Item
            style={{ textAlign: "justify" }}
            className={stylesheet.list}
          >
            Amount Description Category{" "}
          </ListGroup.Item>
          {expenses.map((expense, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              style={{ color: "#000" }}
              className={stylesheet.list}
            >
              <p>
                {" "}
                <span>
                  {expense.currency}
                  {expense.amount}
                </span>
                <span style={{ margin: "10px" }}>{expense.description}</span>
                <span>{expense.category}</span>
              </p>
              <span>
                {" "}
                <Button
                  type="submit"
                  onClick={() => deleteExpenseHandler(expense.id)}
                  className={stylesheet.deleteBtn}
                >
                  <AiOutlineDelete />{" "}
                </Button>
                <Button type="submit" className={stylesheet.editBtn}>
                  <AiOutlineEdit />
                </Button>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Expenses;
