import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidLockAlt } from "react-icons/bi";
import stylesheet from "./Authentication.module.css";
import { Col, Row, Button, Form } from "react-bootstrap";
import {login} from '../../Store/authSlice'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Authentication = (props) => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
 
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enterdEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;
    const enterdConfirmPassword = !isLogin? confirmPasswordInputRef.current.value:null
   

    let url;

    if (!isLogin && enterdPassword !== enterdConfirmPassword) {
   
    
      toast.error("Passwords did not match", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

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
               
                toast.error("User not found.", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              }else if(data.error.message==="INVALID_PASSWORD"){

                toast.error("Invalid password.", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });

                
              }else{
                
                toast.error("Login Failed!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
            else{
              if(data.error.message==="EMAIL_EXISTS"){
                
                
                  toast.error("User already exists.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                  });
              }else{
              
                toast.error("Sign-up Failed!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
           
           
          });
        }
      })
      .then((data) => {
        console.log(data)
        const idToken = data.idToken;
        const userId = data.email;
        dispatch(login({ idToken, userId }));
          if(isLogin){
          
            toast.success("User has successfully signed in", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            navigate('/home')
            
          }else{
           
            navigate('/verification')
            
            toast.success("User has successfully signed up", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
          
        
          if(!isLogin){
            confirmPasswordInputRef.current.value=""
          }
          emailInputRef.current.value=""
          passwordInputRef.current.value=""
        
        
        
       
      })
      .catch((err) => {
      
        toast.error("Please Enter correct email password", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
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
       
      >
        <Row >
          <Col>
            <h2 className={stylesheet.heading}>
              <BiSolidLockAlt className={stylesheet.lock} />
              {isLogin ? "Log In" : "Sign Up"}
            </h2>
          </Col>
          <Form.Group
            
            className={`${stylesheet["form-group"]}`}
          >
            <Form.Label className={stylesheet["form-label"]}>Email</Form.Label>
            <Form.Control
              className={`${stylesheet["form-controls"]}`}
              type="email"
              placeholder="Enter Email"
              ref={emailInputRef}
              required
            />
          </Form.Group>

          <Form.Group
          
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

          <Form.Group  className={`${stylesheet["form-group"]}`}>
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
