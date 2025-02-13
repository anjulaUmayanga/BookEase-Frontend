import React, { useState } from "react";
import logo  from '../assets/logo.png'
import axios from "axios";
import API from "../API/api";
import { Navigate } from "react-router-dom";
const RegisterPage = () => {
  const [name , setName] = useState('');
  const [userName , setusername] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [admin , setAdmin] = useState(false);
  const [redirect , setRedirect] = useState(false);

  async function RegUser(ev){
    ev.preventDefault();
    if(password === rePassword){
      try {
        const response =  await axios.post(API.REGISTER,{
          name,userName,email,password,admin
        });
        setRedirect(true);
        console.log(response.data);
        alert("Registration successful!")
      } catch (error) {
        console.log(error)
        
      }
    }else{
      alert("Password are not Match");
    }
  }

  if(redirect){
    return(<Navigate to={'/login'}/>);
  }
  return (
    <section className="flex w-full flex-row">
      <div className="flex flex-col w-1/2 justify-center items-center h-screen bg-gray-100">
        <span className="text-2xl text-red-500 font-semibold">Register</span>
        <div className="mx-8">
          <form onSubmit={RegUser}>
            <input type="text" value={name} onChange={ev=>setName(ev.target.value)} placeholder="Enter Name" className="mb-2 p-2 border rounded"/>
            <input type="text" value={userName} onChange={ev=>setusername(ev.target.value)} placeholder="Enter User Name" className="mb-2 p-2 border rounded"/>
            <input type="email" value={email} onChange={ev => setMail(ev.target.value)} placeholder="Enter Email" className="mb-2 p-2 border rounded"/>
            <input type="password" value={password} onChange={ev=>setPassword(ev.target.value)}  placeholder="Enter Password" className="mb-2 p-2 border rounded"/>
            <input type="password" value={rePassword} onChange={ev=>setRePassword(ev.target.value)} placeholder="Reenter Password" className="mb-2 p-2 border rounded"/>
            <button className="bg-primary w-full mt-4 h-12 text-white rounded-3xl text-xl hover:bg-[#E52020]">Register</button>
          </form>
          <div className="mt-4">
            Already have an Account? <a href="/login" className="text-primary">Login</a>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-black flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="Logo here" className="mb-4"/>
        </div>
        <div className="flex text-white text-2xl justify-center items-center">
          <span>
            Smart <span className="text-primary">Booking</span>, Effortless Scheduling
          </span>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
