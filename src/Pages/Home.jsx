import React, { useState } from "react";
import Header from "../Components/Layout/Header";
import AddExpense from "../Components/Expenses/AddExpense";
import Expenses from "../Components/Expenses/Expenses";
import { Container,Button } from "react-bootstrap";
import {enableDarkThem,enableLightThem} from '../Store/themsSlice'
import { useSelector ,useDispatch} from "react-redux";
import stylesheet from './Home.module.css'
const Home = (props) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const [expenses, setExpenses] = useState([]);
const isDarkTheme = useSelector(state=>state.theme.isDarkTheme)
  // const {totalAmount}= useSelector(state=>state.expenses.totalAmount)
 
  const toogleThem=()=>{
    
      if(isDarkTheme){
        dispatch(enableLightThem())
      }else{
        dispatch(enableDarkThem())
      }

    
    
  }




  const addExpensesHandler = (expenseData) => {
    setExpenses((prevExpenses) => [...prevExpenses, { expenseData }]);
  };
  return (
    <Container fluid  className={isDarkTheme?stylesheet["dark-them"]:''}>
       
      <Header />
      <Button className={stylesheet['active-premium']} onClick={toogleThem}>Active Premium</Button>
     
      <AddExpense onAddExpense={addExpensesHandler}  />
      <Expenses expenses={expenses}  />
    </Container>
  );
};

export default Home;
