import React from "react";
import Message from "./Message";

const Messages = ({ messages, name }) => {
  return (
    <div className="overflow-y-auto h-96 no-scrollbar mt-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
