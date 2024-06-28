import React from "react";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(e);
  };

  return (
    <form onSubmit={handleSubmit} className=" flex fixed bottom-[150px] left-1/2 transform -translate-x-1/2 bg-gray-950  w-[640px]  ">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        className="py-6 px-10  bg-gray-800 text-white w-full"
      />
      <button type="submit" className="bg-slate-950 text-white font-bold py-2 px-4 ">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
