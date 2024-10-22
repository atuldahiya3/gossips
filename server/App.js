import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./utils/features.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { v4 } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
// import { getSockets } from "./lib/helper.js";
import adminRoute from "../server/routes/admin.js";
import chatRoute from "../server/routes/chat.js";
import userRoute from "../server/routes/user.js";

dotenv.config({
    path:'./.env'
})

const mongoURI=process.env.MONGO_URI

// const userSocketIds=new Map()

connectDB(mongoURI);
// createUser(10);
const app=express();
const server=createServer(app)
const io=new Server(server,{})
//using middleware to access values
app.use(express.json());  // to access json data  
app.use(express.urlencoded());  // to access form data

app.use(cookieParser())



app.use("/user",userRoute)
app.use("/chat",chatRoute)
app.use("/admin",adminRoute)

app.get("/",(req,res)=>{
    res.send(" i Am HOmE")
})



// io.on("connection",(socket)=>{
//     const user={
//         _id:"abab",
//         name:"atul"
//     }
//     userSocketIds.set(user._id.toString(),socket.id)
//     console.log("A user connected",socket.id);

//     socket.on(NEW_MESSAGE,async({chatId, members, messages})=>{
//         const messageForRealTime={
//             content:messages,
//             _id:v4(),
//             sender:{
//                 _id:user._id,
//                 name:user.name
//             },
//             chat:chatId,
//             cretedAt:new Date().toISOString()
//         }

//         const messageForDb={
//             content:messages,
//             sender:user._id,
//             chat:chatId,
//         }

//         const membersSocket=getSockets(members)
//         io.to(membersSocket).emit(NEW_MESSAGE,{
//             chatId,
//             message:messageForRealTime
//         })
//         io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId})
//         console.log("new message",messageForRealTime);
//     })

//     socket.on("disconnect",()=>{
//         console.log("disconnected");
//         userSocketIds.delete(user._id.toString())
//     })
// })

server.listen((3000),()=>{
    console.log("Server is running on port 3000");
})

// export { userSocketIds };
