import "./auth.css";
import "./auth.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./signup";
import Login from "./login";

function Auth() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Auth;
