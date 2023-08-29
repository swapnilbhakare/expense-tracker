import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Authentication from "./Components/Authentication/Authentication";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Verification from "./Components/Authentication/Verification";
import ResetPassword from "./Components/Authentication/ResetPassword";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />} />

        {isLoggedIn && (
          <>
            <Route path="/verification" element={<Verification />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        {!isLoggedIn && <Route path="/auth" element={<Authentication />} />}
        <Route path="forget" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
