import React from "react";
import stylesheet from "./Header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button,  Nav, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { useDispatch,useSelector } from "react-redux";
import {logout} from '../../Store/authSlice'
const Header = () => {
const dispatch = useDispatch()
const auth = useSelector((state)=>state.authentication)
  const navigate = useNavigate();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);


  const location = useLocation();
  const logoutHandler = () => {
    dispatch(logout())
    navigate("/auth",{replace:true})
    
  };
  return (
    <>
      <Navbar  className={isDarkTheme?stylesheet["navbar-dark"]:stylesheet["navbar"]}
       breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs">
        <div  breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs">
          <Nav >
            <Nav.Item style={{ color: "turquoise", fontSize: "25px" }}>
              Expense Tracker
            </Nav.Item>
          </Nav>
        </div>
        <div  breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs">
          {location.pathname !== "/profile" && (
            <span>
              Your Profile is Incomplete
              <NavLink to="/profile" className={stylesheet.completeProfile}>
                Complete Now
              </NavLink>
            </span>
          )}
        </div  >
        <div  breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minbreakpoint="xxs">
          {auth.isLoggedIn && location.pathname !== "/auth" && (
          <Button className={stylesheet.logoutBtn} onClick={logoutHandler}>
            <BiLogOut className={stylesheet["logout-icon"]} />
            <span>Log Out</span>
          </Button>
        )}
        </div>
      </Navbar>
    </>
  );
};

export default Header;
