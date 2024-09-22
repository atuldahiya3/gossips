import React from "react";
import { transformImage } from "../../lib/Festures";
import { MdOutlineFileOpen } from "react-icons/md";


const RenderAttachment = (file, url ) => {
console.log("inside render", file);
  switch (file) {
    
      case "image":
          return <img
          src={transformImage(url,200)}
          alt="attachment"
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
        />;
      case "video":
          return <video src={url} preload="none" width={"200px"} controls />;
  
      
      case "audio":
          return  <audio src={url} preload="none" controls />;
        
    default:
      return <MdOutlineFileOpen/>;
  }
};

export default RenderAttachment;
