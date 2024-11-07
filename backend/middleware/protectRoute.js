import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute= async (req,res,next) => {
    try{
        const token= req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"unauthorized"});
        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"unauthorized Invalid token"});
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({error:"unauthorized Invalid token"});
        }

        req.user=user;

        next();
        }
    catch(error){
        console.log("error in middleware");
        res.status(500).json({error:"Internal server error"});
    }
} 

export default protectRoute;