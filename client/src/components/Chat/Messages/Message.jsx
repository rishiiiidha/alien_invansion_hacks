import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = user.toLowerCase() === trimmedName;

  return (
    <div
      className={`flex ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      } p-2`}
    >
      {isSentByCurrentUser ? (
        <>
          <p className="sentText pr-10 text-gray-500">{trimmedName}</p>
          <div className="messageBox bg-slate-950 rounded-lg p-2 text-white max-w-xs">
            <p className="messageText">{ReactEmoji.emojify(text)}</p>
          </div>
        </>
      ) : (
        <>
          <div className="messageBox bg-slate-950 rounded-lg  p-2 text-gray-50 max-w-xs">
            <p className="messageText">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10 text-gray-500">{user}</p>
        </>
      )}
    </div>
  );
};

export default Message;
