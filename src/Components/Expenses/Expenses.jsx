import React, {  useState, useEffect, useCallback } from "react";
import stylesheet from "./Expenses.module.css";
import { Button, Container, ListGroup, Modal, Form } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { BsSave } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { expenseActions } from "../../Store/expensesSlice";
const Expenses = () => {
  const [csvData, setCsvData] = useState("");
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.authentication.userId);
  const emailId = userEmail;
  const email = emailId.replace(/[^a-zA-Z0-9]/g, "");
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const {
    expenses,
    totalAmount,
    showEditModal,
    expenseToEdit,
    showDeleteModal,
    expenseToDelete,
  } = useSelector((state) => state.expense);
  // delete expense modal functionality
  const handleDeleteModalClose = () => {
    dispatch(expenseActions.setShowDeleteModal(false));
    dispatch(expenseActions.setExpenseToDelete(null));
  };
  const handleDeleteModalShow = (expense) => {
    dispatch(expenseActions.setShowDeleteModal(true));
    dispatch(expenseActions.setExpenseToDelete(expense));
  };
  // edit expense modal functionality

  const handleEditModalShow = (expense) => {
    dispatch(expenseActions.setShowEditModal(true));
    dispatch(expenseActions.setExpenseToEdit(expense));
  };
  const handleEditModalClose = () => {
    dispatch(expenseActions.setShowEditModal(false));
    dispatch(expenseActions.setExpenseToEdit(null));
  };
  // delete expnese handler

  const deleteExpenseHandler = () => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}/${expenseToDelete.id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        toast.success("successfully deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });

        const updatedExpense = expenses.filter(
          (expense) => expense.id !== expenseToDelete.id
        );
        dispatch(expenseActions.setExpenses(updatedExpense));
        dispatch(expenseActions.setExpenseToDelete(null));
        dispatch(expenseActions.setShowDeleteModal(false));
      }
    });

    fetchExpenseHandler();
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    const updatedExpenseToEdit = {
      ...expenseToEdit,
      [name]: value,
    };
    dispatch(expenseActions.setExpenseToEdit(updatedExpenseToEdit));
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
    )
      .then((res) => {
        if (res.ok) {
          toast.success("successfully updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          const updatedExpenses = expenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          ); // Update the state
          dispatch(expenseActions.setExpenses(updatedExpenses));
          dispatch(expenseActions.setExpenseToEdit(null));
          dispatch(expenseActions.setShowEditModal(false));
        } else {
          res.json().then((data) => {
            toast.error("Failed to update expense", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchExpenseHandler = useCallback(() => {
    fetch(
      `https://expenses-tracker-8f78a-default-rtdb.firebaseio.com/expenses${email}.json`
    )
      .then((res) => {
        if (res.ok) {
          toast.success("successfully fetched", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          return res.json();
        } else {
          return res.json().then((data) => {
            toast.error("Failed to fetch expenses", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          });
        }
      })
      .then((data) => {
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
      });
  }, []);

  useEffect(() => {
    const csv = expenses.reduce((csvString, expense) => {
      return `${csvString} ${expense.currency}, ${expense.amount}${expense.description},${expense.category}\n`;
    }, "Description,Amount,Category\n\n");
    const totalAmount = expenses.reduce((total, expense) => {
      return total + parseInt(expense.amount);
    }, 0);
    setCsvData(`${csv}Total,${totalAmount},\n`);
    // setCsvData(csv);
  }, [expenses]);

  return (
    <>
      <Container
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
        className={
          isDarkTheme ? stylesheet["expenses-dark"] : stylesheet["expenses"]
        }
      >
        <ListGroup as="ul" className={stylesheet.ul}>
          <ListGroup.Item
            style={{ textAlign: "justify" }}
            className={stylesheet.list}
          >
            Amount - Description - Category{" "}
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
                  {expense.amount} -
                </span>
                <span style={{ margin: "10px" }}>{expense.description} -</span>
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
                <Button
                  type="submit"
                  onClick={() => handleEditModalShow(expense)}
                  className={stylesheet.editBtn}
                >
                  <AiOutlineEdit />
                </Button>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className={stylesheet["total-expenses"]}>
          <h5>Total: {totalAmount}</h5>
          <Button
            className={stylesheet.downloadbtn}
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
            download="expenses.csv"
            style={{ marginLeft: "45%" }}
          >
            <FaDownload style={{ marginRight: "5px" }} />
            Download
          </Button>
        </div>
        {/* Delete Modal */}
        <Modal
          show={showDeleteModal}
          backdrop="static"
          keyboard={false}
          onHide={handleDeleteModalClose}
          className={isDarkTheme ? stylesheet["modal-dark-bg"] : ""}
        
        >
          <Modal.Header
            closeButton
            className={isDarkTheme ? stylesheet["modal-dark"] : ""}
          >
            <Modal.Title>Delete Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body className={isDarkTheme ? stylesheet["modal-dark"] : ""}>
            <p>Are you sure you want to delete this expense?</p>
          </Modal.Body>

          <Modal.Footer className={isDarkTheme ? stylesheet["modal-dark"] : ""}>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
              className={stylesheet["modal-cancel"]}
              onClick={handleDeleteModalClose}
            >
              <GiCancel />
              <span>Cancel</span>
            </Button>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
              className={stylesheet["modal-delete"]}
              onClick={deleteExpenseHandler}
            >
              <AiOutlineDelete />
              <span>Delete</span>
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Edit modal */}
        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Form 
            onSubmit={handleEditExpense}
            className={isDarkTheme ? stylesheet["edit-expense-dark"] : "edit-expense"}
          
          >
            <Modal.Header closeButton className={isDarkTheme ? stylesheet["modal-dark"] : ""}
          >
              <Modal.Title>Edit Expense</Modal.Title>
            </Modal.Header >
            <Modal.Body className={isDarkTheme ? stylesheet["modal-dark"] : ""}
          >
              <Form.Group className={stylesheet["form-group"]}>
                <Form.Label className={stylesheet["form-label"]}>
                  Amount:
                </Form.Label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Form.Select
                    name="currency"
                    value={expenseToEdit && expenseToEdit.currency }
                    className={stylesheet["form-controls"]}
                    onChange={handleEditInputChange}
                  >
                    <option value={null}>Select currency </option>
                    <option value="$">$</option>
                    <option value="₹">₹</option>
                    <option value="€">€</option>€
                  </Form.Select>
                  <Form.Control
                    style={{ width: "100%" }}
                    className={stylesheet["form-controls"]}
                    type="number"
                    name="amount"
                    value={expenseToEdit ? expenseToEdit.amount : ""}
                    onChange={handleEditInputChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className={stylesheet["form-group"]}>
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  className={stylesheet["form-controls"]}
                  type="text"
                  name="description"
                  value={expenseToEdit ? expenseToEdit.description : ""}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group className={stylesheet["form-group"]}>
                <Form.Label className={stylesheet["form-label"]}>
                  Category:{" "}
                </Form.Label>
                <Form.Select
                  className={stylesheet["form-controls"]}
                  aria-label="expenseCategroy"
                  value={expenseToEdit ? expenseToEdit.category : ""}
                  name="category"
                  onChange={handleEditInputChange}
                >
                  <option value={null}>Select Where You Spend </option>
                  <option value="car servicing">Car servicing </option>
                  <option value="petrol">Petrol </option>
                  <option value="food">Food</option>
                  <option value="grocery">Grocery</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className={isDarkTheme ? stylesheet["modal-dark"] : ""}
          >
              <Button
                className={stylesheet["modal-delete"]}
                onClick={handleEditModalClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <GiCancel />
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                className={stylesheet["modal-cancel"]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <BsSave />
                <span>Save Changes</span>
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default Expenses;
