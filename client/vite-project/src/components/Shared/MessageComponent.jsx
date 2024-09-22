import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/colour";
import moment from "moment";
import { fileFormat } from "../../lib/Festures";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, attachments = [], content, createdAt } = message;
  const sameSender = sender?._id == user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        width: "fit-content",
        padding: "8px",
        borderRadius: "20px",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments.length > 0 && (
        attachments.map((attachment,index)=>{
            const url=attachment.url;
            const file=fileFormat(url);
            console.log("file type",file);
            console.log("url",url);
            return (
                <Box key={index}>
                    <a
                        href={url}
                        target="_blank"
                        download
                        style={{color:"black"}}
                    >
                        {RenderAttachment(file,url)}
                    </a>
                </Box>
            )
        }))}
      <Typography variant="caption" color="text.secondary">
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
