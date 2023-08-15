import React, { useEffect, useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const userIsloggedIn = !!token;

  useEffect(() => {
    const initialToken = localStorage.getItem("token");
    const initialEmail = localStorage.getItem("email");
    if (initialToken && initialEmail) {
      setToken(initialToken);
      setEmail(initialEmail);
    }
  }, []);
  const logInHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  };
  const logoutHandler =()=>{

  }

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsloggedIn,
    login:logInHandler,
    logout:logoutHandler
  };

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>

};

export default AuthContext