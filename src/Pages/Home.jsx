import React, { useState } from "react";
import Header from "../Components/Layout/Header";
import AddExpense from "../Components/Expenses/AddExpense";
import Expenses from "../Components/Expenses/Expenses";
import { Container, Button } from "react-bootstrap";
import {
  enableDarkThem,
  enableLightThem,
  toogleDarkThemActivate,
} from "../Store/themsSlice";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../Store/expensesSlice";
import stylesheet from "./Home.module.css";
const Home = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const totalAmount = useSelector((state) => state.expenses);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const isDarkThemeActivate = useSelector(
    (state) => state.theme.isDarkThemeActivate
  );
  console.log(totalAmount);
  const toogleThem = () => {
    if (isDarkTheme) {
      dispatch(enableLightThem());
    } else {
      dispatch(enableDarkThem());
    }
  };

  const addExpensesHandler = (expenseData) => {
    dispatch(expenseActions.setTotalAmount(expenseData));
    if (
      totalAmount + expenseData.amount >= 10000 &&
      !isDarkThemeActivate &&
      isLoggedIn
    ) {
      dispatch(toogleDarkThemActivate());
    }
  };
  const premiumThem = isDarkTheme ? stylesheet["dark-them"] : ""
  return (
    <Container fluid className={premiumThem}>
      <Header />
      <Button className={stylesheet["active-premium"]} onClick={toogleThem}>
        Active Premium
      </Button>

      <AddExpense onAddExpense={addExpensesHandler} premiumThem={premiumThem} />
      <Expenses  />
    </Container>
  );
};

export default Home;
