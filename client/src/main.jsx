import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import Chat from './pages/Chat.jsx';
import Home from './pages/Home.jsx';
import Join from './pages/Join.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
      <Route path="/chat-room" element={<Chat />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
