import React from "react";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex ">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        className="border-none rounded-md p-5 w-4/5 text-lg focus:outline-none text-white bg-slate-950 opacity-50"
      />
      <button
        type="submit"
        className="bg-slate-600 text-white rounded-md text-center uppercase py-5 px-8 w-1/5"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
