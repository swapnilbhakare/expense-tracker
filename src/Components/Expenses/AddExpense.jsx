import React, { useRef, useState, useEffect, useCallback } from "react";
import stylesheet from "./AddExpense.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expensesSlice";
const AddExpense = ({premiumThem}) => {
  const currencyInputRef = useRef();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categroyInputRef = useRef();

  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.authentication.userId);
  const emailId = userEmail;
  const email = emailId.replace(/[^a-zA-Z0-9]/g, "");


  

  const currencyInputChangeHandler = (e) => {
    setCurrency(currencyInputRef.current.value);
  };

  const amountInputChangeHandler = () => {
    setAmount(amountInputRef.current.value);
  };
  const descriptionInputChangeHandler = () => {
    setDescription(descriptionInputRef.current.value);
  };
  const categroyInputChangeHandler = () => {
    setCategory(categroyInputRef.current.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      currency: currency,
      amount: amount,
      description: description,
      category: category,
    };
    addExpenseHandler(expenseData);
    setCurrency("");
    setAmount("");
    setDescription("");
    setCategory("");
  };

  useEffect(() => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}.json`,
      {
        method: "POST",
        body: JSON.stringify([]),
      }
    );
  }, [email]);

  const addExpenseHandler = (expenseData) => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}.json`,
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("successful");
        return res.json();
      } else {
        return res.json().then((data) => {
          alert("Something went Wrong");
        });
      }
    })
    fetchExpenseHandler()
  };
  const fetchExpenseHandler = () => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}.json`
    ).then(res=>{
      if (res.ok) {
        console.log("successful");
        return res.json();
      }else {
        return res.json().then((data) => {
          alert("Something went Wrong");
        });
      }

    }).then(data=>{
      let fetchedExpenses = [];
        let loadedAmount = 0;
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            currency: data[key].currency,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
          loadedAmount = loadedAmount + parseInt(data[key].amount);
        
      }
      dispatch(expenseActions.setExpenses(fetchedExpenses));
      dispatch(expenseActions.setTotalAmount(loadedAmount));
    })
   
  }
  useEffect(()=>{
    fetchExpenseHandler()
  },[fetchExpenseHandler])

  return (
    <>
    
      <Container
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
        className={premiumThem?stylesheet["add-expense-dark"]:stylesheet["add-expense"]}
      >
        <h5 className={stylesheet.title}>Add New Expense</h5>
        <Form onSubmit={submitHandler}>
          <Form.Group
            className={stylesheet["form-group"]}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Form.Label className={stylesheet["form-label"]}>
              Amount:{" "}
            </Form.Label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Form.Select
                className={stylesheet["form-controls"]}
                aria-label="expensecurrency"
                ref={currencyInputRef}
                value={currency}
                onChange={currencyInputChangeHandler}
              >
                <option value={null}>Select currency </option>
                <option value="$">$</option>
                <option value="₹">₹</option>
                <option value="€">€</option>€
              </Form.Select>
              <Form.Control
                style={{ width: "100%" }}
                type="number"
                placeholder="Enter the Amount "
                ref={amountInputRef}
                value={amount}
                onChange={amountInputChangeHandler}
                className={stylesheet["form-controls"]}
              />
            </div>
          </Form.Group>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Label className={stylesheet["form-label"]}>
              Description:{" "}
            </Form.Label>
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
            <Form.Label className={stylesheet["form-label"]}>
              Category:{" "}
            </Form.Label>
            <Form.Select
              aria-label="expenseCategroy"
              ref={categroyInputRef}
              value={category}
              onChange={categroyInputChangeHandler}
              className={stylesheet["form-controls"]}
            >
              <option value={null}>Select Where You Spend </option>
              <option value="car servicing">Car servicing </option>
              <option value="petrol">Petrol </option>
              <option value="food">Food</option>
              <option value="grocery">Grocery</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ textAlign: "center" }}>
            <Button className={stylesheet.btn} type="submit">
              Add
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddExpense;
