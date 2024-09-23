import express from "express"
import userRoute from "../server/routes/user.js"
const app=express();

app.use("/login",userRoute)

app.get("/",(req,res)=>{
    res.send(" i Am HOmE")
})

app.listen((3000),()=>{
    console.log("Server is running on port 3000");
})