import { User } from "../models/user.js";

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
            name: "aaaa",
            userName: "aaaa",
            password: "aaaa",
            avatar
        });

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const login=(req,res)=>{
    res.send("hello world")
}

export {login,newUser}