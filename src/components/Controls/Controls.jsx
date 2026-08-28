import "./Controls.css";

export default function Controls({ onDirectionChange }) {
  return (
    <div className="controls">
      <button
        className="control-up"
        onClick={() => onDirectionChange({ x: 0, y: -1 })}
        aria-label="Move up"
      >
        ↑
      </button>

      <div className="control-row">
        <button
          onClick={() => onDirectionChange({ x: -1, y: 0 })}
          aria-label="Move left"
        >
          ←
        </button>

        <button
          onClick={() => onDirectionChange({ x: 0, y: 1 })}
          aria-label="Move down"
        >
          ↓
        </button>

        <button
          onClick={() => onDirectionChange({ x: 1, y: 0 })}
          aria-label="Move right"
        >
          →
        </button>
      </div>
    </div>
  );
}

