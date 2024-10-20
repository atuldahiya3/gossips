import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { Request } from "../models/request.js";
import {NEW_REQUEST, REFETCH_CHATS} from "../constants/events.js"

//Creating a new user, saving it to database and save in cookies.
const newUser = async (req, res) => {
  const { name, userName, password, bio } = req.body;
  console.log(req.body);
  try {
    const avatar = {
      public_id: "aa",
      url: "aa",
    };
    const user = await User.create({
      name,
      bio,
      userName,
      password,
      avatar,
    });

    sendToken(res, user, 201, "user created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName }).select("+password");

    if (!user) {
      // return next(new Error("Invalid username"))
      return res.status(401).json({ message: "Invalid username" });
    }
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      // return next(new Error("Invalid password"))
      return res.status(401).json({ message: "Invalid password" });
    }

    sendToken(res, user, 200, `User logged in, ${user.name} BODMOSH IS BACK`);
  } catch (error) {
    console.log(error);
  }
};

const getMyProfile = async (req, res) => {
  const userDetail = await User.findById(req.user);

  res.status(200).json({
    success: true,
    data: userDetail,
  });
};

const logOut = async (req, res) => {
  return res
    .status(200)
    .cookie("gossips-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out",
    });
};
const searchUser = async (req, res) => {
  const { name="" } = req.query;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ success: false, message: "Invalid name" });
  }

  const myChats = await Chat.find({ groupChat: false, members: req.user });

  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  const users= allUsersExceptMeAndFriends.map((user)=>({...user, avatar:user.avatar.url}))

  return res.status(200).json({
    success: true,
    users,
  });
};

const sendFriendRequest=async(req,res)=>{
    const {userId}=req.body

    if (!userId){return  res.status(400).json({ success: false, message: "Please provide a valid user id" });}

    const request= await Request.findOne({
      $or:[
        {sender:req.user, reciever:userId},
        {sender:userId, reciever:req.user}
      ]
    })

    if(request) return res.status(400).json({message:"Request Already Sent"})

    await Request.create({
        sender:req.user,
        reciever:userId,
    })

    emitEvent(req,NEW_REQUEST, [userId])

    return res.status(200).json({
      success:true,
      message:"Request Sent Successfully"
    })
}

const acceptFriendRequest=async(req,res)=>{
  const {requestId,accept}=req.body
  const request= await Request.findById(requestId).populate("sender", "name").populate("reciever","name")
  if(!request)  return res.status(400).json({message:"Invalid Request"})
  if(request.sender.toString()!==req.user.toString() ) return res.status(400).json({message:"Your are not authorized to accept the request"})
  if(!accept){
    await request.deleteOne();
    res.status(200).json({
      message:"Friend Request Rejected"
    })
  }

  const members=  [request.sender._id, request.reciever._id]
  await Promise.all([
    Chat.create({members, name:`${sender.name}- ${reciever.name}`}),
    request.deleteOne()
  ])

  emitEvent(req,REFETCH_CHATS,  members)
  await request.save()
  res.status(200).json({
    success:true,
    message:"Request Accepted Successfully",
    sender:request.sender._id
  })

}

const notifications=async(req,res)=>{
  const myNotifications= await Request.find({sender:req.user}).populate("sender","name avatar")

  return  res.status(200).json({
    success:true,
    notifications:myNotifications
    })
}
export { login, newUser, getMyProfile, logOut, searchUser, sendFriendRequest, acceptFriendRequest, notifications };
