import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter, Header } from "./components";
import "./css/app.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
