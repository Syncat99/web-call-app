import Auth from "./features/auth";
import { DataProvider } from "./context/dataContext";
import LandingPage from "./features/auth/landingPage/landingPage";
import "./App.css"
function App() {
  return (
    <div className="app">
      <DataProvider>
        <LandingPage />
        {/* <Auth /> */}
      </DataProvider>
    </div>
  )
}

export default App;
