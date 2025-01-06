import jwt from "jsonwebtoken";

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
const socketAuthenticator=async(err,socket,next)=>{

}
export {isAuthenticated, socketAuthenticator}