import express from "express"
import { acceptFriendRequest, getMyFriends, logOut, login, newUser, notifications, searchUser, sendFriendRequest } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { loginValidator, newRequestValidator, registerValidator, validationHandler } from "../lib/validators.js";
import cookieParser from "cookie-parser";

const app = express.Router();
app.use(cookieParser());
app.post("/new",singleAvatar,registerValidator(),validationHandler,newUser)
app.post("/login",loginValidator(),validationHandler,login)

app.get("/myProfile",isAuthenticated,getMyProfile)
app.get("/logout",isAuthenticated,logOut)
app.get("/searchUser",isAuthenticated,searchUser)
app.put("/sendRequest",isAuthenticated,sendFriendRequest)
app.put("/acceptRequest",isAuthenticated,acceptFriendRequest)
app.get("/notifications",isAuthenticated,notifications)
app.get("/friends",isAuthenticated,getMyFriends)


export default app;