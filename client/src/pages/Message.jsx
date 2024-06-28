import React from "react";

const Message = ({ message: { user, text }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = user.toLowerCase() === trimmedName;

  return (
    <div
      className={`flex ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-2 rounded-lg nax-w-sm ${
          isSentByCurrentUser
            ? "bg-slate-950 text-white self-end"
            : "bg-gray-800 text-white self-start"
        }`}
      >
        <p className="text-xs text-slate-700">{isSentByCurrentUser ? trimmedName : user}</p>
        <p >{text}</p>
      </div>
    </div>
  );
};

export default Message;
