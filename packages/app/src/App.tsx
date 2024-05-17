import { DataProvider } from "./context/dataContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./features/auth/landingPage/landingPage";
import Registration from "./features/auth/signup";
import Login from "./features/auth/login";
import "./App.css"
function App() {
  return (
    <div className="app">
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  )
}

export default App;
