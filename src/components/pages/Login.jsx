import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../firebase/auth";
import { FirebaseError } from "firebase/app";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const loginUser = async (data) => {
    setError("");
    try {
      const userData = authService.loginUser(data);
      dispatch(login(userData));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div className="w-96  border rounded-md m-auto mt-10 bg-gray-800 ">
        <h1 className="text-white font-mono text-4xl text-center pt-8">
          Log in
        </h1>
        <form action="submit" className=" flex flex-col justify-center p-4">
          <label htmlFor="" className="mt-2">
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            className="p-2 text-black"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <label htmlFor="" className="mt-2">
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            className="p-2 text-black"
            {...register("password", {
              required: true,
            })}
          />
          {error && (
            <p className="text-red-500 bg-white m-1 rounded-md text-center">
              {error}
            </p>
          )}
          <button
            className="p-3 bg-blue-800 mt-9 hover:bg-black"
            onClick={handleSubmit(loginUser)}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
