import { useEffect, useState } from "react";
import "./App.css";

import rockImage from "./images/rock.png";
import paperImage from "./images/paper.png";
import scissorsImage from "./images/scissors.png";

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const choices = ["rock", "paper", "scissors"];
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });
  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 });
  };

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  useEffect(() => {
    {
      switch (userChoice + computerChoice) {
        case "scissorspaper":
        case "rockscissors":
        case "paperrock":
          setResult("YOU WIN!");
          setScore((preScore) => ({ ...preScore, wins: preScore.wins + 1 }));
          break;
        case "paperscissors":
        case "scissorsrock":
        case "rockpaper":
          setResult("YOU LOSE!");
          setScore((preScore) => ({
            ...preScore,
            losses: preScore.losses + 1,
          }));
          break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
          setResult("ITS A DRAW!");
          setScore((preScore) => ({ ...preScore, ties: preScore.ties + 1 }));
          break;
      }
    }
  }, [computerChoice, userChoice]);

  return (
    <div className="container">
      <h1 className="title">Rock Paper Scissors</h1>
      {choices.map((choice, index) => (
        <button
          className={`buttons ${choice}-button`}
          key={index}
          onClick={() => handleClick(choice)}
          style={{
            backgroundImage: `url(${
              choice === "rock"
                ? rockImage
                : choice === "paper"
                ? paperImage
                : scissorsImage
            })`,
          }}
        ></button>
      ))}
      <h3 className="result">{result}</h3>
      <h2 className="outcome">
        You{" "}
        <img
          src={
            userChoice === "rock"
              ? rockImage
              : userChoice === "paper"
              ? paperImage
              : scissorsImage
          }
          alt={userChoice}
          className="image-choise"
        />{" "}
        <img
          src={
            computerChoice === "rock"
              ? rockImage
              : computerChoice === "paper"
              ? paperImage
              : scissorsImage
          }
          alt={computerChoice}
          className="image-choise"
        />
        Computer
      </h2>
      <p className="score">
        Wins: {score.wins} Losses: {score.losses} Ties: {score.ties}
      </p>
      <div className="reset-button-container">
        <button className="reset-button" onClick={resetScore}>
          Reset Score
        </button>
      </div>
    </div>
  );
}

export default App;
