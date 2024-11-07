import Conversation from "../models/conversation.model.js";
import Message from "../models/messagemodel.js";

export const sendMessage = async(req,res) =>{
    try{
        const {message}= req.body;
        const {id:receiver_id} =req.params;
        const sender_id=req.user._id;

       
        const convo= await Conversation.findOne({
            participants : {$all : [sender_id,receiver_id
            ]}
        })

        if(!convo){
            convo = await Conversation.create({
                participants:[sender_id,receiver_id]
            })
        }

        const newMessage= new Message({senderId:sender_id, receiverId:receiver_id,message:message})
        if(newMessage){
            convo.messages.push(newMessage._id)
        }else{
            res.status(500).json({error:"message not created"})
        }

        newMessage.save();    
        convo.save();
        res.status(200).json({message:"message sent"})
        
    }catch(error){
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: receiver_id } = req.params;
        const sender_id = req.user._id;

        // Ensure to await the asynchronous call
        const messages1 = await Conversation.findOne({
            participants: { $all: [sender_id, receiver_id] }
        }).populate("messages");
        if(!conversation) return res.status(200).json([]);
        // Send the response and ensure the function exits
        return res.status(200).json(messages1.messages);
    } catch (error) {
        // Send an error response
        res.status(500).json({ error: error.message });
    }
};
