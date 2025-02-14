import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter, Footer, Header } from "./components";
import "./css/app.css";
import { SnackbarProvider } from "notistack";
import { cookie } from "./utils";
import { userStore } from "./store";

function App() {
  useEffect(() => {
    const username = cookie.getCookie("username");
    if (username) {
      userStore.setIsAuth(true);
      userStore.setData({ username });
    }
  });

  return (
    <BrowserRouter>
      {/* Уведомления */}
      <SnackbarProvider autoHideDuration={3000}>
        <Header />
        <AppRouter />
        <Footer />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
