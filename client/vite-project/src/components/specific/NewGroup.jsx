import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, TextField, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { sampleNotifications, sampleUsers } from '../../constants/SampleData'
import { IoIosAdd } from 'react-icons/io'
import { FaCheck } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import UserItem from "../Shared/UserItem"
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupName=useInputValidation("")
  const [members,SetMembers]=useState(sampleUsers)
  const [selectedMembers,SetSelectedMembers]=useState("")
  const selectMemberHandler=(id)=>{
    SetSelectedMembers((prev)=> prev.includes(id)? prev.filter((currElement)=> currElement != id) : [...prev, id])
  }
  console.log("selected: ",selectedMembers);

  const submitHandler=()=>{
    console.log("submit")
  }
  const closeHandler=()=>{
    console.log("close dialog")
  }

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{xs:"1rem", sm:"2rem"}} maxWidth={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"} variant='H4'>New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography>Members:</Typography>
        <Stack>
        {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack direction={{xs:"column", sm:"row"}} justifyContent={"space-between"} >
          <GiCrossedSwords color='red' size={"2rem"} />
          <FaCheck color='green' size={"2rem"} onClick={()=>submitHandler()}/>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup