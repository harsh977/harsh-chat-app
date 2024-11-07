import User from "../models/user.model.js";

export const getUsersforSidebar = async(req,res) => {
    try {
            const loggeduser=req.user._id;

            const allUsers = await User.find({ _id : { $ne: loggeduser}}).select("-password");

            res.status(200).json(allUsers);
    }catch(error){
        console.error("Error in getUsers for side bar");
        res.status(500).json({error:"internal server error"})
    }
}