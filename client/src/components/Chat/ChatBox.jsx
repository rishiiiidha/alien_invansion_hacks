import React from "react";
import { MdOnlinePrediction } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const ChatBox = ({ room }) => {
  const name = room.toUpperCase();

  return (
    <div className="flex items-center justify-between bg-gray-950 rounded-t-md min-h-16 w-full no-scrollbar">
      <div className="flex items-center flex-1 ml-5 text-white">
        <MdOnlinePrediction className="text-5xl text-slate-400 mr-2" />
        <h3 className="text-2xl font-bold">{name}'S CHAT ROOM</h3>
      </div>
      <div className="flex justify-end flex-1 mr-5">
        <a href="/" className="text-gray-400 hover:text-gray-200">
          <IoCloseSharp className="text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default ChatBox;
