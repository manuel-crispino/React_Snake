 function createOnLoad(total: number, draw: (time :number) => void) {
  let loaded = 0;

  return () => {
    loaded++;
    if (loaded === total) {
      requestAnimationFrame(draw);
    }
  };
}

const getFrameCords= (frame:number , frameHeight : number , frameWidth : number)=>{
    let col = 0; 
    let row = 0; 
          if (frame === 0) { col = 0; row = 0; }
          else if (frame === 1) { col = 1; row = 0; }
          else if (frame === 2) { col = 0; row = 1; }

         return {
            sx : col * frameWidth,
            sy : row * frameHeight
          } 
}

function loadImage(src: string, onLoad: () => void): HTMLImageElement {
  const img = new Image();
  img.onload = onLoad;
  img.src = src;   // parte il caricamento
  return img;
}

export {createOnLoad, getFrameCords, loadImage};