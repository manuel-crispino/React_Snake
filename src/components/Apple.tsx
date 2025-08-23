import React, { useRef, useEffect } from "react";
import appleSpriteSrc from "../../assets/apple.png";

interface Apple {
  x: number;
  y: number;
}

const Apple: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const frameWidth = 32;
  const frameHeight = 32;
  const tileSize = 80;
  const fps = 2; // due frame al secondo
  const totalFrames = 2;

  const apple: Apple = { x: 9, y: 5 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const appleSprite = new Image();
    appleSprite.src = appleSpriteSrc;

    let frameIndex = 0;
    let lastTime = 0;

    function draw(time: number) {
      if (!ctx) return;

      if (time - lastTime > 1000 / fps) {
        frameIndex = (frameIndex + 1) % totalFrames;
        lastTime = time;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scaleX = tileSize / frameWidth;
      const scaleY = tileSize / frameHeight;

      // 🔹 frame verticale
      ctx.drawImage(
        appleSprite,
        0, // x = 0
        frameIndex * frameHeight, // y = frame corrente
        frameWidth,
        frameHeight,
        apple.x * tileSize,
        apple.y * tileSize,
        frameWidth * scaleX,
        frameHeight * scaleY
      );

      requestAnimationFrame(draw);
    }

    appleSprite.onload = () => {
      requestAnimationFrame(draw);
    };
  }, []);

  return <canvas ref={canvasRef} width={1200} height={800}></canvas>;
};

export default Apple;
