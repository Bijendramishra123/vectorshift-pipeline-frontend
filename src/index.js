import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/**
 * Entry Point
 * ---------------------------------------------
 * Responsible for bootstrapping the React app.
 * 
 * - Enables React Strict Mode (development checks)
 * - Creates concurrent root (React 18)
 */

const container =
  document.getElementById("root");

if (!container) {
  throw new Error(
    "Root element not found"
  );
}

const root =
  ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);