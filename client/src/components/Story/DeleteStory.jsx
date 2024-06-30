import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteStory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [victim, setVictim] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/story/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setVictim(data.victim);
        setStory(data.story);
      })
      .catch((error) => console.error("Error fetching story data:", error));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/story/${id}`)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting story data:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-full mt-10 text-white">
      <div className="flex flex-col w-80 md:w-1/3 p-8 bg-gray-950 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6">Story Details</h1>
        <div className="text-lg mb-4">
          <span className="font-bold">Story:</span> {story}
        </div>
        <div className="text-lg mb-4">
          <span className="font-bold">Victim:</span> {victim}
        </div>
        <button
          className="btn bg-gray-800 text-white py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteStory;
