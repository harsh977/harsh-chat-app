import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import MessageInput from "./MessageInput";



const MessageContainer = () => {
	const {selectedConversation,setSelectedConversation}=useConversation();
	
	useEffect(() => {
		return () => setSelectedConversation(null)
	},[setSelectedConversation])
	if(selectedConversation){
		return (
			<div className='md:min-w-[450px] flex flex-col'>
				<>
					{}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					
					<Messages />
					<MessageInput />
					
					
				</>
			</div>
			);
	}else{
		return (
			<div>
				{NoChatSelected()}
				
			</div>
		)
	}

	
};

const NoChatSelected = () => {
	const {authUser,setAuthUser}= useAuthContext();
	console.log(authUser);
	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				{console.log(authUser)}
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				
			</div>
		</div>
	);
};
export default MessageContainer;