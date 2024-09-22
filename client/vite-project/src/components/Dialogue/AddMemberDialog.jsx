import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/SampleData";
import UserItem from "../Shared/UserItem";
import { GiCrossedSwords } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
//   const addFriendHandler = (id) => {
//     console.log(id, chatId);
//   };

  const addMemberSubmitHandler=()=>{
    closeHandler();
    console.log("added all members");
  }

  const [members,SetMembers]=useState(sampleUsers)
  const [selectedMembers,SetSelectedMembers]=useState("")
  const selectMemberHandler=(id)=>{
    SetSelectedMembers((prev)=> prev.includes(id)? prev.filter((currElement)=> currElement != id) : [...prev, id])
  }

  const closeHandler=()=>{
    SetSelectedMembers([])
    SetMembers([])
  }
  return (
    <Dialog open onClose={closeHandler}>
      <Stack padding={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem key={i.id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
        >
          <Button onClick={closeHandler}>
            <GiCrossedSwords color="red" size={"2rem"} />
          </Button>
          <Button disabled={isLoadingAddMember} onClick={addMemberSubmitHandler}>
            <FaCheck color="green" size={"2rem"} />
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
