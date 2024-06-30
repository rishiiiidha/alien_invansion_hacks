import React, { useState, useEffect } from "react";

const alienImages = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.png",
  "/img6.png",
  "/img7.png",
  "/img8.png",
];

const Game = () => {
  const [score, setScore] = useState(0);
  const [aliens, setAliens] = useState([]);
  const [message, setMessage] = useState("");

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * alienImages.length);
    return alienImages[randomIndex];
  };

  const createAlien = () => {
    const newAlien = {
      id: Date.now(),
      left: Math.random() * 90 + "%",
      top: Math.random() * 90 + "%",
      imageUrl: getRandomImage(),
    };
    setAliens((prevAliens) => [...prevAliens, newAlien]);
    console.log("New alien created:", newAlien);
  };

  const handleAlienClick = (id) => {
    setAliens(aliens.filter((alien) => alien.id !== id));
    setScore(score + 1);
    setMessage("You defeated an alien!");
    console.log("Alien clicked:", id);
  };

  useEffect(() => {
    const interval = setInterval(createAlien, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Aliens state updated:", aliens);
  }, [aliens]);

  return (
    <div className="relative w-full h-screen bg-black text-white p-4">
      <h1 className="text-3xl mb-4">Alien Invasion Game</h1>
      <p className="text-xl">Score: {score}</p>
      <p className="text-xl">{message}</p>
      <div className="absolute w-full h-full top-0 left-0">
        {aliens.map((alien) => (
          <img
            key={alien.id}
            src={alien.imageUrl}
            alt="alien"
            className="absolute w-20 h-20 cursor-pointer"
            style={{ left: alien.left, top: alien.top }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default.png";
            }} // Fallback image
            onClick={() => handleAlienClick(alien.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
