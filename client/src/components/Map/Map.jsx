import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import Spline from "@splinetool/react-spline";
import "./Map.css";

const Map = () => {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className="flex space-x-4 mb-4">
        <button onClick={() => zoomIn()} className="control-button">
          Zoom In
        </button>
        <button onClick={() => zoomOut()} className="control-button">
          Zoom Out
        </button>
        <button onClick={() => resetTransform()} className="control-button">
          Reset
        </button>
      </div>
    );
  };

  const tips = [
    "Stay calm and assess the situation.",
    "Keep an emergency kit with essentials.",
    "Have a communication plan with family.",
    "Avoid red zones marked on the map.",
    "Head towards green zones for safety.",
    "Follow evacuation orders promptly.",
    "Stay informed through reliable sources.",
    "Don't trust unverified information.",
    "Stay indoors during high alien activity.",
    "Report any sightings to authorities.",
  ];

  const motivationalTexts = [
    "Great job! You're one step closer to safety!",
    "Keep going! Stay strong and alert!",
    "Fantastic! Your survival skills are improving!",
    "Awesome! You're doing great!",
    "Keep it up! You're becoming a true survivor!",
  ];

  const [score, setScore] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

  const handleClick = (index) => {
    if (!completedTasks.has(index)) {
      const randomIndex = Math.floor(Math.random() * motivationalTexts.length);
      setMotivation(motivationalTexts[randomIndex]);
      setCompletedTasks(new Set(completedTasks).add(index));
    }
  };

  useEffect(() => {
    if (completedTasks.size === tips.length) {
      setAllTasksCompleted(true);
    }
  }, [completedTasks]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-8">
      <h1 className="text-6xl font-bold text-center text-slate-50 pb-4">
        Alien Invasion Map Guide
      </h1>
      <div className="w-full rounded shadow-lg mb-6">
        <Spline scene="https://prod.spline.design/y7-HNrOragS4aGD7/scene.splinecode" />
      </div>
      <p className="mb-4 text-2xl text-center text-slate-50 max-w-6xl">
        This map shows areas invaded by aliens in red and safe areas in green.
        Major red spot areas should be evacuated if possible.
      </p>
      <div className="w-full max-w-7xl  p-4 rounded shadow-lg">
        <TransformWrapper>
          <Controls />
          <TransformComponent>
            <img src="/map.jpg" alt="Map" className="w-full h-auto" />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="timeline-container2 mt-6">
        <div className="score-board">
          <p>{motivation}</p>
        </div>
        <ul className="timeline mb-12">
          {tips.map((tip, index) => (
            <li
              key={index}
              className={`timeline-item ${
                completedTasks.has(index) ? "completed" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {tip}
            </li>
          ))}
        </ul>
        {allTasksCompleted && (
          <div className="completion-message">
            <Confetti />
            <h2 className="text-4xl mb-6 text-green-500">
              Mission accomplished! You're a survival rockstar!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
