import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("victim");

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-alien-invasion bg-cover bg-center">
      <div className="text-center bg-gray-900 bg-opacity-80 rounded-md backdrop-filter backdrop-blur-lg border border-slate-500 p-6 text-white w-96">
        <h1 className="text-4xl mb-4 font-extrabold text-white">
          Welcome to Alien Invasion Guide
        </h1>
        <p className="mb-4 text-center">
          Join as a survivor or rescuer to interact with others and survive the
          invasion.
        </p>
        <div className="mb-4">
          <input
            type="text"
            className="p-3 w-full border rounded-md bg-gray-800 text-white placeholder-gray-500"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <select
            className="p-3 w-full border rounded-md bg-gray-800 text-white"
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="victim">Survivor</option>
            <option value="rescuer">Rescuer</option>
          </select>
        </div>
        <NavLink
          onClick={(e) => {
            !name && e.preventDefault();
          }}
          to={`/chat-room?name=${name}&room=${room}`}
        >
          <button className="bg-slate-950 w-full text-white font-bold py-3 px-16 rounded-md">
            Enter Room
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Join;
