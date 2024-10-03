import express from "express"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoute from "../server/routes/user.js"
import chatRoute from "../server/routes/chat.js"
import { createUser } from "./seeders/user.js";


dotenv.config({
    path:'./.env'
})

const mongoURI=process.env.MONGO_URI

connectDB(mongoURI);
// createUser(10);
const app=express();
//using middleware to access values
app.use(express.json());  // to access json data  
app.use(express.urlencoded());  // to access form data

app.use(cookieParser())

app.use("/user",userRoute)
app.use("/chat",chatRoute)

app.get("/",(req,res)=>{
    res.send(" i Am HOmE")
})

app.listen((3000),()=>{
    console.log("Server is running on port 3000");
})