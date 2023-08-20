import React, { useRef, useState, useContext } from "react";

import { BiSolidLockAlt } from "react-icons/bi";
import stylesheet from "./Authentication.module.css";
import { Col, Row, Button, Form } from "react-bootstrap";
import AuthContext from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";
const Authentication = (props) => {
  const navigate = useNavigate();

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
    const enterdConfirmPassword = !isLogin? confirmPasswordInputRef.current.value:null
    let errorMessage;

    let url;
    if (!isLogin && enterdPassword !== enterdConfirmPassword) {
      console.log(enterdPassword,enterdConfirmPassword)
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
            if(isLogin){
              if(data.error.message==="EMAIL_NOT_FOUND"){
                errorMessage="User not found."
              }else if(data.error.message==="INVALID_PASSWORD"){
                errorMessage ="Invalid password."
              }else{
                errorMessage="Login Failed!"
              }
            }
            else{
              if(data.error.message==="EMAIL_EXISTS"){
                  errorMessage="User already exists."
              }else{
                errorMessage="Sign-up Failed!"
              }
            }
           
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if(errorMessage){
          alert(errorMessage)
        }else{
          if(isLogin){
            navigate('/home')
            console.log("User has successfully signed in")
          }else{
           
            navigate('/verification')
            console.log("User has successfully signed up")
          }
          
          authcontext.login(data.idToken,data.email);
          if(!isLogin){
            confirmPasswordInputRef.current.value=""
          }
          emailInputRef.current.value=""
          passwordInputRef.current.value=""
        }
        
        
       
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const forgetPasswordHandler=()=>{
    navigate('/forget')
  }



  return (
    <>
      <Form
        onSubmit={submitHandler}
        
        className={`${isLogin?stylesheet['auth-root-login']:stylesheet["auth-root"]}`}
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs"
      >
        <Row xs={2} md={4} lg={6}>
          <Col>
            <h2 className={stylesheet.heading}>
              <BiSolidLockAlt className={stylesheet.lock} />
              {isLogin ? "Log In" : "Sign Up"}
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
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </Form.Group >
          {isLogin &&<Form.Group as={Col} className={`${stylesheet["form-group"]}`}>
            <Button onClick={forgetPasswordHandler} className={stylesheet.forgetBtn}> Forget Password ?</Button>
          </Form.Group> }
          
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
