import React, { useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import LoginAnimate from "../asstes/LoginAnimate.mp4";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "ngo") {
        navigate("/ngo");
      } else if (data.role === "user") {
        navigate("/home");
      } else {
        // Default fallback route
        navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div>
        <video
          src={LoginAnimate}
          autoPlay
          loop
          muted
          className="w-full h-full container"
        ></video>
      </div>
      <div className="mx-auto w-full max-w-lg bg-gray-100 p-10 rounded-xl border border-black/25 formbox">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center font-bold text-2xl leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have any account?&nbsp;
          <Link
            to="/register"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-1"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-1"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 white w-full mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
