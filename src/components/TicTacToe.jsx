import React, { useEffect, useState } from "react";
import Board from "./Board";
import GameState from "./GameState";
import GameOver from "./GameOver";
import Reset from "./Reset";
import ClickSound from "../assets/click1.wav";
import GameOverSound from "../assets/gameOver.wav";

const gameOverSound = new Audio(GameOverSound);
gameOverSound.volume = 0.2;
const clickSound = new Audio(ClickSound);
clickSound.volume = 0.5;
const PLAYER_X = "x";
const PLAYER_O = "o";
const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tile, setStrikeClass, setGameState) {
  for (let { combo, strikeClass } of winningCombinations) {
    let tilesValue1 = tile[combo[0]];
    let tilesValue2 = tile[combo[1]];
    let tilesValue3 = tile[combo[2]];

    if (
      tilesValue1 !== null &&
      tilesValue1 === tilesValue2 &&
      tilesValue1 === tilesValue3
    ) {
      setStrikeClass(strikeClass);
      if (tilesValue1 === PLAYER_X) {
        setGameState(GameState.playerXWin);
      } else {
        setGameState(GameState.playerYWin);
      }
      return;
    }
  }
  if (tile.every((t) => t !== null)) setGameState(GameState.gameDraw);
}
const TicTacToe = () => {
  const [tile, setTile] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  useEffect(() => {
    checkWinner(tile, setStrikeClass, setGameState);
  }, [tile]);

  useEffect(() => {
    if (tile.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tile]);
  useEffect(() => {
    if (gameState != GameState.inProgress) gameOverSound.play();
  }, [gameState]);
  const handelTileClick = (index) => {
    if (gameState !== GameState.inProgress) return;
    if (tile[index] !== null) {
      console.log("null compt");
      return;
    } else {
      let newTiles = [...tile];
      newTiles[index] = playerTurn;
      setTile(newTiles);
      playerTurn === PLAYER_X
        ? setPlayerTurn(PLAYER_O)
        : setPlayerTurn(PLAYER_X);
    }
  };

  const onResetClick = () => {
    setGameState(GameState.inProgress);
    setTile(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };
  return (
    <div className="tic-tac-toe-container">
      <h1>TicTacToe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tile}
        onTileClick={handelTileClick}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onResetClick={onResetClick} />
    </div>
  );
};

export default TicTacToe;
