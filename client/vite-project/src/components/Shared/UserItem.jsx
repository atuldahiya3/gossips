import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemoveOutline } from "react-icons/io5";



const UserItem = ({ user, handler, isHandlerLoading, isAdded=false, styling={} }) => {
  const { _id, name, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar  />
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
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor:isAdded?"error.main" :"primary.main",
            color: "white",
            "&:hover": {
              bgcolor:isAdded?"error.dark" :"primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={isHandlerLoading}
        >

          {isAdded ? <IoPersonRemoveOutline/>: <IoMdPersonAdd />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
