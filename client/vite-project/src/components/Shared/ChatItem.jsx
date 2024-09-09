import React, { memo } from 'react'
import { Stack, Typography } from '@mui/material'
import { StyledLink } from '../StylesComponents'

const ChatItem = ({
    Avatar="",
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessage,
    index=0,
    handleDeleteChatOpen,
}) => {
  return (
    <StyledLink to={`/chats/${_id}`} onContextMenu={(e)=>handleDeleteChatOpen(e,_id,groupChat)}>
        <div style={{
            display:"flex",
            gap:"1rem",
            alignItems:"center",
            padding:"1rem",
            backgroundColor:sameSender? "black": "unset",
            color:sameSender? "white": "unset",
            position:"relative"
        }}>
            {/* Avatar Card */}
            <Stack>
                <Typography>{name}</Typography>
                {
                    newMessage && (
                        <Typography>{`New Message (${newMessage.count})`}</Typography>
                    )
                }

            </Stack>
            {
            isOnline && (<Box sx={{
                height:"10px",
                Width:"10px"
            }}/>)
            }
        </div>
    </StyledLink>
  )
}

export default memo(ChatItem)