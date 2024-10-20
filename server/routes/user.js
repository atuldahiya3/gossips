import express from "express"
import { acceptFriendRequest, logOut, login, newUser, notifications, searchUser, sendFriendRequest } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { loginValidator, newRequestValidator, registerValidator, validationHandler } from "../lib/validators.js";

const app = express.Router();

app.post("/new",singleAvatar,registerValidator(),validationHandler,newUser)
app.post("/login",loginValidator(),validationHandler,login)

app.get("/myProfile",isAuthenticated,getMyProfile)
app.get("/logout",isAuthenticated,logOut)
app.get("/searchUser",isAuthenticated,searchUser)
app.put("/sendRequest",isAuthenticated,sendFriendRequest)
app.put("/acceptRequest",isAuthenticated,acceptFriendRequest)
app.get("/notifications",isAuthenticated,notifications)


export default app;