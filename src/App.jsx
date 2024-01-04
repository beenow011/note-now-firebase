import { useEffect, useState } from "react";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import Banner from "./components/Banner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
// const auth = getAuth();
function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(login(user?.uid));
  //     } else {
  //       console.log("no current user");
  //     }
  //   });
  // }, []);
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}

export default App;
