import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { getOtherMembers } from "../lib/helper.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";

const newGroupChat = async (req, res, next) => {
  try {
    const { name, members } = req.body;
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");

    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
      const otherMember = getOtherMembers(members, req.user);

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar?.url) // Handle missing avatars
          : [otherMember?.avatar?.url], // Handle missing otherMember or avatar
        name: groupChat ? name : otherMember?.name, // Handle missing name
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
  } catch (error) {
    console.error("Error in getMyChats:", error.message); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};

const getMyGroups = async (req, res, next) => {
  try {
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
      members
    }));

    return res.status(200).json({
      status: 200,
      groups: groups,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { chatId, members } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat)
      return res.status(404).json({ status: 404, message: "Chat not found" });
    if (!members)
      return res
        .status(400)
        .json({ status: 400, message: "Please provide members" });
    if (!chat.groupChat)
      return res
        .status(400)
        .json({ status: 400, message: "Please select a group chat" });
    if (chat.creator.toString() !== req.user.toString())
      return res
        .status(403)
        .json({ status: 403, message: "You can not add members" });

    const allNewMembersPromise = members.map((id) => {
      return User.findById(id, "name");
    });

    if (chat.members.length > 100)
      return res
        .status(400)
        .json({ status: 400, message: "Maximum 100 members allowed" });

    const allNewMembers = await Promise.all(allNewMembersPromise);

    chat.members.push(...allNewMembers.map((member) => member._id));

    const allMembers = allNewMembers.map((member) => member.name).join(",");

    await chat.save();

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allMembers} have been added to the group`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(201).json({
      status: 201,
      message: "Member added successfully",
      newMembers: allMembers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const [chat, user] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId),
    ]);

    if (!chat)
      return res.status(404).json({ status: 404, message: "Chat not found" });
    if (!chat.members.includes(user._id))
      return res.status(404).json({ status: 404, message: "Member not found" });
    if (!chat.groupChat)
      return res
        .status(400)
        .json({ status: 400, message: "Please select a group chat" });
    if (chat.creator.toString() !== req.user.toString())
      return res
        .status(403)
        .json({ status: 403, message: "You can not remove members" });

    chat.members = chat.members.filter(
      (member) => member.toString() !== user._id.toString()
    );

    await chat.save();

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${user.name} has been removed from the group`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      status: 200,
      message: "Member removed successfully",
      removedMember: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const leaveGroup = async (req, res) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res.status(404).json({ status: 404, message: "Chat not found" });
    if (!chat.groupChat)
      return res
        .status(400)
        .json({ status: 400, message: "Please select a group chat" });

    const remainingMembers = chat.members.filter(
      (member) => member.toString() !== req.user._id
    );

    if (chat.creator.toString() === req.user._id) {
      chat.creator = remainingMembers[0];
    }

    chat.members = remainingMembers;

    await chat.save();

    emitEvent(req, ALERT, chat.members, "You left the group");

    return res.status(200).json({
      status: 200,
      message: "Group left successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendAttachment = async (req, res) => {
  try {
    const { chatId } = req.body;
    const [chat, user] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.user, "name"),
    ]);

    if (!chat)
      return res.status(400).json({ status: 400, message: "Chat not found" });

    const files = req.files || [];

    if (files.length > 5)
      return res
        .status(400)
        .json({ status: 400, message: "You can send maximum 5 files at once" });
    if (files.length < 1)
      return res
        .status(400)
        .json({ status: 400, message: "Please select a file to send" });

    // Logic to handle attachments should be added here

    const messageForDb = {
      content: " ",
      attachments: [],
      sender: user,
      chat: chatId,
    };

    const messageForRelTime = {
      ...messageForDb,
      sender: {
        _id: user._id,
        name: user.name,
      },
    };

    const message = await Message.create(messageForDb);

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
      message: messageForRelTime,
      chatId,
    });
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

    res.status(200).json({
      status: 200,
      message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChatDetails = async (req, res) => {
  try {
    if (req.query.populate === "true") {
      const chats = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();

      if (!chats)
        return res.status(404).json({ status: 404, message: "Chat not found" });

      chats.members = chats.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
      }));

      res.status(200).json({
        success: true,
        chats,
      });
    } else {
      const chats = await Chat.findById(req.params.id);
      if (!chats)
        return res.status(404).json({ status: 404, message: "Chat not found" });

      res.status(200).json({
        success: true,
        chats,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const renameGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({ status: 404, message: "Chat not found" });
    if (!chat.groupChat)
      return res
        .status(400)
        .json({ status: 400, message: "This is not a group chat" });

    if (chat.creator.toString() !== req.user.toString())
      return res
        .status(403)
        .json({ status: 403, message: "Only admin can edit chat name" });

    chat.name = groupName;
    await chat.save();
    emitEvent(req, REFETCH_CHATS, chat.members);
    return res.status(200).json({
      status: 200,
      message: "Group renamed successfully",
      updatedChat: chat,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    if (!chat)
      return res.status(404).json({ status: 404, message: "Chat not found" });

    if (chat.groupChat && chat.creator.toString() !== req.user.toString())
      return res
        .status(403)
        .json({ status: 403, message: "You are not allowed to delete chat" });
    if (!chat.groupChat && !chat.members.includes(req.user.toString()))
      return res
        .status(403)
        .json({ status: 403, message: "You are not allowed to delete chat" });

    const messageWithAttachments = await Message.find({
      chat: chatId,
      attachment: { $exists: true, $ne: null },
    });
    const public_ids = [];
    messageWithAttachments.forEach(({ attachments }) => {
      attachments.forEach((public_id) => {
        public_ids.push(public_id);
      });
    });

    await Promise.all([
      deleteFilesFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      status: 200,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    if (!chat)
      return res.status(404).json({ status: 404, message: "Chat not found" });
    const { page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    const [messages, totalMessageCount] = await Promise.all([
      Message.find({ chat: chatId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessageCount / limit);

    return res.status(200).json({
      status: 200,
      message: messages.reverse(),
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMember,
  removeMember,
  leaveGroup,
  sendAttachment,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
};
