import GameState from "./GameState";

const GameOver = ({ gameState }) => {
  switch (gameState) {
    case GameState.inProgress:
      return <div></div>;
    case GameState.playerXWin:
      return <div className="game-over"> Player X win</div>;
    case GameState.playerYWin:
      return <div className="game-over"> Player O win</div>;
    case GameState.gameDraw:
      return <div className="game-over"> GAME DRAW</div>;
    default:
      <></>;
  }
};

export default GameOver;
