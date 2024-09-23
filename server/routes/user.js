import express from "express"
import { login } from "../controllers/user.js";

const app = express.Router();

app.post("/new",login)
app.post("/",login)

export default app;