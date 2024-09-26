import express from "express"
import userRoute from "../server/routes/user.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})

const mongoURI=process.env.MONGO_URI

connectDB(mongoURI);

const app=express();
//using middleware to access values
app.use(express.json());  // to access json data  
app.use(express.urlencoded());  // to access form data

app.use("/user",userRoute)

app.get("/",(req,res)=>{
    res.send(" i Am HOmE")
})

app.listen((3000),()=>{
    console.log("Server is running on port 3000");
})