import React from 'react'
import Message from './Message'
import MessageInput from './MessageInput'

const Messages = () => {
  return (
    <div className='px-4 flex-1 overflow-auto no-scrollbar'>
        <div>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        </div>
        <MessageInput />
        
    </div>
    
  )
}

export default Messages