import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Login, Notebook, Notes, Signup } from "./components/index.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Protected from "./components/AuthLayout.jsx";
import Lib from "./components/Lib.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication={false}>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/notes",
        element: (
          <Protected authentication>
            <Notes />
          </Protected>
        ),
      },
      // {
      //   path: "/library",
      //   element: (
      //     <Protected authentication>
      //       <Lib />
      //     </Protected>
      //   ),
      // },
      {
        path: "/notebook/:notesId",
        element: (
          <Protected authentication>
            <Notebook />
          </Protected>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
