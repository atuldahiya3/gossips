const fileFormat = (url) => {
  const fileExtension = url.split(".").pop();

  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";
  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";
  if (
    fileExtension === "jpg" ||
    fileExtension === "png" ||
    fileExtension === "jpeg" ||
    fileExtension === "gif"
  )
    return "image";
  return "file";
};

const transformImage=(url='',width="200")=>{
    return url;
}

export { fileFormat, transformImage };
