const router=require("express").Router();
const User=require("../models/User")
const Posts=require("../models/Posts")
const bcrypt = require('bcrypt');

//update
router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id)
    {
        if(req.body.password)
        {
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        try{
            const modifiesUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).json(modifiesUser);
        }
        catch(err)
        {   
            res.status(500).json(err);
            console.log(err);
        }
    }
    else{
        res.status(401).json("You can update your account only:(");
    }
});

//del
router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id)
    {
        try{
            const user= await User.findById(req.params.id);
        try{
            
            await Posts.deleteMany({username:user.username});
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User Deleted.")
        }
        catch(err)
        {   
            res.status(500).json(err);
            console.log(err);
        }
        }
        catch(err)
        {
            res.status(404).json("User not found");
            console.log(err);
        }
    }
    else{
        res.status(401).json("You can del your account only:(");
    }
});

//get single user

router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password, ...rem}=user._doc;
        res.status(200).json(rem);
    }
    catch(err)
    {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router ;