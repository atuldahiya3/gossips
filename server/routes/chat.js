import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMember, getMyChats, getMyGroups, newGroupChat } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated)   
app.post("/new",newGroupChat)
app.get("/myChats",getMyChats)
app.get("/myGroups",getMyGroups)
app.put("/addMember",addMember)


export default app;