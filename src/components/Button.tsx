import React from "react";

interface ButtonProps {
  setIsGameStart: (value: boolean) => void;
}

const Button: React.FC<ButtonProps> = ({ setIsGameStart }) => {
  function handleClick() {
    setIsGameStart(true);
  }

  return <button type="button" className="button" onClick={handleClick}>Start Game</button>;
};

export default Button;
