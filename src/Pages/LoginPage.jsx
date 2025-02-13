import React, { useState } from 'react'
import logo  from '../assets/logo.png'
import axios from 'axios';
import API from '../API/api';
import { Navigate } from 'react-router-dom';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const saveToken = (token) => {
        localStorage.setItem("token", token); 
    };
    
    const getUserFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
    
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); 
            return payload; 
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    async function UserLogged(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post(API.LOGIN, { email, password });
    
            saveToken(data.token); 
    
            const user = getUserFromToken();
            if (user) {
                console.log("Logged in as:", user);
                alert("Login successful!");
                setRedirect(true);
            } else {
                alert("Invalid token data. Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Invalid credentials");
        }
    }
    
    if (redirect) return <Navigate to="/home" />;

  return (
    <section className= ' flex flex-row h-screen mt-0 bg-gray-50'>
        <div className='bg-gray-50 w-1/2 flex items-center justify-center'>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-3xl text-red-400'>Login</span>
                <form onSubmit={UserLogged}>
                    <input type="text" value={email} onChange={ev=>setEmail(ev.target.value)} placeholder='Enter Email Address'/>
                    <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder='Enter Password' />
                    <button className='bg-primary w-full  mt-4 h-12 text-white  rounded-3xl text-xl  hover:bg-[#E52020]'>Log</button>
                </form>
                <span>
                    Don't have an account? <a href="/register" className="text-primary">Register here</a>
                </span>
            </div>
        </div>
        <div className='w-1/2 bg-black flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <img src={logo} alt="Logo here"/>
                
            </div>
            <div className='flex text-white text-2xl  justify-center items-center'>
            <span className=''>Smart <span className='text-primary'>Booking </span>, Effortless Scheduling  </span> 
            
            </div>
        </div>
    </section>
  )
}

export default LoginPage