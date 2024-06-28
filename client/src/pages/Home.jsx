import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <NavLink to="/join">
        <button className="bg-blue-950 text-white font-bold py-2 px-4 rounded-lg">
          Chat Room
        </button>
      </NavLink>
    </div>
  );
};

export default Home;
