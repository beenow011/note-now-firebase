import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import authService from "../firebase/auth";
import { logout } from "../store/authSlice";
function Header() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.status);
  console.log(authStatus);
  const navigate = useNavigate();
  const signoutUser = async () => {
    try {
      await authService.logoutUser();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const navItems = [
    {
      path: "/login",
      name: "Login",
      auth: false,
    },
    {
      path: "/signup",
      name: "Signup",
      auth: false,
    },
    {
      path: "/",
      name: "Logout",
      auth: true,
    },
  ];
  return (
    <div className="w-screen bg-blue-900 p-3 flex justify-between">
      <div>
        <Link to="/">
          <h1 className="text-white p-4 font-mono text-3xl hover:text-green-300">
            Note now
          </h1>
        </Link>
      </div>
      <nav>
        <ul className="flex">
          {/* {navItems.map((item, i) =>
            item.auth === authStatus ? (
              <li key={i}>
                <button
                  onClick={() => navigate(item.path)}
                  className="text-white font-mono  p-4 hover:text-green-400"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )} */}
          {!authStatus && (
            <li>
              <button
                onClick={() => navigate("/login")}
                className="text-white font-mono  p-4 hover:text-green-400"
              >
                login
              </button>
            </li>
          )}
          {!authStatus && (
            <li>
              <button
                onClick={() => navigate("/signup")}
                className="text-white font-mono  p-4 hover:text-green-400"
              >
                signup
              </button>
            </li>
          )}
          {authStatus && (
            <li>
              <button
                onClick={signoutUser}
                className="text-white font-mono  p-4 hover:text-green-400"
              >
                logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
