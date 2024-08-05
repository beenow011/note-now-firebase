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
  const userData = useSelector((state) => state.userData);
  // console.log(userData);
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
    <div className=" bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 p-4 flex justify-between items-center shadow-lg">
      <div>
        <Link to="/">
          <h1 className="text-white text-3xl font-mono font-bold hover:text-green-300 transition-colors">
            Note Now
          </h1>
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          {!authStatus && (
            <>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white font-mono text-lg px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-white font-mono text-lg px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Signup
                </button>
              </li>
            </>
          )}
          {authStatus && (
            <li>
              <button
                onClick={signoutUser}
                className="text-white font-mono text-lg px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
