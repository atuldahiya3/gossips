import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, TextField, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { sampleNotifications, sampleUsers } from '../../constants/SampleData'
import { IoIosAdd } from 'react-icons/io'
import { FaCheck } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import UserItem from "../Shared/UserItem"
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewGroup } from '../../redux/reducers/misc';
import { useCreateGroupMutation, useMyFriendsQuery } from '../../redux/api/api';
import toast from 'react-hot-toast';

const NewGroup = () => {
  const dispatch=useDispatch()
  const groupName=useInputValidation("")
  const {isNewGroup}=useSelector((state)=>state.misc)
  const {data,error,isLoading,isError}=useMyFriendsQuery();
  const [createGroup]=useCreateGroupMutation();
  const [members,setMembers]=useState([])
  const [selectedMembers,setSelectedMembers]=useState("")
  const selectMemberHandler=(id)=>{
    setSelectedMembers((prev)=> prev.includes(id)? prev.filter((currElement)=> currElement != id) : [...prev, id])
  }
  console.log("selected: ",selectedMembers);
  console.log("name",groupName);
  const submitHandler=()=>{
    const data={
      "name":groupName.value,
      "members":selectedMembers
    }
    console.log("data sending",data)
    createGroup(data).then(({data,error})=>{
      if(error){
        console.log(error);
        toast.error(error.data.error[0])
      }else{
        toast.success(data.message)

      }
    }).catch((e)=>{console.log(e);})
  }
  const closeHandler=()=>{
    dispatch(setIsNewGroup(false))
    console.log("close dialog")
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{xs:"1rem", sm:"2rem"}} maxWidth={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"} variant='H4'>New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography>Members:</Typography>
        <Stack>
        {data?.friends.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack direction={{xs:"column", sm:"row"}} justifyContent={"space-between"} >
          <GiCrossedSwords color='red' size={"2rem"} onClick={closeHandler} />
          <FaCheck color='green' size={"2rem"} onClick={()=>submitHandler()}/>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup