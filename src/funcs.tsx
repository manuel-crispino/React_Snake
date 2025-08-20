import React from "react";

interface Limits  { 
top:number,
bottom:number,
right:number,
left:number 
}
 const MyFunctions = { 
    
   getRandomPosition : (Limits: Limits, CELL_SIZE: number) => {
    const gridWidth = (Limits.right - Limits.left) / CELL_SIZE;
    const gridHeight = (Limits.bottom - Limits.top) / CELL_SIZE;

    const x = Math.floor(Math.random() * gridWidth) * CELL_SIZE + Limits.left;
    const y = Math.floor(Math.random() * gridHeight) * CELL_SIZE + Limits.top;

    return { x, y };
   }
}

export default MyFunctions;