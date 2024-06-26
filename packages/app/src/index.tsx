import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(
  document.getElementById("root") || document.createElement("div"),
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
