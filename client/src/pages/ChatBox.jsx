import React from "react";
import { MdOnlinePrediction } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const ChatBox = ({ room }) => {
  const name = room.toUpperCase();

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <MdOnlinePrediction className="text-3xl text-blue-400 mr-2" />
        <h3 className="text-xl">{`${name}'S CHAT ROOM`}</h3>
      </div>
      <div>
        <a href="/" className="text-gray-400 hover:text-gray-200">
          <IoCloseSharp className="text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default ChatBox;
