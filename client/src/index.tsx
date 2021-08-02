import React from "react";
import ReactDOM from "react-dom";
import { AlertProvider } from "./Context/AlertContext/AlertContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import App from "./App";

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
