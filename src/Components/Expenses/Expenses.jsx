import React, { useContext, useState, useEffect } from "react";
import stylesheet from "./Expenses.module.css";
import { Button, Container, ListGroup, Modal, Form } from "react-bootstrap";
import AuthContext from "../../Store/AuthContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {GiCancel} from 'react-icons/gi'
import { eventWrapper } from "@testing-library/user-event/dist/utils";
const Expenses = () => {
  const authcontext = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const email = authcontext.email.replace(/[^a-zA-Z0-9]/g, "");

  const handlerDeleteModalClose = () => {
    setShowDeleteModal(false);
    setExpenseToEdit(null);
  };
  const handleDeleteModalShow = (expense) => {
    setShowDeleteModal(true);
    setExpenseToDelete(expense);
  };

  const deleteExpenseHandler = () => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}/${expenseToDelete.id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        console.log("delete");
        return res.json();
      }
    });
    handlerDeleteModalClose();
    fetchExpenseHandler();
  };


  const handleEditModalClose=()=>{
    setShowEditModal(false);
    setExpenseToEdit(null);
  }
  const handleEditModalShow = (expense) => {
    setShowEditModal(true);
    setExpenseToEdit(expense);
  };

  const handleEditExpense = (event) => {
    event.preventDefault();
    const updatedExpense = {
      ...expenseToEdit,
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
    ).then((res) => {
      if (res.ok) {
        console.log("sucessful");
        return res.json();
      } else {
        res.json().then((data) => {
          console.log("Failed to update expense");
        });
      }
    });
    handleEditModalClose();
    fetchExpenseHandler();
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
                <span>
                  {expense.currency}
                  {expense.amount}
                </span>
                <span style={{ margin: "10px" }}>{expense.description}</span>
                <span>{expense.category}</span>
              </p>
              <span>
                <Button
                  type="submit"
                  onClick={() => handleDeleteModalShow(expense)}
                  className={stylesheet.deleteBtn}
                >
                  <AiOutlineDelete />{" "}
                </Button>
                <Button type="submit" onClick={()=>handleEditModalShow(expense)} className={stylesheet.editBtn}>
                  <AiOutlineEdit />
                </Button>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
{/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        backdrop="static"
        keyboard={false}
        onHide={handlerDeleteModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Delete Expense
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Are you sure you want to delete this expense?</p>
        </Modal.Body>
     
        <Modal.Footer>
          <Button className={stylesheet['modal-cancel']} onClick={handlerDeleteModalClose}>
            <GiCancel/>
            
          </Button>
          <Button className={stylesheet['modal-delete']} onClick={deleteExpenseHandler}>
            <AiOutlineDelete/>
              
          </Button>
        </Modal.Footer>

      </Modal>
      {/* Edit modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
      <Form onSubmit={handleEditExpense}>
      <Modal.Header closeButton>
            <Modal.Title>Edit Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group  style={{display:'flex',flexDirection:"row",alignItems:"center"}}>
            <Form.Label>Amount: </Form.Label>
            <Form.Select  
             defaultValue={expenseToEdit ? expenseToEdit.currency : ""}
            

           >
             <option value={null}>Select currency </option>
            <option value="$">$</option>
            <option value="₹">₹</option>
            <option value="€">€</option>
            €
            </Form.Select>
            <Form.Control style={{width:"100%"}}
              type="number"
             
              defaultValue={expenseToEdit ? expenseToEdit.amount : ""}
              />
          
          </Form.Group>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Label>Description: </Form.Label>
            <Form.Control
              type="text"
              defaultValue={expenseToEdit ? expenseToEdit.description : ""}
              
              />
          </Form.Group>
          <Form.Group className={stylesheet["form-group"]}>
            <Form.Select
              aria-label="expenseCategroy"
              defaultValue={expenseToEdit ? expenseToEdit.category : ""}
              
              >
              <option value={null}>Select Where You Spend </option>
              <option value="car servicing">Car servicing </option>
              <option value="petrol">Petrol </option>
              <option value='food'>Food</option>
              <option value="grocery">Grocery</option>
            </Form.Select>
          </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button  onClick={handleEditModalClose}>
              Cancel
            </Button>
            <Button  type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
          </Form>
      </Modal>
    </>
  );
};

export default Expenses;
