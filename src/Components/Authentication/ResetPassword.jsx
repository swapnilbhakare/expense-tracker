import React, { useRef, useState } from "react";
import { MdLockReset } from "react-icons/md";
import { Form, Row, Col, Button } from "react-bootstrap";
import stylesheet from "./ResetPassword.module.css";
import { useNavigate } from "react-router-dom";
const ResetPassword = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const [email, setEmail] = useState("");
  const resetPasswordHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enterdEmail = emailInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBG_zzX0vmA0rh-Ngs3iUqHr5rh6UIpfgM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enterdEmail,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(true);
        if (res.ok) {
          setEmail("");
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data.error && data.error.message) {
              const errorMessage = data.error.message;
              if (errorMessage.includes("EMAIL_NOT_FOUND")) {
                throw new Error("Email not found. Please try again.");
              } else if (errorMessage.includes("INVALID_EMAIL")) {
                throw new Error(
                  "Invalid email format. Please provide a valid email."
                );
              } else if (errorMessage.includes("USER_DISABLED")) {
                throw new Error(
                  "This user account has been disabled. Contact support."
                );
              } else {
                throw new Error("Verification failed. Please try again later.");
              }
            } else {
              throw new Error("Verification failed. Please try again later.");
            }
          });
        }
      })
      .then((data) => {
        navigate("/auth");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const emailInputChangeHandler = () => {
    setEmail(emailInputRef.current.value);
  };
  return (
    <>
      <Form
        onSubmit={resetPasswordHandler}
        className={stylesheet["auth-root-reset"]}
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
      >
        <Row xs={2} md={4} lg={6}>
          <Col>
            <h2 className={stylesheet.heading}>
              <MdLockReset className={stylesheet.lock} />
              Reset Password
            </h2>
          </Col>
          <Form.Group
            as={Col}
            xs={12}
            md={8}
            className={`${stylesheet["form-group"]}`}
          >
            <Form.Label className={stylesheet["form-label"]}>Email</Form.Label>
            <Form.Control
              className={`${stylesheet["form-controls"]}`}
              type="email"
              placeholder="Enter Register Email"
              value={email}
              ref={emailInputRef}
              onChange={emailInputChangeHandler}
              required
            />
          </Form.Group>
          <Form.Group as={Col} className={`${stylesheet["form-group"]}`}>
            {!isLoading ? (
              <Button type="submit" className={stylesheet.btn}>
                Reset
              </Button>
            ) : (
              <Button type="submit" className={stylesheet.btn}>
                Sending url..
              </Button>
            )}
          </Form.Group>
        </Row>

      </Form>
    </>
  );
};

export default ResetPassword;
