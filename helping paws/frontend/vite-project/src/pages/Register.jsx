import React, { useState } from "react";
import api from "../services/api";
import { useNavigate ,Link } from "react-router-dom";
import Input from "./input";
import Button from "./Button";
import Select from "./Select";
import Logo from "./Logo";
import LoginAnimate from "../asstes/LoginAnimate.mp4";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { data } = await api.post("/users/register", formData);
      
      
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    
    <div className='flex  items-center justify-center w-full'>
      <div>
      
      <video src={LoginAnimate}
                          autoPlay
                          loop
                          muted
                          className="w-full h-full container
                          "></video>
      
      </div>
    <div className={`mx-auto w-full max-w-lg bg-gray-100 p-10 rounded-xl border border-black/25 formbox`} >
      <div className='mb-2 flex justify-center'>
        <span className='inline-block w-full max-w-[100px]'>
          <Logo width='100%' />
        </span>
      </div>
      <h2 className=' text-center font-bold text-2xl leading-tight'>Sign up to your account</h2>
      <p className='mt-2 text-center text-base text-black/60'>
     Already have an account?&nbsp;
        <Link
          to="/login"
          className='font-medium text-primary transition-all duration-200 hover:underline'
        >Login</Link>  
      </p>
      <form onSubmit={handleSubmit} className='mt-6'>
      <input
  name="name"
  placeholder="Name"
  className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-1"
  onChange={handleChange}
  required
/>

<input
  name="email"
  placeholder="Email"
  type="email"
  className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-1"
  onChange={handleChange}
  required
/>

<input
  name="password"
  type="password"
  placeholder="Password"
  className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-1"
  onChange={handleChange}
  required
/>

<select
  name="role"
  className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-1"
  onChange={handleChange}
  required
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
  <option value="ngo">NGO</option>
</select>

<button
  type="submit"
  className="w-full bg-blue-400 mt-2 px-3 py-2 rounded-lg text-white"
>
  Register
</button>

  
         </form>
        </div>
        </div>
  );
}

export default Register;
