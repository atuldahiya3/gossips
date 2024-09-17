import React, { memo } from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { StyledLink } from '../StylesComponents'
import AvatarCard from './AvatarCard'

const ChatItem = ({
    Avatar = ["https://www.w3schools.com/howto/img_avatar.png"],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChat,
}) => {
  return (
    <StyledLink sx={{padding:"0"}} to={`/chats/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
        <div style={{
            display:"flex",
            gap:"1rem",
            alignItems:"center",
            padding:"1rem",
            backgroundColor:sameSender? "#ff9999": "unset",
            color:sameSender? "white": "unset",
            position:"relative"
        }}>
            <AvatarCard avatar={Avatar} />
            <Stack>
                <Typography>{name}</Typography>
                {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}

            </Stack>
            {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
        </div>
    </StyledLink>
  )
}

export default memo(ChatItem)