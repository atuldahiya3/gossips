import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "gossips" })
    .then((data) => {console.log(`connected to database: ${data.connection.host}`)})
    .catch((err) => {
      throw err;
    });
};

const cookieOptions={
  maxAge:15*24*60*60*1000,
  sameSite:"none",
  secure:true,
  httpOnly:true
}
const sendToken=(res, user, code, message)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)

    return res.status(code).cookie("gossips-token",token,cookieOptions).json({
      success:true, 
      token, 
      message,
      user
    })
}

const emitEvent=(req,event,users,data)=>{
  console.log("event emitted");
}

export {connectDB, sendToken,cookieOptions,emitEvent}