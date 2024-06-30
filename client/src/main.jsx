// src/index.jsx (Router setup)
import React from "react";
import ReactDOM from "react-dom";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import Join from "./pages/Chat/Join";
import Game from "./components/Games/Game";
import Map from "./components/Map/Map";
import Guide from "./pages/Guide/Guide";
import AreYouHuman from "./pages/Human/AreYouHuman";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
      <Route path="/chat-room" element={<Chat />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/game" element={<Game />} />
      <Route path="/map" element={<Map />} />
      <Route path="/areyouhuman" element={<AreYouHuman />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
