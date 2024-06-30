import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStory = () => {
  const [story, setStory] = useState("");
  const [victim, setVictim] = useState("");
  const navigate = useNavigate();

  const handleSaveStory = () => {
    const data = {
      story,
      victim,
    };

    axios
      .post("http://localhost:5000/story/", data)
      .then(() => {
        alert("Story added successfully");

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-full m-8">
      <div className="flex flex-col border-2 p-10 bg-gray-950 w-96 text-white">
        <label htmlFor="story" className="mb-2">
          Story
        </label>
        <input
          type="text"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          id="story"
          className="border-2 border-gray-500 mb-4 px-2 py-1 rounded bg-gray-700 text-white"
        />

        <label htmlFor="victim" className="mb-2">
          Victim
        </label>
        <input
          type="text"
          value={victim}
          onChange={(e) => setVictim(e.target.value)}
          id="victim"
          className="border-2 border-gray-500 mb-4 px-2 py-1 rounded bg-gray-700 text-white"
        />

        <button className="p-2 bg-gray-400 m-8" onClick={handleSaveStory}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateStory;
