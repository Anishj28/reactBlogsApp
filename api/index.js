const express=require("express");

const app=express();

const dotenv=require("dotenv");

const multer=require("multer");

const path=require("path");

const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts");
const catRoute=require("./routes/categories")

dotenv.config();
app.use(express.json());
app.use("/imgs",express.static(path.join(__dirname,"/imgs")))

const mongoose=require("mongoose");

mongoose.connect(process.env.URL).then(console.log("connected to mongoDB")).catch( (err)=>console.log(err))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"imgs")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file uploaded");
})

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",catRoute);

app.listen("5000",()=>{
    console.log("Listening.....");
})