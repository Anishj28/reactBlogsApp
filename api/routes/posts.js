const router=require("express").Router();
const User=require("../models/User")
const Posts=require("../models/Posts")
const bcrypt = require('bcrypt');
const { route } = require("./auth");

//create
router.post("/", async (req,res) => {
    const newPost=new Posts(req.body);
   try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
   }
   catch(err)
    {   
            res.status(500).json(err);
            console.log(err);
    }
});

//update
router.put("/:id", async (req,res)=>{
    try{
        const post=  await Posts.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try
            {
                const newPost = await Posts.findByIdAndUpdate(req.params.id,
                    {
                        $set : req.body
                    },
                    {new:true}
                    );
                res.status(200).json(newPost);
            }
            catch(err)
            {   
                res.status(500).json(err);
                console.log(err);
            }
        }
        else
        {
            res.status(500).json("Only your post can be updated :(");
        }
    }
    catch(err)
    {   
            res.status(500).json(err);
            console.log(err);
    }
})

//delete

//update
router.delete("/:id", async (req,res)=>{
    try{
        const post=  await Posts.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try
            {
                await post.delete();
                res.status(200).json("Post is deleted");
            }
            catch(err)
            {   
                res.status(500).json(err);
                console.log(err);
            }
        }
        else
        {
            res.status(500).json("Only your post can be deleted :(");
        }
    }
    catch(err)
    {   
            res.status(500).json(err);
            console.log(err);
    }
})

//get
router.get("/:id",async (req,res)=>{
    try{
        const post=await Posts.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err)
    {
        res.status(500).json(err);
        console.log(err);
    }
});

//all posts
router.get("/",async (req,res)=>{
    const username=req.query.user;
    const cat=req.query.cat;
    try{
        let posts;
        if(username)
        {
            posts= await Posts.find({username})
        }
        else if(cat)
        {
            posts= await Posts.find({categories:{
                $in:[cat]
            }})
        }
        else
        {
            posts= await Posts.find();
        }

        res.status(200).json(posts);
    }
    catch(err)
    {
        res.status(500).json(err);
        console.log(err);
    }
});
module.exports = router ;