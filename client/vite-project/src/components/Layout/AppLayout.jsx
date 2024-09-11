import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Title from "../Shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/SampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params=useParams()
    const chatId = params.chatId;

    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault()
      console.log(e,_id,groupChat);
    }
    return (
      <div>
        <Title />
        <Header />
        {/* <Grid container height={"calc(100vh-4rem)"}> */}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ xs: "none", sm: "block" }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              // newMessageAlert={[{ chatId, count: 5 }]}
              // onlineUsers={["1","2"]}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "2rem",
              bgcolor: "pink",
            }}
            height={"100%"}
          >
            <Profile/>
          </Grid>
        </Grid>

        <Footer />
      </div>
    );
  };
};

export default AppLayout;
