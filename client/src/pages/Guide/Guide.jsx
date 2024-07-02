import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const tips = [
  "Always wear a tin foil hat to deflect alien mind control.",
  "Carry a portable disco ball to blind aliens with its dazzling reflection.",
  "Eat plenty of spicy food to make your body too hot for aliens to handle.",
  "Wear oversized sunglasses to disguise yourself as a cool, uninvadable human.",
  "Keep a stash of rubber chickens to distract aliens with their absurdity.",
  "Use glitter bombs to create a sparkly smokescreen for escape.",
  "Practice your best 'Blue Steel' pose to intimidate aliens with your fashion sense.",
  "Carry a 'Lost Alien' sign to confuse invaders and lead them astray.",
  "Wear a 'I'm with stupid' t-shirt to point to an alien and confuse them.",
  "Use your best 'alien impression' to scare them off with their own language.",
  "Keep a can of 'Alien Repellent' (spray cheese) handy.",
  "Build a 'Disco-Tron' to force aliens to dance until they surrender.",
  "Use your phone's flashlight to signal 'S.O.S.' in Morse code.",
  "Wear a 'Superhero Cape' to give you the courage to fight off aliens.",
  "Keep a 'Universal Translator' (a.k.a. a magic 8-ball) to 'communicate' with aliens.",
  "Create a fake 'Alien License' to pretend you're one of them.",
  "Carry a bag of marbles to throw on the ground and make aliens slip.",
  "Learn to mimic alien sounds to blend in with their communication.",
  "Wear reflective clothing to make yourself harder to spot.",
  "Carry a small mirror to reflect their lasers back at them.",
];

const motivationalTexts = [
  "Great job! You're one step closer to outsmarting the aliens!",
  "Keep going! The aliens won't know what hit them!",
  "Fantastic! You're becoming a true alien survival expert!",
  "Awesome! Your alien defense skills are impressive!",
  "Keep it up! You're doing great at confusing those aliens!",
];

const SurvivalGuideTimeline = () => {
  const [score, setScore] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

  const handleClick = (index) => {
    if (!completedTasks.has(index)) {
      setScore(score + 1);
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
    <div className="w-4/5 m-auto overflow-x-hidden text-center text-white font-sans">
      <h1 className="text-5xl mt-3">Guide for Alien Invasion Survival</h1>
      <div className="my-5 text-lg font-semibold">
        <p className="text-2xl text-green-500">Score: {score}</p>
        <p>{motivation}</p>
      </div>
      <ul className="list-none p-0">
        {tips.map((tip, index) => (
          <li
            key={index}
            className={`p-5 my-2 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm cursor-pointer transition  duration-300 transform ${
              completedTasks.has(index)
                ? "bg-red-700/20 border-red-500/40 cursor-not-allowed transform-none"
                : "hover:bg-white/20 hover:translate-y-[-2px]"
            }`}
            onClick={() => handleClick(index)}
          >
            {tip}
          </li>
        ))}
      </ul>
      {allTasksCompleted && (
        <div className="p-6">
          <Confetti />
          <h2 className="text-4xl text-green-500">
            Mission accomplished! You're a survival rockstar!
          </h2>
        </div>
      )}
    </div>
  );
};

export default SurvivalGuideTimeline;
