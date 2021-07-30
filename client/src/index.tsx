import React from "react";
import ReactDOM from "react-dom";
import { AlertProvider } from "./Context/AlertContext/AlertContext";

import { AuthProvider } from "./Context/AuthContext/AuthContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
