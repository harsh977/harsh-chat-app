import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup= async (req,res)  =>{
    try{
        const{fullName,username,password,confirmPassword,gender} = req.body;
        if(password!=confirmPassword){
            return res.status(400).json({error:"password donot match"});
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({error:"User already exists"});
        }
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?usearname={username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username={username}`

        const salt= await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password,salt);
        const newUser=new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender==="male"?boyProfilePic:girlProfilePic
        })
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic,
            gender:gender
        })
    }catch(error){
        console.log("Error in signup")
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login= async (req,res)  =>{
    try{
        const {username,password} = req.body;
        const user= await User.findOne({username});
        const iscorrect = await bcryptjs.compare(password,user?user.password:"");
        if(!user || !iscorrect){
            return res.status(400).json({error :"Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
    }catch(error){
        console.log("Error in login")
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout=(req,res)  =>{
        try{
            res.cookie("jwt","",{maxAge:0});
            res.status(200).json({message:"logged out successfully  "})
        }catch(error){
            console.log("Error in login")
            res.status(500).json({error:"Internal Server Error"});
        }
}

