import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import AddExpense from './AddExpense'; // Adjust the import path

 import { Provider } from 'react-redux';
import store from '../../Store/Store';
 
describe('AddExpense Component', () => {

  test('renders the AddExpense component', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );

    const title = screen.getByText("Add New Expense",{exact:false});

    expect(title).toBeInTheDocument();

  });

 

  test('form fields are initially empty', () => {

    render(<AddExpense />);
    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const descriptionInput = screen.getByLabelText(/Description:/i);

    const categoryInput = screen.getByLabelText(/Category:/i);

 

    expect(currencyInput).toHaveValue('');

    expect(amountInput).toHaveValue('');

    expect(descriptionInput).toHaveValue('');

    expect(categoryInput).toHaveValue('');

  });

 

  test('currency input is updated correctly', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );

    const currencyInput = screen.getByLabelText(/Amount:/i);

 

    fireEvent.change(currencyInput, { target: { value: '₹' } });

    expect(currencyInput).toHaveValue('₹');

  });

 

  test('add button is disabled when fields are empty', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );
    const addButton = screen.getByRole('button', { name: /Add/i });

    expect(addButton).toBeDisabled();

  });

 

  test('add button is enabled when all fields are filled', () => {

    render(
        
            <AddExpense />
       
    );

    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const descriptionInput = screen.getByLabelText(/Description:/i);

    const categoryInput = screen.getByLabelText(/Category:/i);

    const addButton = screen.getByRole('button', { name: /Add/i });

 

    fireEvent.change(currencyInput, { target: { value: '₹' } });

    fireEvent.change(amountInput, { target: { value: '100' } });

    fireEvent.change(descriptionInput, { target: { value: 'Test expense' } });

    fireEvent.change(categoryInput, { target: { value: 'Food' } });

 

    expect(addButton).not.toBeDisabled();

  });

 

  test('displays a toast error when submitting with empty currency', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );

    const addButton = screen.getByRole('button', { name: /Add/i });

 

fireEvent.click(addButton);

 

    const toastError = screen.getByText(/Amount/i);

    expect(toastError).toBeInTheDocument();

  });

 

  test('displays a toast error when submitting with empty amount', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const addButton = screen.getByRole('button', { name: /Add/i });

 

    fireEvent.change(currencyInput, { target: { value: '₹' } });

fireEvent.click(addButton);

 

    const toastError = screen.getByText(/Amount/i);

    expect(toastError).toBeInTheDocument();

  });

 

  test('displays a toast error when submitting with non-numeric amount', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const addButton = screen.getByRole('button', { name: /Add/i });

 

    fireEvent.change(currencyInput, { target: { value: '₹' } });

    fireEvent.change(amountInput, { target: { value: 'abc' } });

fireEvent.click(addButton);

 

    const toastError = screen.getByText(/Amount/i);

    expect(toastError).toBeInTheDocument();

  });

 

  test('displays a toast error when submitting with empty description', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const addButton = screen.getByRole('button', { name: /Add/i });

 

    fireEvent.change(currencyInput, { target: { value: '₹' } });

    fireEvent.change(amountInput, { target: { value: '100' } });

fireEvent.click(addButton);

 

    const toastError = screen.getByText(/Please Description/i);

    expect(toastError).toBeInTheDocument();

  });

 

  test('displays a toast error when submitting with empty category', () => {

    render(
        <Provider store={store}>
            <AddExpense />
        </Provider>
    );
    const currencyInput = screen.getByLabelText(/Amount:/i);

    const amountInput = screen.getByLabelText(/Amount:/i);

    const descriptionInput = screen.getByLabelText(/Description:/i);

    const addButton = screen.getByRole('button', { name: /Add/i });

 

    fireEvent.change(currencyInput, { target: { value: '₹' } });

    fireEvent.change(amountInput, { target: { value: '100' } });

    fireEvent.change(descriptionInput, { target: { value: 'Test expense' } });

fireEvent.click(addButton);

 

    const toastError = screen.getByLabelText(/Please Select a category/i);

    expect(toastError).toBeInTheDocument();

  });

});