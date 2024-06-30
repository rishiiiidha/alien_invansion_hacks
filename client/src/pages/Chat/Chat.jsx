import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import ChatBox from "../../components/Chat/ChatBox";
import ChatInput from "../../components/Chat/ChatInput";
import Messages from "../../components/Chat/Messages/Messages";

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
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-between rounded-lg h-3/5 w-[400px] md:w-3/5 sm:w-full bg-white border-none bg-opacity-10 border border-gray-200 backdrop-blur-lg">
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
