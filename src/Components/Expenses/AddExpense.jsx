import React, { useRef, useState } from "react";
import stylesheet from "./AddExpense.module.css";
import { Button, Container, Form } from "react-bootstrap";
const AddExpense = ({onAddExpense}) => {
   const amountInputRef =useRef()
   const descriptionInputRef =useRef()
   const categroyInputRef = useRef()
   const [amount,setAmount]= useState("")
   const [description,setDescription]= useState("")
   const [category,setCategory]=useState("")

   const amountInputChangeHandler =()=>{
    setAmount(amountInputRef.current.value)

   }
   const descriptionInputChangeHandler =()=>{
    setDescription(descriptionInputRef.current.value)
   }
    const categroyInputChangeHandler =()=>{
      setCategory(categroyInputRef.current.value)
    
   }


   const addExpenseHandler=(event)=>{
    event.preventDefault();
    const expenseData={
      amount:amount,
      description:description,
      category:category,
  
    }
    onAddExpense(expenseData)
    setAmount("");
    setDescription("");
    setCategory("");
  }


  return (
    <>
      <Container
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
        className={stylesheet["add-expense"]}
      >
        <h5 className={stylesheet.title}>Add New Expense</h5>
        <Form onSubmit={addExpenseHandler}>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Label>Amount: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the Amount "
              ref={amountInputRef}
              value={amount}
              onChange={amountInputChangeHandler}
              className={stylesheet["form-controls"]}
            />
          </Form.Group>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Label>Description: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description "
              ref={descriptionInputRef}
              value={description}
              onChange={descriptionInputChangeHandler}
              className={stylesheet["form-controls"]}
            />
          </Form.Group>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Select
              aria-label="expenseCategroy"
              ref={categroyInputRef}
              value={category}
              onChange={categroyInputChangeHandler}
              className={stylesheet["form-controls"]}
            >
              <option>Select Where You Spend </option>
              <option>Car servicing </option>
              <option>Petrol </option>
              <option>Food</option>
              <option>Grocery</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{textAlign:'center'}}>
            <Button  className={stylesheet.btn} type="submit">Add</Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddExpense;
