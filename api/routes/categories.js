const router=require("express").Router();
const Category=require("../models/Category")

router.post("/", async (req,res)=>{
    const newCat= new Category(req.body);

    try
    {
        const saved= await newCat.save();
        res.status(200).json(saved);
    }
    catch(err)
    {
        res.status(500).json(err);
        console.log(err);
    }
})

//get all
router.get("/", async (req,res)=>{
    const newCat= new Category(req.body);

    try
    {
        const allCats= await Category.find();
        res.status(200).json(allCats);
    }
    catch(err)
    {
        res.status(500).json(err);
        console.log(err);
    }
})
module.exports = router ;