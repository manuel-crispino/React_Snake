import React, { useRef, useEffect, useState } from "react";
import headSpriteSrc from "../../assets/head.png";
import bodySpriteSrc from "../../assets/body.png";
import tailSpriteSrc from "../../assets/tail.png";
import { createOnLoad, getFrameCords, loadImage } from "../helper";

interface SnakePart {
  x: number;
  y: number;
  type: "head" | "body" | "tail";
}

const Snake: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const frameWidth = 32;
  const frameHeight = 32;
  const tileSize = 80;
  

  const [snake, setSnake] = useState<SnakePart[]>([
    { x: 5, y: 5, type: "head" },
    { x: 4, y: 5, type: "body" },
    { x: 3, y: 5, type: "tail" },
  ]);

  const headFrames = 2;
  const bodyFrames = 3; // totale frame body nella sprite sheet
  const tailTotalFrames = 3; // frame validi coda
  const fps = 2;
   let img: HTMLImageElement;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onLoad = createOnLoad(3, draw);

    const headSprite = loadImage(headSpriteSrc, onLoad);
    const bodySprite = loadImage(bodySpriteSrc, onLoad);
    const tailSprite = loadImage(tailSpriteSrc, onLoad);

    let headFrameIndex = 0;
    let bodyFrameIndex = 0; // nuovo indice per il body
    let tailFrameIndex = 0;
    let lastTime = 0;

    function draw(time: number) {
      if (ctx === null || canvas === null ) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!lastTime) lastTime = time;
      if (time - lastTime > 1000 / fps) {
        headFrameIndex = (headFrameIndex + 1) % headFrames;
        bodyFrameIndex = (bodyFrameIndex + 1) % bodyFrames;
        tailFrameIndex = (tailFrameIndex + 1) % tailTotalFrames;
        lastTime = time;
      }

      const scaleX = tileSize / frameWidth;
      const scaleY = tileSize / frameHeight;

      snake.forEach((part) => {
       
        let sx = 0;
        let sy = 0;

        if (part.type === "head") {
          img = headSprite;
          sx = headFrameIndex * frameWidth;
          sy = 0;
        }else if (part.type === "body") {
          img = bodySprite;
          const { sx: bx, sy: by } = getFrameCords(bodyFrameIndex, frameHeight, frameWidth);
          sx = bx;
          sy = by;
        } else {
          img = tailSprite;
          const { sx: tx, sy: ty } = getFrameCords(tailFrameIndex, frameHeight, frameWidth);
          sx = tx;
          sy = ty;
        }

        ctx.drawImage(
          img,
          sx,
          sy,
          frameWidth,
          frameHeight,
          part.x * tileSize,
          part.y * tileSize,
          frameWidth * scaleX,
          frameHeight * scaleY
        );
      });

      requestAnimationFrame(draw);
    }
  }, [snake]);

  return <canvas ref={canvasRef} width={1200} height={800}></canvas>;
};

export default Snake;
