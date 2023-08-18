import React, { useContext, useRef, useState } from "react";
import { Card, Form, Container, Button, Spinner } from "react-bootstrap";
import styleSheet from "./Verification.module.css";
import AuthContext from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";
const Verification = (props) => {
  const navigate= useNavigate()
  const emailInputRef = useRef();
  const authcontext = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const verificationHandler = (event) => {
    event.preventDefault();
    const enterdEmail = emailInputRef.current.value;
   
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBG_zzX0vmA0rh-Ngs3iUqHr5rh6UIpfgM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType:"VERIFY_EMAIL",
          idToken:authcontext.token
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res)=>{
      if(res.ok){
        setEmail("")
        return res.json()
      }else{
        return res.json().then((data)=>{
          if(data.email===enterdEmail){
            navigate('/home')
          }
          let errorMessage = "verification Failed!";
          if(data && data.error && data.error.message){
            errorMessage= data.error.message
          }
          throw new Error(errorMessage)
        })
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  };
  const emailInputChangeHandler=()=>{
    setEmail(emailInputRef.current.value)
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
            <Button type="submit" style={{ marginTop: "15px" }} className={styleSheet.btn}>
              Verify
            </Button>
            <Button className={styleSheet.btn}>
              <Spinner animation="border" size="sm" />
              Verifying..
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Verification;
