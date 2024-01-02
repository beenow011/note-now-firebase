import { useState } from "react";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}

export default App;
