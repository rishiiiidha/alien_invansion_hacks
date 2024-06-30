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
import Stories from "./pages/Story/Stories";
import CreateStory from "./components/Story/CreateStory";
import EditStory from "./components/Story/EditStory";
import DeleteStory from "./components/Story/DeleteStory";

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
      <Route path="/stories" element={<Stories />} />
      <Route path="/story/create" element={<CreateStory />} />
      <Route path="/story/edit/:id" element={<EditStory />} />
      <Route path="/story/delete/:id" element={<DeleteStory />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
