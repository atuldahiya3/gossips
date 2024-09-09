import { Stack } from '@mui/material';
import React from 'react'
import ChatItem from '../Shared/ChatItem';

const ChatList = (
    {
      w = "100%",
      chats = [],
      chatId = "",
      onlineUsers = [],
      newMessages = { chatId: "", count: "" },
    },
    handleDeleteChat
  ) => {
    return (
      
        <Stack width={w} direction="column">
          {chats?.map((data) =>{
              return <ChatItem/>
          })}
        </Stack>
  
    );
  };

export default ChatList