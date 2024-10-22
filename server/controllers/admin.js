import { Chat } from "../models/chat.js"
import { Message } from "../models/message.js";
import { User } from "../models/user.js"

const allUsers = async (req, res) => {
    try {
      const users = await User.find({});
  
      const transformedUsers = await Promise.all(
        users.map(async ({ name, username, avatar, _id }) => {
          const [groups, friends] = await Promise.all([
            Chat.countDocuments({ groupChat: true, members: _id }),
            Chat.countDocuments({ groupChat: false, members: _id }),
          ]);
  
          return {
            name,
            username,
            avatar: avatar.url,
            _id,
            groups,
            friends,
          };
        })
      );
  
      res.status(200).json({
        success: true,
        data: transformedUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

const allChats= async(req,res)=>{
    try{
        const chats=await Chat.find({}).populate("members","name avatar").populate("creator","name avatar")

        res.status(200).json({
            success: true,
            data: chats,
          });
    }catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const allMessages= async(req,res)=>{
    try{
        const messages= await Message.find({}).populate("sender","name avatar").populate("chat","groupChat")

        res.status(200).json({
            success: true,
            data: messages,
          });
    }catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getDashboardStats=async(req,res)=>{
    try{

    }catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export {allUsers,allChats, allMessages,getDashboardStats}