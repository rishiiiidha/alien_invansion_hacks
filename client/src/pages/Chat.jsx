import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const serverEndpoint = "http://localhost:5000"; // Ensure the URL is correct

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(serverEndpoint);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [serverEndpoint, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-gray-800 bg-opacity-80 text-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <ChatBox room={room} />
      
          <Messages messages={messages} name={name} />
       
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
