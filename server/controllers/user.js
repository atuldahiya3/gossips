import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import { compare } from "bcrypt";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";

// Creating a new user, saving it to the database, and saving in cookies
const newUser = async (req, res) => {
  try {
    const { name, userName, password, bio } = req.body;

    const file=req.file
    const result=await uploadFilesToCloudinary([file])
    const avatar = {
      public_id: result[0].public_id,
      url: result[0].sequreUrl,
    };
    const user = await User.create({
      name,
      bio,
      userName,
      password,
      avatar,
    });

    sendToken(res, user, 201, "User created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    sendToken(res, user, 200, `User logged in, ${user.name} is back!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const userDetail = await User.findById(req.user);

    res.status(200).json({
      success: true,
      data: userDetail,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie('gossips-token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return res
      .status(200)
      .cookie("gossips-token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const { name = "" } = req.query;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ success: false, message: "Invalid name" });
    }

    const myChats = await Chat.find({ groupChat: false, members: req.user });

    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUsersFromMyChats },
      name: { $regex: name, $options: "i" },
    });

    const users = allUsersExceptMeAndFriends.map((user) => ({
      ...user.toObject(),
      avatar: user.avatar.url,
    }));

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Please provide a valid user id" });
    }

    const request = await Request.findOne({
      $or: [
        { sender: req.user, reciever: userId },
        { sender: userId, reciever: req.user },
      ],
    });

    if (request) return res.status(400).json({ message: "Request Already Sent" });

    await Request.create({
      sender: req.user,
      reciever: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId]);

    return res.status(200).json({
      success: true,
      message: "Request Sent Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("reciever", "name");

    if (!request) return res.status(400).json({ message: "Invalid Request" });
    if (request.reciever._id.toString() !== req.user.toString()) {
      return res.status(400).json({ message: "You are not authorized to accept the request" });
    }

    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({
        message: "Friend Request Rejected",
      });
    }

    const members = [request.sender._id, request.reciever._id];
    await Promise.all([
      Chat.create({ members, name: `${request.sender.name} - ${request.reciever.name}` }),
      request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);
    return res.status(200).json({
      success: true,
      message: "Request Accepted Successfully",
      sender: request.sender._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const notifications = async (req, res) => {
  try {
    const myNotifications = await Request.find({ sender: req.user }).populate("sender", "name avatar");

    return res.status(200).json({
      success: true,
      notifications: myNotifications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyFriends = async (req, res) => {
  try {
    const chatId=req.query.chatId
    const chats = await Chat.find({ members: req.user, groupChat: false })
      .populate("members", "name avatar");

    console.log("chats", chats);

    const friends = chats.map(({ members }) => {
      const otherUsers = members.filter((member)=> member._id.toString() !== req.user.toString())
      return {
        _id: otherUsers[0]._id,
        name: otherUsers[0].name,
        avatar: otherUsers[0].avatar.url,
      };
    });

    if(chatId){
      const chat= await Chat.findById(chatId)

      const availableFriends=friends.filter((friend)=>!chat.members.includes(friend._id))
      res.status(200).json({
        status: 200,
        availableFriends,
      });
    }else{
      res.status(200).json({
        status: 200,
        friends,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export { login, newUser, getMyProfile, logOut, searchUser, sendFriendRequest, acceptFriendRequest, notifications, getMyFriends };
