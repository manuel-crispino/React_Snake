import React from "react";
const Home = ()=>{
    const box = React.useRef<HTMLDivElement>(null);
    const posX = React.useRef(700);
    const posY = React.useRef(400);
    const apple = React.useRef<HTMLDivElement>(null);

    const moveRight = () =>{
        posX.current += 5;
        if (box.current != null )
            box.current.style.left = posX.current + "px";    
        if (posX.current < 1460)
            moveRight();
    }

    const moveLeft= () =>{
        posX.current -= 5;
        if (box.current != null )
            box.current.style.left = posX.current + "px";    
    }

    const moveDown= () =>{
        posY.current += 5;
        if (box.current != null )
            box.current.style.top = posY.current + "px";    
    }

    const moveTop= () =>{
        posY.current -= 5;
        if (box.current != null )
            box.current.style.top = posY.current + "px";    
    }


    const handleKeyDown = (e:KeyboardEvent) =>
        {
           if (e.key == "ArrowLeft")
                moveLeft();
           if (e.key == "ArrowRight")
                moveRight();
           if (e.key == "ArrowUp")
                moveTop();
           if (e.key == "ArrowDown")
                moveDown();
        }
        document.addEventListener("keydown",handleKeyDown);
    return (
        <>
        <div id="lines">
        <div ref={box} id="box">
        </div>
         <div ref={apple} id="apple">
        </div>
        </div>
        </>
    )
}

export {Home} ;