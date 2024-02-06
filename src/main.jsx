import React from "react";
import ReactDOM from "react-dom/client";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter as Router } from "react-router-dom";
//core
import "primereact/resources/primereact.min.css";
import RoutesPage from "./RoutesPage.jsx";

// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <RoutesPage />
    </Router>
  </React.StrictMode>
);
