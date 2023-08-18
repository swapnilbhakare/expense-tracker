import React, { useContext } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Authentication from './Components/Authentication/Authentication';
import Home from './Pages/Home';
import AuthContext from './Store/AuthContext';
import Profile from './Pages/Profile';
import Verification from './Components/Authentication/Verification';

function App() {
  const authcontext = useContext(AuthContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Authentication/>} />
      
      {
        authcontext.isLoggedIn &&(
          <>
          <Route path='/verification' element={<Verification/>} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          </>

        )
      }
      {!authcontext.isLoggedIn &&
       <Route path='/auth' element={<Authentication/>}/>}
    
    
    
    </Routes>
    
    
    
    </>
  );
}

export default App;
