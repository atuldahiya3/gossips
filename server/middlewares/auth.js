import jwt from "jsonwebtoken";

const isAuthenticated=(req,res,next)=>{
    try {
        const token = req.cookies['gossips-token']; // Get token from cookies
        if (!token) {
          // If no token is found, return a 401 Unauthorized response
          return res.status(401).json({ message: 'Please login to continue' });
        }
        console.log('Token:', token);
        console.log('JWT Secret:', process.env.JWT_SECRET);
        // Verify the token with JWT secret
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
        // If token is successfully verified, log and proceed
        console.log('Decoded token:', decodedToken);
    
        // You can also attach the decoded token to the request object
        req.user = decodedToken._id;
    
        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        // If token verification fails, return a 403 Forbidden response
        return res.status(401).json({ message: 'Please login to access this route', error });
      }
}

export {isAuthenticated}