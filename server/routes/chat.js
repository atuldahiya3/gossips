import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMember, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachment } from "../controllers/chat.js";
import { attachmentUploadMulter } from "../middlewares/multer.js";
import { newGroupChatValidator, validationHandler } from "../lib/validators.js";

const app = express.Router();

app.use(isAuthenticated)   
app.post("/new",newGroupChatValidator(),validationHandler,newGroupChat)
app.get("/myChats",getMyChats)
app.get("/myGroups",getMyGroups)
app.put("/addMember",addMember)
app.put("/removeMember",removeMember)
app.delete("/leave/:id",leaveGroup)
//sendAttachment
app.post("/message",attachmentUploadMulter,sendAttachment)
//getMessage
app.get("/message/:id",getMessages)
//get chat detail / rename / delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat)
export default app;