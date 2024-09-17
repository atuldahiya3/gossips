import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useInputValidation} from "6pp"
import { CiSearch } from "react-icons/ci";
import { sampleUsers } from '../../constants/SampleData';
import UserItem from '../Shared/UserItem';

const users=[]
const Search = () => {
  let isLoadingSendFriendRequest=false;
  const addFriendHandler=(id)=>{
    console.log(IDBFactory);
  }
  const search = useInputValidation("");
  const [users, setUsers] = useState(sampleUsers)

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CiSearch />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search