import React from "react";
type Axis = "x" | "y";
interface Position {
x : number;
y : number;
}

const Home = ()=>{
    const snakeRef = React.useRef<HTMLDivElement>(null);
    const [snake,setSnake] = React.useState<Position>({x:700, y:400});
    const [apple,setApple] = React.useState<Position>({x:0, y:0});
    const appleRef = React.useRef<HTMLDivElement>(null);
    const [isStarted,setIsStarted] = React.useState(false);

    const startGame =() => {
          const newApple = { x: 900, y: 400 };
    setApple(newApple);

    if (appleRef.current != null) {
        appleRef.current.style.left = newApple.x + "px";
        appleRef.current.style.top = newApple.y + "px";
    }
    setIsStarted(true);
    }

 const moveSnake = (axis: Axis, delta: number) => {
 setSnake(prev => ({ ...prev, [axis]: prev[axis] + delta }));
};

    if (snake.y === apple.y &&  snake.x === apple.x)
        console.log("snake ate apple");

   
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
        width: "20px",
        height: "20px",
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
        backgroundColor: "red",
    }}>
        </div>
        </div>
        }
        </>
    )
}

export {Home} ;