import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMember, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated)   
app.post("/new",newGroupChat)
app.get("/myChats",getMyChats)
app.get("/myGroups",getMyGroups)
app.put("/addMember",addMember)
app.put("/removeMember",removeMember)
app.delete("/leave/:id",leaveGroup)
//sendAttachment

//getMessage

//get chat detail / rename / delete

export default app;