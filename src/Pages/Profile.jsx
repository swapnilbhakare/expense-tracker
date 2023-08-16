import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../Components/Layout/Header";
import { Button, Container, Form } from "react-bootstrap";
import AuthContext from "../Store/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const authcontext = useContext(AuthContext);
  const fullNameInputRef = useRef();
  const profileUrlRef = useRef();

  const [fullName, setFullName] = useState("");
  const [prfileUrl, SetProfileUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBG_zzX0vmA0rh-Ngs3iUqHr5rh6UIpfgM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authcontext.token,
        }),
        Headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Unable to get user details";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setFullName(data.users[0].displayName);
        SetProfileUrl(data.users[0].displayName);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  const cancelHandler = () => {
    navigate("/home");
  };
  const updateHandler = (event) => {
    event.preventDefault();

    const enterdFullName = fullNameInputRef.current.value;
    const enterdProfileUrl = profileUrlRef.current.value;
    let errorMessage;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBG_zzX0vmA0rh-Ngs3iUqHr5rh6UIpfgM",
      {
        method: "POST",

        body: JSON.stringify({
          idToken: authcontext.token,
          displayName: enterdFullName,
          photoUrl: enterdProfileUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res)=>{
        if(res.ok){
            setFullName(enterdFullName)
            SetProfileUrl(enterdProfileUrl)
            return res.json()
        }else{
            return res.json().then(data=>{
                errorMessage ="Update Failed"
                if(data && data.error && data.error.message){
                    errorMessage= data.error.message
                }
                throw new Error(errorMessage)
            })
        }
    }).then((data)=>{
        console.log(data)
    }).catch(error=>{
        alert(error.message)
    })
  };
  const fullNameInputChangeHandler =()=>{
    setFullName(fullNameInputRef.current.value)
  }
  const profileUrlInputChangeHandler =()=>{
    SetProfileUrl(profileUrlRef.current.value)
  }

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={updateHandler}>
          <header style={{ marginBottom: "15px" }}>
            Update Details
            <Button onClick={cancelHandler}>Cancel</Button>
          </header>
          <Form.Group controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full Name"
              ref={fullNameInputRef}
              required
              onChange={fullNameInputChangeHandler}

              value={fullName}

            />
          </Form.Group>

          <Form.Group controlId="formBasicProfileURL">
            <Form.Label>Profile Photo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Paste profile photo url here"
              ref={profileUrlRef}
              required
              onChange={profileUrlInputChangeHandler}

              value={prfileUrl}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
