import React from "react"
import { useState } from "react";
import Registration from "./registration.tsx";
import Login from "./login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function Auth() {
    return (
        <>
            <BrowserRouter>
             <Routes>
                <Route index element={<Login />}/>
                <Route path="/register" element={<Registration />}/>
             </Routes>
            </BrowserRouter>
        </>
    );
  }
  
  export default Auth;
  
