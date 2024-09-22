import React, { useRef } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { grayColour, lightPink, orange } from "../constants/colour";
import { TiAttachment } from "react-icons/ti";
import { IoSendSharp } from "react-icons/io5";
import { InputBox } from "../components/StylesComponents";
import FileMenu from "../components/Dialogue/FileMenu";
import { sampleMessage } from "../constants/SampleData";
import MessageComponent from "../components/Shared/MessageComponent";

function Chat() {
  const containerRef = useRef(null);
  const user={
    _id:"sdfsdfsdf",
    user:"Atul D"
  }
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={lightPink}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {sampleMessage.map((i)=>(
          <MessageComponent key={i._id} message={i} user={user}/>
        ))}
      </Stack>
      <form style={{ height: "10%" }}>
        <Stack
          direction={"row"}
          height={"100%"}
          bgcolor={lightPink}
          alignItems={"center"}
          paddingLeft={"1rem"}
        >
          <InputBox placeholder="Type message here..." />
          <IconButton sx={{ position: "absolute" }} >
            <TiAttachment size={"2.5rem"} />
          </IconButton>
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              padding: "10px",
              margin: "0.5rem",
              "&:hover": { bgcolor: "error.dark"},
            }}
          >
            <IoSendSharp size={"2rem"} />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
}

export default AppLayout()(Chat);
