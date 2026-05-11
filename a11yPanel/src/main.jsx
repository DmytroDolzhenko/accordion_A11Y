import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { A11yProvider } from "./context/A11yContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <A11yProvider>
      <App />
    </A11yProvider>
    </BrowserRouter>
  </React.StrictMode>
);
