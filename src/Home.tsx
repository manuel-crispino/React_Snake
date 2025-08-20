import React from "react";
import Element from "./components/Element";
import MyFunctions from "./funcs";
type Axis = "x" | "y";

interface Position {
    x : number;
    y : number;
}

const Limits = { 
  top: 20,    // multiplo di 20 ✅
  bottom: 920, // 900px di altezza (multiplo di 20)
  right: 1500, // multiplo di 20 ✅
  left: 20     // multiplo di 20 ✅
};

const Home = () => {
    const snakeRef = React.useRef < HTMLDivElement > (null);
    const [snake,
        setSnake] = React.useState < Position > ({x: 700, y: 400});
    const [apple,
        setApple] = React.useState < Position > ({x: 0, y: 0});
    const appleRef = React.useRef < HTMLDivElement > (null);
    const [isStarted,
        setIsStarted] = React.useState(false);
    const [direction,
        setDirection] = React.useState < string | null > (null);
    const [speedLevel,
        setSpeedLevel] = React.useState < number > (300);
    const CELL_SIZE = 20;

    const startGame = () => {
        setApple(getRandomPosition());
        setDirection("right");
        setIsStarted(true);
    }

    const getRandomPosition = () => MyFunctions.getRandomPosition(Limits, CELL_SIZE);

    const moveSnake = React.useCallback((axis : Axis, delta : number) => {
        setSnake(prev => ({
            ...prev,
            [axis]: prev[axis] + delta
        }));
    }, []);

    React.useEffect(() => {
        if (snake.y === apple.y && snake.x === apple.x) {
            setSpeedLevel(speedLevel - 1);
            setApple(getRandomPosition());
            console.log("snake ate apple");
        }
    }, [snake.y, apple.y, snake.x, apple.x, speedLevel])

    React.useEffect(() => {
        if (!isStarted || !direction) 
            return;
        
        const interval = setInterval(() => {
            if (direction == "right") 
                moveSnake("x", CELL_SIZE);
            if (direction == "left") 
                moveSnake("x", -CELL_SIZE);
            if (direction == "up") 
                moveSnake("y", -CELL_SIZE);
            if (direction == "down") 
                moveSnake("y", CELL_SIZE);
            }
        , speedLevel);
        return () => clearInterval(interval);
    }, [moveSnake, direction, isStarted, speedLevel])

    const handleKeyDown = (e : KeyboardEvent) => {
        if (e.key === "ArrowLeft") 
            setDirection("left");
        if (e.key === "ArrowRight") 
            setDirection("right");
        if (e.key === "ArrowUp") 
            setDirection("up");
        if (e.key === "ArrowDown") 
            setDirection("down");
        };
    
    React.useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    },);

    return ( <> {
        !isStarted
            ? <button type="button" className="start-btn" onClick={startGame}>
                    click to play</button>
            :   <>
                 <div id="lines">
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
                    }}></div>
                </>
    } </>
)
}

export {Home} ;