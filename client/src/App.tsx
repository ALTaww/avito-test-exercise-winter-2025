import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter, Header } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
