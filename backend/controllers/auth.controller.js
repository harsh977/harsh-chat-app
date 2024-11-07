import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username={username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girld?username={username}`

        const salt= await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password,salt);
        const newUser=new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender==="male"?boyProfilePic:girlProfilePic
        })
        generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName
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

        res.status(200).json({
            _id:user._id
        })
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

