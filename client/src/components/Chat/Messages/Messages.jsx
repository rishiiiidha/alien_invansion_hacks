import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages p-[5%_0] overflow-auto flex-auto no-scrollbar">
    {messages.map((message, index) => (
      <div key={index} className="mb-4 ">
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
