import React from "react";
type Axis = "x" | "y";

interface Position {
x : number;
y : number;
}

const Limits = { 
top:20,
bottom:925,
right:1496,
left:15 
}

const Home = ()=>{
    const snakeRef = React.useRef<HTMLDivElement>(null);
    const [snake,setSnake] = React.useState<Position>({x:700, y:400});
    const [apple,setApple] = React.useState<Position>({x:0, y:0});
    const appleRef = React.useRef<HTMLDivElement>(null);
    const [isStarted,setIsStarted] = React.useState(false);
    const randomX = Math.random() * (Limits.right - Limits.left) + Limits.left;
    const randomY = Math.random() * (Limits.bottom - Limits.top) + Limits.top;


    const startGame =() => {
          const newApple = { x: randomX, y: randomY };
    setApple(newApple);
    setIsStarted(true);
    }

 const moveSnake = (axis: Axis, delta: number) => {
 setSnake(prev => ({ ...prev, [axis]: prev[axis] + delta }));
};

    React.useEffect(()=>{
        if (snake.y === apple.y &&  snake.x === apple.x)
    { 
        console.log("snake ate apple");
    }},[snake.y, apple.y, snake.x, apple.x])

   
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") 
        moveSnake("x",-5);
    if (e.key === "ArrowRight")
        moveSnake("x",+5);
    if (e.key === "ArrowUp")
        moveSnake("y",-5);
    if (e.key === "ArrowDown") 
        moveSnake("y",+5);
  };

React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
}, );
    return (
        <>
        {
        !isStarted ? 
         <button type="button" className="start-btn" onClick={startGame} >
            click to play</button>
        :
        <div id="lines">
        <div ref={snakeRef}
           style={{
        position: "absolute",
        left: snake.x + "px",
        top: snake.y + "px",
        width: snake.width + "px",
        height: "20px",
        zIndex: 0,
        backgroundColor: "green",
    }}>
        </div>
         <div ref={appleRef}
         style={{
        position: "absolute",
        left: apple.x + "px",
        top: apple.y + "px",
        width: "20px",
        height: "20px",
        zIndex: -1,
        backgroundColor: "red",
    }}>
        </div>
        <div style={{
     position: "absolute",
    top: Limits.top + "px",
    left: Limits.left + "px",
    width: Limits.right - Limits.left + "px",
    height: Limits.bottom - Limits.top + "px",
    border: "2px solid yellow",
    boxSizing: "border-box"
        }}>
        </div>
        </div>
        }
        </>
    )
}

export {Home} ;