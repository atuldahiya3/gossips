import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import {compare} from "bcrypt";

//Creating a new user, saving it to database and save in cookies.
const newUser = async (req, res) => {

    const {name, userName, password, bio}= req.body;
    console.log(req.body);
    try {
        const avatar = {
            public_id: "aa",
            url: "aa"
        };
        const user = await User.create({
            name,
            bio,
            userName,
            password,
            avatar
        });

        sendToken(res, user, 201, "user created");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const login=async(req,res)=>{
    const {userName,password}=req.body;
    const user=await User.findOne({userName}).select("+password")
    
    if (!user){
        return res.status(401).json({message:"Invalid username"})
    }
    const isPasswordMatch= await compare(password, user.password)

    if (!isPasswordMatch){
        return res.status(401).json({message:"Invalid password"})
    }

    sendToken(res, user, 200, `User logged in, ${user.name} BODMOSH IS BACK`);
}

const getMyProfile=(req,res)=>{
    
}

export {login,newUser}