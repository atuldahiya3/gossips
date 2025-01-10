import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.js";
import { GOSSIPS_TOKEN } from "../constants/config.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies['gossips-token'];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Please login to continue' 
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken._id;
      next();
    } catch (jwtError) {
      // Handle specific JWT errors
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Session expired, please login again'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Invalid token, please login again'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};
const socketAuthenticator=async(res,err,socket,next)=>{
  try{
    if(err){
      return;
    };
    const authToken=socket.request.cookies[GOSSIPS_TOKEN]
    console.log("auth token",authToken);
    if(!authToken){
      console.log("please continue to login");
      return res.status(401).json({ 
        success: false,
        message: 'Please login to continue' 
      });
    }
    
    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if(!user){
      console.log("please continue to login");
      return res.status(401).json({ 
        success: false,
        message: 'Please login to continue' 
      });
    }
    socket.user=user;
    
  }catch(e){
    console.log("error socket authenticating",e);
  }
}
export {isAuthenticated, socketAuthenticator}