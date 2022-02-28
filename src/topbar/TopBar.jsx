import React from 'react'
import "./topbar.css"
import { Link } from 'react-router-dom';
import { useContext,useRef } from 'react';
import { Context } from '../context/Context';


export default function TopBar() {
    const {user,dispatch}=useContext(Context);
    const handleLogout = (e)=>{
        dispatch({type:"LOGOUT"});
    }
    return (
        <div className="top">
            <div className="tL">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter"></i>
                <i className="topIcon fab fa-instagram"></i>
            </div>
            <div className="C">
                <ul className="topList">
                    <li className="topListItem"><Link to="/" style={{textDecoration:"none", color:"inherit"}} >Home</Link></li>
                    <li className="topListItem"><Link to="/about" style={{textDecoration:"none", color:"inherit"}} >About</Link></li>
                    <li className="topListItem"><Link to="/contact" style={{textDecoration:"none", color:"inherit"}} >Contact</Link></li>
                    <li className="topListItem"><Link to="/write" style={{textDecoration:"none", color:"inherit"}} >Write</Link></li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "Logout"}
                    </li>
                </ul>
            </div>
            <div className="tR">
                {
                    user ? (
                        <p>Welcome...</p>
                    ): (
                        <>
                            <li className="topListItem"><Link to="/login" style={{textDecoration:"none", color:"inherit"}} >Login</Link></li>
                            <li className="topListItem"><Link to="/register" style={{textDecoration:"none", color:"inherit"}} >Register</Link></li>
                        </>
                    )
                }
                
                <i className="topSearch fas fa-search"></i>
            </div>
        </div>
    )
}
