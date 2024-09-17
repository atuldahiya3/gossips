import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from '../../constants/SampleData'
import { IoIosAdd } from 'react-icons/io'
import { FaCheck } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";



const Notifications = () => {

  const friendRequestHandler=({_id, accept})=>{
    console.log("request ");
  }

  return (
    <Dialog open>
      <Stack p={{xs:"1rem", sm:"2rem"}} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          sampleNotifications.length>0 ?
           <>
            {sampleNotifications.map((i)=><NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id}/>)}
           </>
            : 
          <Typography textAlign={"center"}>No notifications</Typography>
        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem=memo(({sender,_id, handler})=>{

  const {name, avatar}=sender
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        // {...styling}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack direction={{xs:"column", sm:"row"}} gap={"1rem"}>
          <FaCheck color='green' onClick={()=>handler({_id, accept:true})}/>
          <GiCrossedSwords color='red'  onClick={()=>handler({_id, accept:false})}/>
        </Stack>
        {/* <IconButton
          size="small"
          sx={{
            bgcolor:"primary.main",
            color: "white",
            "&:hover": {
              bgcolor:"primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={isHandlerLoading}
        >
          <IoIosAdd />
        </IconButton> */}
      </Stack>
    </ListItem>
  );
})

export default Notifications