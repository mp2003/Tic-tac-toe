import React from "react";
import GameState from "./GameState";

const Reset = ({ gameState, onResetClick }) => {
  if (gameState === GameState.inProgress) {
    return;
  }
  return (
    <button className="reset-button" onClick={onResetClick}>
      Reset Game
    </button>
  );
};

export default Reset;
