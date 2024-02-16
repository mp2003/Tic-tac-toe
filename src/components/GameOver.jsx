import GameState from "./GameState";

const GameOver = ({ gameState }) => {
  switch (gameState) {
    case GameState.inProgress:
      return <div></div>;
    case GameState.playerXWin:
      return <div className="game-over"> Player X win</div>;
    case GameState.playerYWin:
      return (
        <div className="game-over" style={{ fontFamily: "Protest Strike" }}>
          {" "}
          Player O win
        </div>
      );
    case GameState.gameDraw:
      return (
        <div
          className="game-over"
          style={{ fontFamily: "Protest Strike", fontSize: "2.2em" }}
        >
          {" "}
          GAME DRAW
        </div>
      );
    default:
      <></>;
  }
};

export default GameOver;
