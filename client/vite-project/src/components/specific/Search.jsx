import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { CiSearch } from "react-icons/ci";
import { sampleUsers } from "../../constants/SampleData";
import UserItem from "../Shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";

const users = [];
const Search = () => {
  const dispatch = useDispatch();
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const { isSearch } = useSelector((state) => state.misc);
  let isLoadingSendFriendRequest = false;
  const addFriendHandler = (id) => {
    const data = {
      userId: id,
    };
    sendFriendRequest(data)
      .then(({data,error}) => {
        if(error){
          toast.error(error.data.message)
        }else{
          toast.success(data.message)
          isLoadingSendFriendRequest=true;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);
  const closeHandler = () => {
    dispatch(setIsSearch(false));
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (search.value !== "") {
        searchUser(search.value)
          .then(({ data }) => {
            setUsers(data.users);
            console.log("data", data);
          })
          .catch((e) => console.log(e));
      }
      console.log("searched kayword", search.value);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={closeHandler}>
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
  );
};

export default Search;
