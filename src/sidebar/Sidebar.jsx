import axios from 'axios';
import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function Sidebar() {
    const [cats,setCats]=useState([]);
    useEffect(()=>{
        const getCats= async ()=>{
            const res=await axios.get("/categories")
            console.log(res.data);
            setCats(res.data);
        }
        getCats();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About Me</span>
                <img src="data:image/png;base64,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" alt="" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae autem dolorem quidem repellendus voluptatem dolor assumenda ullam architecto? Quae consequuntur, reprehenderit recusandae incidunt sit veritatis at consequatur pariatur soluta labore?</p>
            </div>
            <hr />
            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <ul className="sidebarList">
                    {cats.map((cat)=>(
                        //{console.log(cat.name)}
                        <Link to={`/?cat=${cat.name}`} style={{textDecoration:"none", color:"inherit"}} >
                            <li className="sidebarListItem">{cat.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="sidebarItem">
                <span className="sidebarTitle">Follow Us here!!</span>
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter"></i>
                <i className="sidebarIcon fab fa-instagram"></i>
            </div>
        </div>
    )
}
