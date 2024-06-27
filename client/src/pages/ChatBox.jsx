import React from "react";
import { MdOnlinePrediction } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const ChatBox = ({ room }) => {
  const name = room.toUpperCase();
  return (
    <div>
      <div>
        <MdOnlinePrediction />
        <h3>{`${name}'S CHAT ROOM`}</h3>
      </div>
      <div>
        <a href="/">
          <IoCloseSharp />
        </a>
      </div>
    </div>
  );
};

export default ChatBox;
