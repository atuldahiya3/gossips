import express from "express"
import { logOut, login, newUser, searchUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new",singleAvatar,newUser)
app.post("/login",login)

app.get("/myProfile",isAuthenticated,getMyProfile)
app.get("/logout",isAuthenticated,logOut)
app.get("/searchUser",isAuthenticated,searchUser)

export default app;