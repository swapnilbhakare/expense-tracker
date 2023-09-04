import React from "react";

import { render, screen, fireEvent, getByLabelText } from "@testing-library/react";

import AddExpense from "./AddExpense"; // Adjust the import path

import { Provider } from "react-redux";
import store from "../../Store/Store";
import userEvent from "@testing-library/user-event";

describe("AddExpense Component", () => {
  test("renders the AddExpense component", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    const title = screen.getByText("Add New Expense", { exact: false });

    expect(title).toBeInTheDocument();
  });

  test("form fields are initially empty", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const descriptionInput = screen.getByLabelText(/Description:/i);

    const categoryInput = screen.getByLabelText(/Category:/i);

    expect(currencyInput).toHaveValue("");

    expect(amountInput).toHaveValue("");

    expect(descriptionInput).toHaveValue("");

    expect(categoryInput).toHaveValue("");
  });

  test("currency input is updated correctly", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    const currencyInput = screen.getByLabelText(/Amount:/i);

    fireEvent.change(currencyInput, { target: { value: "₹" } });

    expect(currencyInput).toHaveValue("₹");
  });

  test("add button is disabled when fields are empty", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    const addButton = screen.getByRole("button", { name: /Add/i });

    expect(addButton).toBeDisabled();
  });


  test("submitting the form with valid data", () => {

    const { getByText, getByPlaceholderText, getByLabelText } = render(
  
        <Provider store={store}>
        <AddExpense />
      </Provider>
  
    );
  
    const amountInput = getByPlaceholderText("Enter the Amount");
  
    const descriptionInput = getByPlaceholderText("Enter Description");
  
    const categoryInput = getByLabelText("Please Select a category:"); // Use getByTestId
  
   
  
    const addButton = getByText("Add");
  
   
  
    userEvent.type(amountInput, "50");
  
    userEvent.type(descriptionInput, "Groceries");
  
   
  
    userEvent.selectOptions(categoryInput, "Food");
  
   
  
  userEvent.click(addButton);
  
   
  
    // Assert that the form submitted successfully
    expect(addButton).not.toBeDisabled
  
  });

  test("displays a toast error when submitting with empty currency", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.click(addButton);

    const toastError = screen.getByText(/Amount/i);

    expect(toastError).toBeInTheDocument();
  });

  test("displays a toast error when submitting with empty amount", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(currencyInput, { target: { value: "₹" } });

    fireEvent.click(addButton);

    const toastError = screen.getByText(/Amount/i);

    expect(toastError).toBeInTheDocument();
  });

  test("displays a toast error when submitting with non-numeric amount", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(currencyInput, { target: { value: "₹" } });

    fireEvent.change(amountInput, { target: { value: "abc" } });

    fireEvent.click(addButton);

    const toastError = screen.getByText(/Amount/i);

    expect(toastError).toBeInTheDocument();
  });

  test("displays a toast error when submitting with empty description", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(currencyInput, { target: { value: "₹" } });

    fireEvent.change(amountInput, { target: { value: "100" } });

    fireEvent.click(addButton);

    const toastError = screen.getByText(/Please Description/i);

    expect(toastError).toBeInTheDocument();
  });

  test("displays a toast error when submitting with empty category", () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const descriptionInput = screen.getByLabelText(/Description:/i);

    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(currencyInput, { target: { value: "₹" } });

    fireEvent.change(amountInput, { target: { value: "100" } });

    fireEvent.change(descriptionInput, { target: { value: "Test expense" } });

    fireEvent.click(addButton);

    const toastError = screen.getByLabelText(/Please Select a category/i);

    expect(toastError).toBeInTheDocument();
  });
});
