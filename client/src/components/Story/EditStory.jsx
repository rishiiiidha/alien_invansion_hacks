import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditStory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [story, setStory] = useState("");
  const [victim, setVictim] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/story/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setStory(data.story);
        setVictim(data.victim);
      })
      .catch((error) => console.error("Error fetching story data:", error));
  }, [id]);

  const handleStoryChange = (e) => {
    setStory(e.target.value);
  };

  const handleVictimChange = (e) => {
    setVictim(e.target.value);
  };

  const handleSave = () => {
    const updatedStoryData = {
      story: story,
      victim: victim,
    };

    axios
      .put(`http://localhost:5000/story/${id}`, updatedStoryData)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating story data:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-full mt-12 text-white ">
      <div className="flex flex-col  md:w-1/3 p-8 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6">Edit Story</h1>
        <div className="flex mb-4">
          <label htmlFor="story" className="text-lg w-1/3">
            Story
          </label>
          <input
            type="text"
            id="story"
            value={story}
            className="border-2 border-gray-500 mb-4 px-2 py-1 rounded bg-gray-700 text-white"
            onChange={handleStoryChange}
          />
        </div>
        <div className="flex mb-4">
          <label htmlFor="victim" className="text-lg w-1/3">
            Victim
          </label>
          <input
            type="text"
            id="victim"
            value={victim}
            className="border-2 border-gray-500 mb-4 px-2 py-1 rounded bg-gray-700 text-white"
            onChange={handleVictimChange}
          />
        </div>
        <button className="p-2 bg-gray-400 ml-16 w-2/3" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditStory;
