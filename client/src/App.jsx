import React from "react";
import { Outlet } from "react-router-dom";
import PixiBackground from "./components/PixiBackground";

const App = () => {
  return (
    <div>
      <PixiBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
