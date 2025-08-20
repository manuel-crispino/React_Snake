import React, { useCallback } from "react";
import GridCss from "./components/Grid";
import { CELL_SIZE, COLS, ROWS } from "./const";
import MyFunctions from "./funcs";

interface Position {
  x: number;
  y: number;
}

type Direction = "left" | "right" | "up" | "down";

const Limits = { 
  top: 0,
  bottom: ROWS * CELL_SIZE, 
  left: 0,
  right: COLS * CELL_SIZE 
};

export const Home = () => {
  const [snake, setSnake] = React.useState<Position[]>([{ x: 6 * CELL_SIZE, y: 6 * CELL_SIZE }]);
  const [apple, setApple] = React.useState<Position>(getRandomPosition());
  const [direction, setDirection] = React.useState<Direction>("right");
  const speedLevel = 200;
  const [isStarted, setIsStarted] = React.useState(false);

  function getRandomPosition() {
    return MyFunctions.getRandomPosition(Limits, CELL_SIZE);
  }

  const startGame = useCallback(() => {
    setSnake([{ x: 6 * CELL_SIZE, y: 6 * CELL_SIZE }]);
    setApple(getRandomPosition());
    setDirection("right");
    setIsStarted(true);
  },[]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && direction !== "right") setDirection("left");
    if (e.key === "ArrowRight" && direction !== "left") setDirection("right");
    if (e.key === "ArrowUp" && direction !== "down") setDirection("up");
    if (e.key === "ArrowDown" && direction !== "up") setDirection("down");
  },[direction]);

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction,handleKeyDown]);

  React.useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        const newHead = { ...prev[0] };

        switch (direction) {
          case "right":
            newHead.x += CELL_SIZE;
            break;
          case "left":
            newHead.x -= CELL_SIZE;
            break;
          case "up":
            newHead.y -= CELL_SIZE;
            break;
          case "down":
            newHead.y += CELL_SIZE;
            break;
        }

        // collisione con limiti
        if (
          newHead.x < Limits.left ||
          newHead.x >= Limits.right ||
          newHead.y < Limits.top ||
          newHead.y >= Limits.bottom
        ) {
          startGame();
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // collisione con mela
        if (newHead.x === apple.x && newHead.y === apple.y) {
          setApple(getRandomPosition());
        } else {
          newSnake.pop(); // rimuovo coda se non mangia
        }

        return newSnake;
      });
    }, speedLevel);

    return () => clearInterval(interval);
  }, [startGame,isStarted, direction, apple, speedLevel]);

  return (
    <div>
      {!isStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <GridCss snake={snake} apple={apple} />
      )}
    </div>
  );
};



 {/*  <div id="lines">
                    <Element x={snake.x} y={snake.y} Ref={snakeRef} color="green" zIndex={1}/>
                    <Element x={apple.x} y={apple.y} Ref={appleRef} color="red" zIndex={0}/>
                 </div>
                   <div
                        style={{
                        position: "absolute",
                        top: Limits.top + "px",
                        left: Limits.left + "px",
                        width: Limits.right - Limits.left + "px",
                        height: Limits.bottom - Limits.top + "px",
                        border: "2px solid yellow",
                        boxSizing: "border-box"
                    }}></div> */}