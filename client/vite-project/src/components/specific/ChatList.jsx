import { Stack } from '@mui/material';
import React from 'react'
import ChatItem from '../Shared/ChatItem';

const ChatList = (
    {

      w = "100%",
      chats = [],
      chatId = "",
      onlineUsers = [],
      newMessageAlert = [{ chatId: "", count: "" }],
      handleDeleteChat
    },
  ) => {
    return (
      
        <Stack width={w} direction="column" overflow={"auto"}  sx={{ height: "100%" }}>
          {chats?.map((data,index) =>{
            const { avatar, _id, name, groupChat, members}=data;
            const newMessagesAlert=newMessageAlert.find(
                ({chatId})=> chatId === _id
            )
            const isOnline=members?.some((member)=>onlineUsers.includes(_id))
              return <ChatItem 
              index={index}
              newMessageAlert={newMessagesAlert}
              avatar={avatar}
              isOnline={isOnline}
              name={name}
              key={_id}
              _id={_id}
              groupChat={groupChat}
              sameSender={chatId===_id}
              handleDeleteChat={handleDeleteChat}
              />
          })}
        </Stack>
  
    );
  };

export default ChatList