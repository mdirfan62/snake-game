import "./ScoreBoard.css";

export default function ScoreBoard({ score, bestScore }) {
  return (
    <div className="score-board">
      <div className="score-item">
        <span>Score</span>
        <strong>{score}</strong>
      </div>

      <div className="score-item">
        <span>Best</span>
        <strong>{bestScore}</strong>
      </div>
    </div>
  );
}

