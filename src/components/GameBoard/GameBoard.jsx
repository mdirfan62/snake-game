import "./GameBoard.css";

function GameBoard({
  snake,
  food,
  boardSize,
  started,
  gameOver,
  score,
  onStart,
  onRestart,
}) {
  const cells = [];

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const snakeIndex = snake.findIndex(
        (part) => part.x === x && part.y === y
      );

      const isSnake = snakeIndex !== -1;
      const isHead = snakeIndex === 0;

      const isFood =
        food.x === x &&
        food.y === y;

      cells.push(
        <div
          key={`${x}-${y}`}
          className="game-cell"
        >
          {isSnake && (
            <div
              className={`snake-piece ${
                isHead ? "snake-head" : "snake-body"
              }`}
            />
          )}

          {isFood && (
            <div className="food-dot" />
          )}
        </div>
      );
    }
  }

  return (
    <div className="board-container">
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {cells}

        {!started && !gameOver && (
          <div className="game-overlay">
            <div className="overlay-content">
              <span className="overlay-icon">🐍</span>

              <h2>Ready to Play?</h2>

              <p>
                Eat the food and grow your snake.
              </p>

              <button onClick={onStart}>
                Start Game
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="game-overlay">
            <div className="overlay-content">
              <span className="overlay-icon">💥</span>

              <h2>Game Over</h2>

              <p>
                Final Score: <strong>{score}</strong>
              </p>

              <button onClick={onRestart}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameBoard;