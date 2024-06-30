import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import Header from "../../components/Story/Header"; // Adjust the import path based on your file structure
import Card from "../../components/Story/Card";

const Stories = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/story")
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="h-screen w-screen">
      <Header /> {/* Include the Header component */}
      <div className="flex flex-wrap justify-center p-4">
        {data.map((story, index) => (
          <Card key={index} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
