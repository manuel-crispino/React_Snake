import { COLS, ROWS, CELL_SIZE } from "../const";

interface Position {
  x: number;
  y: number;
}

interface GridProps {
  snake: Position[];
  apple: Position;
}

export default function GridCss({ snake, apple }: GridProps) {
  const cells = Array.from({ length: ROWS * COLS }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const isDark = (row + col) % 2 === 0;

    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;

    let backgroundColor = isDark ? "#88888861" : "#ffffff58";

    // disegno snake
    if (snake.some(seg => seg.x === x && seg.y === y)) backgroundColor = "green";
    // disegno mela
    if (apple.x === x && apple.y === y) backgroundColor = "red";

    return <div key={i} style={{ width: CELL_SIZE, height: CELL_SIZE, backgroundColor }} />;
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
        border: "2px solid yellow",
      }}
    >
      {cells}
    </div>
  );
}
