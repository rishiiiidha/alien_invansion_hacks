import React from "react";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
