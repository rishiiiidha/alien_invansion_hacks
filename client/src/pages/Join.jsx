import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState("victim");

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => {
           return setName(e.target.value);
          }}
        />
      </div>
      <div>
        <select
          onChange={(e) => {
           return setRoom(e.target.value)
          }}
        >
          <option value="victim">Victim</option>
          <option value="rescuer">Rescuer</option>
        </select>
      </div>
      <NavLink onClick={(e) => {
        (!name) ? e.preventDefault() : null
      }} to={`/chat-room?name=${name}&room=${room}`}>
        <button>Enter Room</button>
      </NavLink>
    </div>
  );
}

export default Join