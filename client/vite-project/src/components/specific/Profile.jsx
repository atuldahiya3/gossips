import { Avatar, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import moment from "moment"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import { server } from '../../constants/config'
import AvatarCard from '../Shared/AvatarCard'


const Profile = () => {
  const {user}=useSelector(state=>state.auth)
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={user?.avatar?.url}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      {/* <AvatarCard avatar={[user.avatar.url]}/> */}
      <ProfileCard heading={"Username"} text={user.userName}/>
      <ProfileCard heading={"Bio"} text={user.bio}/>
      <ProfileCard heading={"Name"} text={user.name}/>
      <ProfileCard heading={"Joined"} text={moment(user.createdAt).fromNow()}/>
      </Stack>
  )
}

const date= new Date();
const ProfileCard = ({ text, Icon, heading }) => (
    
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && Icon}
  
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );


export default Profile