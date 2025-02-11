import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter, Header } from "./components";
import "./css/app.css";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <BrowserRouter>
      {/* Уведомления */}
      <SnackbarProvider autoHideDuration={3000}>
        <Header />
        <AppRouter />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
