import React from 'react'
import "./register.css"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [error,setError]=useState(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(false);
        try{
            const res= await axios.post("/auth/register",{
            username,
            password,
            email
        });
        //console.log(res);
        res.data && window.location.replace("/login");
        }
        catch(err)
        {
            setError(true);
        }
    }
    return (
        <div className="register">
             <h4 className="registerTitle">Register</h4>
            <form action="" className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="">Username</label>
                <input className="input" type="text" placeholder="Enter Username" onChange={e=>setUsername(e.target.value)} />
                <label htmlFor="">Email</label>
                <input className="input" type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} />
                <label htmlFor="">Password</label>
                <input className="input" type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} />
                <button className="registerButton" type="submit">Register</button> 
            </form>
            <div className="loginDiv">
                <button className="loginButton">
                    <Link to="/login" style={{textDecoration:"none", color:"inherit"}}>Login</Link>
                </button>
            </div>
            {
                error && <span className="wentWrong">Some thing went wrong</span>
            }
        </div>
    )
}
