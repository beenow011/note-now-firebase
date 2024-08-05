import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../firebase/auth";
import { FirebaseError } from "firebase/app";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
function Signup() {
  const [visibility, setVisibility] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createUser(data);
      if (userData) {
        dispatch(login(userData?.user?.uid));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  console.log("error", error);
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 border rounded-lg bg-gray-800 shadow-lg">
      <h1 className="text-white font-mono text-4xl text-center pt-4">
        Sign Up
      </h1>
      <form
        action="submit"
        className="flex flex-col justify-center p-4"
        onSubmit={handleSubmit(create)}
      >
        <label htmlFor="name" className="mt-4 text-white flex items-center">
          <FaUser className="mr-2" /> Full Name
        </label>
        <input
          placeholder="Full Name"
          type="text"
          className="p-2 mt-2 rounded-md text-black"
          {...register("name", { required: true })}
        />

        <label htmlFor="email" className="mt-4 text-white flex items-center">
          <FaEnvelope className="mr-2" /> Email
        </label>
        <input
          placeholder="Email"
          type="email"
          className="p-2 mt-2 rounded-md text-black"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <label htmlFor="password" className="mt-4 text-white flex items-center">
          <FaLock className="mr-2" /> Password
        </label>
        <input
          placeholder="Password"
          type={visibility ? "password" : "text"}
          className="p-2 mt-2 rounded-md text-black"
          {...register("password", { required: true })}
        />

        <div className="mt-4 flex items-center">
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
