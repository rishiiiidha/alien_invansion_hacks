import React from 'react'
import { NavLink } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <NavLink to="/join">
        <button>Chat Room</button>
      </NavLink>
    </div>
  );
}

export default Home