import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Container, Button, Spinner } from "react-bootstrap";
import styleSheet from "./Verification.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useSelector } from "react-redux";

const Verification = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailVerified = useSelector(
    (state) => state.authentication.emailVerified
  );
  const idToken = useSelector((state) => state.authentication.idToken);
  const userId = useSelector((state) => state.authentication.userId);
 
  useEffect(() => {
    if (emailVerified) {
      setIsEmailVerified(true);
    }
  }, [emailVerified]);

  const verificationHandler = (event) => {
    event.preventDefault();
    const enterdEmail = emailInputRef.current.value;
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBG_zzX0vmA0rh-Ngs3iUqHr5rh6UIpfgM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        setEmail("");
        setIsEmailVerified(true);
        navigate("/home");
        return res.json();
      } else {
        return res.json().then((data) => {
          if (isEmailVerified && data.email === enterdEmail) {
            navigate("/home");
            
          }

          if (data.error && data.error.message) {
            const errorMessage = data.error.message;
            if (errorMessage.includes("EMAIL_NOT_FOUND")) {
              toast.error("Email not found. Please try again.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            } else if (errorMessage.includes("INVALID_EMAIL")) {
              toast.error(
                "Invalid email format. Please provide a valid email.",
                {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                }
              );
            } else if (errorMessage.includes("USER_DISABLED")) {
              toast.error(
                "This user account has been disabled. Contact support.",
                {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                }
              );
            } else {
              toast.error("Verification failed. Please try again later.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            toast.error("Verification failed. Please try again later.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        });
      }
    });
  };
  const emailInputChangeHandler = () => {
    setEmail(emailInputRef.current.value);
  };
  if (isEmailVerified && email === userId) {
    navigate("/home");
  }
  return (
    <Container
      className="d-flex justify-content-center my-5"
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minbreakpoint="xxs"
    >
      <Card className={styleSheet.card} style={{ width: "18rem" }}>
        <Card.Header as="h5">Verify It's You</Card.Header>
        <Card.Body>
          <Form onSubmit={verificationHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className={styleSheet["form-controls"]}
                type="email"
                placeholder="Enter Your Email here"
                required
                ref={emailInputRef}
                onChange={emailInputChangeHandler}
                value={email}
              />
            </Form.Group>
            {isLoading ? (
              <Button className={styleSheet.btn} style={{ marginTop: "15px" }}>
                <Spinner animation="border" size="sm" />
                Verifying..
              </Button>
            ) : (
              <Button
                type="submit"
                style={{ marginTop: "15px" }}
                className={styleSheet.btn}
              >
                Verify
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Verification;
