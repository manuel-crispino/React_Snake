import React, { useRef, useEffect } from "react";

const Grid: React.FC = () => {
  const gridRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = gridRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = 80;          // dimensione di ogni cella
    const rows = canvas.height / cellSize;
    const cols = canvas.width / cellSize;

    // disegno la scacchiera
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // alterniamo i colori per effetto scacchiera
        if ((r + c) % 2 === 0) {
          ctx.fillStyle = "#222"; // colore scuro
        } else {
          ctx.fillStyle = "#333"; // colore chiaro
        }
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }

    // disegno linee griglia sopra la scacchiera
    ctx.strokeStyle = "#555"; // colore linee
    ctx.lineWidth = 1;

    // linee verticali
    for (let c = 0; c <= cols; c++) {
      const x = c * cellSize;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // linee orizzontali
    for (let r = 0; r <= rows; r++) {
      const y = r * cellSize;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  return <canvas ref={gridRef} width={1200} height={800}></canvas>;
};

export default Grid;
