import React from 'react';

function Chat({ message }) {
  const creatAt=new Date(message.createdAt);
  const formattedTime=creatAt.toLocaleDateString([],{
    hour:"2-digit",
    day:"2-digit"
  });
  const authUser = JSON.parse(localStorage.getItem("chatapp")); // Fallback for safety
  console.log(message.senderId,"user",authUser.user.id)
  const itsMe = message.senderId === authUser.user.id;
  const chat = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-800"; // Assign default colors for both cases

  return (
    <div>
      <div className='py-4'>
      <div className={`chat ${chat}`}>
        <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
        <div className='chat-footer text-slate-200'>{formattedTime}</div>
      </div>
      </div>
    </div>
  );
}

export default Chat;
