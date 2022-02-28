import React, { useContext } from 'react'
import { Link, useLocation} from 'react-router-dom'
import { useEffect,useState } from 'react';
import "./singlePost.css"
import axios from 'axios';
import {Context} from "../../src/context/Context"

export default function SinglePost() {
    const [post,setPost]=useState([]);
    const location=useLocation();
    const id=location.pathname.split("/")[2];
    //const PF="htttp://localhost:5000/imgs/";
    const {user} =useContext(Context);

    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [updatemode,setUpdatemode]=useState(false);

    useEffect(() => {
        const getPost = async ()=>{
            const res= await axios.get("/posts/"+id);
            setPost(res.data);
            //console.log(res)
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }

        getPost();
    }, [id]);

    const handleDelete= async ()=>{
        try
        {
            await axios.delete("/posts/"+id,{data:{username:user.username}});
            window.location.replace("/");
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const handleUpdatePost= async ()=>{
        try
        {
            await axios.put("/posts/"+id,{
                username:user.username,
                title,
                desc
            })

            window.location.reload();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const PF="http://localhost:5000/imgs/"
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {
                    post.photo && (
                        <img className="singlePostImage" src={PF+post.photo} alt="" />
                    )
                }
                {
                    updatemode ? (
                        <input type="text" className="singlePostTitle" placeholder="Enter NewTitle" onChange={(e)=>{
                            setTitle(e.target.value);
                        }}/>
                    ):
                    (
                        <h1 className="singlePostTitle">
                        {post.title}
                        {
                            post.username === user?.username &&
                            (<div className="singlePostEdit">
                                <i className="far fa-edit" onClick={()=>{
                                    setUpdatemode(true);
                                }}></i>
                                <br />
                                <i className="fas fa-trash" onClick={handleDelete}></i>    
                            </div>)
                        }
                        </h1>
                    ) 
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthour">
                        <Link to={`/?user=${post.username}`} style={{textDecoration:"none", color:"inherit"}} >
                            Authour : {post.username}
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                    
                </div>
                {
                    updatemode ? (
                        <input type="textarea" className="singlePostDesc"  placeholder="Enter new Description" onChange={(e)=>{
                            setDesc(e.target.value);
                        }} />
                    ):
                    (
                        <p className="singlePostDesc">{post.desc}</p>
                    )
                }

                {
                    updatemode &&
                    (   <> 
                        <br></br>
                        <button className="singlePostButton" onClick={handleUpdatePost}>Update</button>
                        </>
                    )
                }
                
            </div>
            
        </div>
    )
}
