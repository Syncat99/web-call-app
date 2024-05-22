import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataContext";
import Registration from "./features/auth/signup";
import LandingPage from "./features/landing";
import Login from "./features/auth/login";
import Layout from "./components/layout";
import CallPage from "./features/call";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={Layout}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/app" element={<CallPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
