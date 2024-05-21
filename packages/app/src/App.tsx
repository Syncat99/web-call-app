import { DataProvider } from "./context/dataContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import Registration from "./features/auth/signup";
import Login from "./features/auth/login";
import "./App.css";
import MainApp from "./pages/app/mainApp";
function App() {
  return (
    <div className="app">
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/app" element={<MainApp />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
