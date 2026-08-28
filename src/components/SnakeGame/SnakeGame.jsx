import { useCallback, useEffect, useRef, useState } from "react";
import "./SnakeGame.css";

import GameBoard from "../GameBoard/GameBoard";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import Controls from "../Controls/Controls";

const BOARD_SIZE = 20;

const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 10 };

function createFood(snake) {
  const currentSnake = Array.isArray(snake) ? snake : [];

  let food;

  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (
    currentSnake.some(
      (part) =>
        part.x === food.x &&
        part.y === food.y
    )
  );

  return food;
}

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);

  const [direction, setDirection] = useState({
    x: 1,
    y: 0,
  });

  const [score, setScore] = useState(0);

  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("snakeBestScore")) || 0
  );

  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const directionRef = useRef(direction);

  const changeDirection = useCallback((newDirection) => {
    const currentDirection = directionRef.current;

    if (
      currentDirection.x + newDirection.x === 0 &&
      currentDirection.y + newDirection.y === 0
    ) {
      return;
    }

    directionRef.current = newDirection;
    setDirection(newDirection);
    setStarted(true);
  }, []);

  const restartGame = () => {
    const initialDirection = {
      x: 1,
      y: 0,
    };

    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(initialDirection);

    directionRef.current = initialDirection;

    setScore(0);
    setGameOver(false);
    setStarted(false);
  };

  /* Keyboard Controls */
  useEffect(() => {
    const handleKeyDown = (event) => {
      const keys = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (keys[event.key]) {
        event.preventDefault();
        changeDirection(keys[event.key]);
      }

      if (event.key === " " && gameOver) {
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeDirection, gameOver]);

  /* Game Loop */
  useEffect(() => {
    if (!started || gameOver) return;

    const speed = Math.max(
      55,
      140 - score * 0.5
    );

    const gameLoop = setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];

        const newHead = {
          x:
            (head.x +
              directionRef.current.x +
              BOARD_SIZE) %
            BOARD_SIZE,

          y:
            (head.y +
              directionRef.current.y +
              BOARD_SIZE) %
            BOARD_SIZE,
        };

        const ateFood =
          newHead.x === food.x &&
          newHead.y === food.y;

        const bodyToCheck = ateFood
          ? currentSnake
          : currentSnake.slice(0, -1);

        const hitSelf = bodyToCheck.some(
          (part) =>
            part.x === newHead.x &&
            part.y === newHead.y
        );

        if (hitSelf) {
          setGameOver(true);
          setStarted(false);

          return currentSnake;
        }

        const updatedSnake = [
          newHead,
          ...currentSnake,
        ];

        if (ateFood) {
          const newScore = score + 100;

          setScore(newScore);

          if (newScore > bestScore) {
            setBestScore(newScore);

            localStorage.setItem(
              "snakeBestScore",
              newScore
            );
          }

          setFood(createFood(updatedSnake));

          return updatedSnake;
        }

        updatedSnake.pop();

        return updatedSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [
    started,
    gameOver,
    food,
    score,
    bestScore,
  ]);

  return (
    <main className="snake-page">
      <section className="snake-card">

        <header className="snake-header">
          <div>
            <p className="snake-eyebrow">
              MINI PROJECT
            </p>

            <h1>🐍 Snake Game</h1>
          </div>

          <button
            className="restart-button"
            onClick={restartGame}
          >
            Restart
          </button>
        </header>

        <ScoreBoard
          score={score}
          bestScore={bestScore}
        />

        <GameBoard
          snake={snake}
          food={food}
          boardSize={BOARD_SIZE}
          started={started}
          gameOver={gameOver}
          score={score}
          onStart={() => setStarted(true)}
          onRestart={restartGame}
        />

        <Controls
          onDirectionChange={changeDirection}
        />

        <p className="game-help">
          Use Arrow Keys or Touch Controls
        </p>

      </section>
    </main>
  );
}

export default SnakeGame;