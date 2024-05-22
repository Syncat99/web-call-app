import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataContext";
import Registration from "./features/auth/signup";
import MeetingSpace from "./features/meetingspace";
import LandingPage from "./features/landing";
import Login from "./features/auth/login";
import Layout from "./components/layout";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={Layout}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/app" element={<MeetingSpace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
