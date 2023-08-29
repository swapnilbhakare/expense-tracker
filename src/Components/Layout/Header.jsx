import React from "react";
import stylesheet from "./Header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { useDispatch,useSelector } from "react-redux";
import {logout} from '../../Store/authSlice'
const Header = (props) => {
const dispatch = useDispatch()
const auth = useSelector((state)=>state.authentication)
  const navigate = useNavigate();


  const location = useLocation();
  const logoutHandler = () => {
    dispatch(logout())
    navigate("/auth",{replace:true})
    
  };
  return (
    <>
      <Navbar  className={stylesheet.navbar}>
        <Container>
          <Nav >
            <Nav.Item style={{ color: "turquoise", fontSize: "25px" }}>
              Expense Tracker
            </Nav.Item>
          </Nav>
        </Container>
        <Container>
          {location.pathname !== "/profile" && (
            <span>
              Your Profile is Incomplete
              <NavLink to="/profile" className={stylesheet.completeProfile}>
                Complete Now
              </NavLink>
            </span>
          )}
        </Container>
        {auth.isLoggedIn && location.pathname !== "/auth" && (
          <Button className={stylesheet.logoutBtn} onClick={logoutHandler}>
            <BiLogOut className={stylesheet["logout-icon"]} />
            <span>Log Out</span>
          </Button>
        )}
      </Navbar>
    </>
  );
};

export default Header;
