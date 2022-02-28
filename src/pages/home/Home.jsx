import React from 'react'
import Header from '../../header/Header'
import Posts from '../../posts/Posts'
import Sidebar from '../../sidebar/Sidebar'
import axios from 'axios'
import { useState,useEffect } from 'react'

import "./home.css"
import { useLocation } from 'react-router-dom'

export default function Home() {
    const [posts,setPosts]=useState([]);
    const {search}=useLocation();
    //console.log(search)
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res= await axios.get("/posts"+ search);
            setPosts(res.data);
            console.log(res.data);
        }
        fetchPosts();
    },[search]);
    return (
        <>
        <Header></Header>
        <div className="home">
            <Posts posts={posts} ></Posts>
            <Sidebar></Sidebar>
        </div>
        </>
    )
}
