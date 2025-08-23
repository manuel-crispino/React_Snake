import React, { useState } from "react";
import Button from "./components/Button";
import Snake from "./components/Snake";
import Grid from "./components/Grid";
import Apple from "./components/Apple";

const Game = () => {
  const [isGameStart, setIsGameStart] = useState(false);

  return (
    <div id="gameContainer">
      {!isGameStart && <Button setIsGameStart={setIsGameStart} />}
      {isGameStart && 
      <>
      <Grid/>
      <Snake/>
      <Apple/>
      </>
     }
    </div>
  );
};

export default Game;