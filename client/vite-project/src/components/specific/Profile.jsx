import { Avatar, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import moment from "moment"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import { server } from '../../constants/config'


const Profile = () => {
  const dispatch=useDispatch();
  // useEffect(()=>{
  //   axios.get(`${server}/user/myProfile`).then((res)=>{
  //     console.log("res",res);
  //   }).catch((err)=>dispatch(userNotExists()))
    
  // },[dispatch])
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Username"} text={"atuldahiya03"}/>
      <ProfileCard heading={"Bio"} text={"Software Dev Intern"}/>
      <ProfileCard heading={"Name"} text={"john Dahiya"}/>
      <ProfileCard heading={"Joined"} text={moment("2023-11-04T18:30:00.000Z").fromNow()}/>
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