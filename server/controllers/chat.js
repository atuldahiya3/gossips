import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { getOtherMembers } from "../lib/helper.js";
import { User } from "../models/user.js";

const newGroupChat = async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return res.status(400).json({
      message: "Select 2  or more members to create a group chat",
    });
  }

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group chat`);
  emitEvent(req, REFETCH_CHATS, members);

  res.status(201).json({
    status: 201,
    message: "Group Created",
  });
};
const getMyChats = async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    // "_id"
    "name avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMembers(members, req.user);
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });
  res.status(200).json({
    status: 200,
    chats: transformedChats,
  });
};

const getMyGroups = async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));
  return res.status(200).json({
    status: 200,
    groups: groups,
  });
};

const addMember=async(req,res)=>{
  const {chatId, members}=req.body
  const chat= await Chat.findById(chatId)

  
  if(!chat) return  res.status(404).json({status:404,message:"Chat not found"})
  if (!members) return  res.status(400).json({ status: 400, message: "Please provide members" });
  if(!chat.groupChat) return  res.status(404).json({status:400,message:"Please select a group chat"})
  if(chat.creator.toString() !== req.user.toString()) return  res.status(403).json({status:400,message:"You can not add members"})
  const allNewMembersPromise=members.map((id)=>{
    return User.findById(id, "name")
  })
  if(chat.members.length>100) return   res.status(400).json({status:400,message:"Maximum 100 members allowed"})

  const allNewMembers=await Promise.all(allNewMembersPromise)
  chat.members.push(...allNewMembers.map((member)=>member._id))

  const allMembers= allNewMembers.map((member)=>member.name).join(",")

  await chat.save();


  emitEvent(req, ALERT, chat.members, `${allNewMembers} have been added to the group`)
  emitEvent(req,REFETCH_CHATS, chat.members)

  return res.status(201).json({
    status:201,
    message:"Member added successfully",
    newMembers:allMembers
  })
}

export { newGroupChat, getMyChats, getMyGroups, addMember };
