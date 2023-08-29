import React, {  useEffect, useRef, useState } from "react";
import Header from "../Components/Layout/Header";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import stylesheet from "./Profile.module.css";
import { AiOutlineGithub, AiOutlineGlobal } from "react-icons/ai";
import { useSelector } from "react-redux";
const Profile = (props) => {
  const idToken = useSelector((state)=>state.authentication.idToken)
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
          idToken: idToken,
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
        SetProfileUrl(data.users[0].photoUrl);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [idToken]);
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
          idToken: idToken,
          displayName: enterdFullName,
          photoUrl: enterdProfileUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          setFullName(enterdFullName);
          SetProfileUrl(enterdProfileUrl);
          return res.json();
        } else {
          return res.json().then((data) => {
            errorMessage = "Update Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const fullNameInputChangeHandler = () => {
    setFullName(fullNameInputRef.current.value);
  };
  const profileUrlInputChangeHandler = () => {
    SetProfileUrl(profileUrlRef.current.value);
  };

  return (
    <>
      <Header />
      <Container className={stylesheet.profileContainer}>
        <header style={{ marginBottom: "15px",display:'flex',justifyContent:"space-between" }}>
          Update Details
          <Button onClick={cancelHandler} className={stylesheet.cancelbtn}>Cancel</Button>
        </header>

        <Form onSubmit={updateHandler} className={stylesheet.profile}>
          <Container style={{display:'flex', flexDirection:'column'}}>
            <Container className={stylesheet.inputTxt}>
              <Form.Group
                controlId="formBasicFullName"
                style={{ fontSize: "18px" }}
              >
                <Form.Label>
                  {" "}
                  <AiOutlineGithub style={{ color: "000" }} /> Name :
                </Form.Label>
                <Form.Control
                  style={{ marginLeft: "10px" }}
                  type="text"
                  placeholder="Enter full Name"
                  ref={fullNameInputRef}
                  required
                  onChange={fullNameInputChangeHandler}
                  value={fullName}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicProfileURL"
                style={{ marginLeft: "16px", fontSize: "18px" }}
              >
                <Form.Label>
                  {" "}
                  <AiOutlineGlobal style={{ color: "000" }} /> Profile Photo
                  URL:
                </Form.Label>
                <Form.Control
                  style={{ marginLeft: "10px" }}
                  type="text"
                  placeholder="Paste profile photo url here"
                  ref={profileUrlRef}
                  required
                  onChange={profileUrlInputChangeHandler}
                  value={prfileUrl}
                />
              </Form.Group>
            </Container>
            <Form.Group className={stylesheet.updateBtn}>
              <Button type="submit">Update</Button>
            </Form.Group>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
