import React, { useRef, useState, useContext } from "react";

import { BiSolidLockAlt } from "react-icons/bi";
import stylesheet from "./Authentication.module.css";
import { Col, Row, Button, Form } from "react-bootstrap";
import AuthContext from "../../Store/AuthContext";
const Authentication = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authcontext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enterdEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;
    const enterdConfirmPassword = confirmPasswordInputRef.current.value;
    let errorMessage;

    let url;
    if (!isLogin && enterdPassword !== enterdConfirmPassword) {
      alert("password didn't match");
      return;
    }

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG_zzX0vmA0rh-Ngs3iUqHr5rh6UIpfgM";
    }
    if (!isLogin && enterdPassword === enterdConfirmPassword) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG_zzX0vmA0rh-Ngs3iUqHr5rh6UIpfgM";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enterdEmail,
        password: enterdPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            errorMessage = "Authentication Failed !";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("User has successfully signed up");
        authcontext.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Form
        onSubmit={submitHandler}
        className={`${stylesheet["auth-root"]}`}
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <Row xs={2} md={4} lg={6}>
          <Col>
            <h2 className={stylesheet.heading}>
              <BiSolidLockAlt className={stylesheet.lock} />
              {isLogin ? "Login" : "Sign Up"}
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
              placeholder="Email"
              ref={emailInputRef}
              required
            />
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={8}
            className={`${stylesheet["form-group"]}`}
          >
            <Form.Label className={stylesheet["form-label"]}>
              Password
            </Form.Label>
            <Form.Control
              className={`${stylesheet["form-controls"]} `}
              type="password"
              placeholder="Enter password"
              ref={passwordInputRef}
              required
            />
          </Form.Group>
          {!isLogin && (
            <Form.Group
              as={Col}
              xs={12}
              md={8}
              className={`${stylesheet["form-group"]}`}
            >
              <Form.Label className={stylesheet["form-label"]}>
                Confirm Password
              </Form.Label>
              <Form.Control
                className={`${stylesheet["form-controls"]}`}
                type="password"
                placeholder="Confirm password"
                ref={confirmPasswordInputRef}
                required
              />
            </Form.Group>
          )}

          <Form.Group as={Col} className={`${stylesheet["form-group"]}`}>
            <Button type="submit" className={stylesheet.btn}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Button
        onClick={switchAuthModeHandler}
        type="button"
        className={stylesheet.switchBtn}
      >
        {isLogin ? "Don't have an Account? Sign Up" : "Have an Account? Login"}
      </Button>
    </>
  );
};

export default Authentication;
