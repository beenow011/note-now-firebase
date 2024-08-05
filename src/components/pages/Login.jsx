import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../firebase/auth";
import { FirebaseError } from "firebase/app";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
function Login() {
  const [visibility, setVisibility] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const loginUser = async (data) => {
    setError("");
    try {
      const userData = await authService.loginUser(data);
      dispatch(login(userData?.user?.uid));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md border rounded-lg p-6 bg-gray-800 shadow-lg">
        <h1 className="text-white font-mono text-4xl text-center pt-4 mb-6">
          Log in
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit(loginUser)}>
          <label htmlFor="email" className="text-white flex items-center mt-2">
            <FaEnvelope className="mr-2" /> Email
          </label>
          <input
            placeholder="Email"
            type="email"
            className="p-2 mt-2 rounded-md text-black"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />

          <label
            htmlFor="password"
            className="text-white flex items-center mt-4"
          >
            <FaLock className="mr-2" /> Password
          </label>
          <input
            placeholder="Password"
            type={visibility ? "password" : "text"}
            className="p-2 mt-2 rounded-md text-black"
            {...register("password", {
              required: "Password is required",
            })}
          />

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="cursor-pointer mx-2 rounded-full"
              onClick={() => setVisibility((state) => !state)}
            />
            <label htmlFor="visibility" className="text-white cursor-pointer">
              {visibility ? "Show Password" : "Hide Password"}
            </label>
          </div>

          {error && (
            <p className="text-red-500 bg-white m-2 rounded-md text-center p-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="p-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
