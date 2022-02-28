import React from 'react'
import "./login.css"
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { useContext,useRef } from 'react'
import axios from 'axios'

export default function Login() {
    const userRef= useRef()
    const passwordRef= useRef()
    const {user,dispatch,isFecthing,error}=useContext(Context)
    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
            const res= await axios.post("/auth/login",{
                username:userRef.current.value,
                password:passwordRef.current.value
            })
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        }
        catch(err)
        {
            dispatch({type:"LOGIN_FAILURE"});
        }
    } 
    console.log(user);
    return (
        <div className="login">
            <h4 className="loginTitle">Login</h4>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="">Username</label>
                <input className="input" type="text" placeholder="Enter Username" ref={userRef} />
                <label htmlFor="">Password</label>
                <input className="input" type="password" placeholder="Enter Password"  ref={passwordRef}/>
                <button className="loginButton" type="submit" disabled={error}>Login</button> 
            </form>
            <div className="registerDiv">
                <button className="registerButton">
                    <Link to="/register" style={{textDecoration:"none", color:"inherit"}}>Register</Link>
                </button>
            </div>
        </div>
    )
}
