export default function RangeSlider({ min, max, value, onChange, label, color }) {
  const [low, high] = value;
  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <p className="filter-label" style={{ margin: 0, minWidth: "52px" }}>
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <span style={{ fontSize: "12px", color: "#888", minWidth: "24px", textAlign: "right" }}>
          {low}
        </span>
        <div className="range-slider" style={{ "--slider-color": color, flex: 1 }}>
          <div
            className="track"
            style={{
              background: `linear-gradient(to right, #ddd ${lowPct}%, ${color} ${lowPct}%, ${color} ${highPct}%, #ddd ${highPct}%)`,
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={low}
            onChange={(e) => onChange([Math.min(Number(e.target.value), high), high])}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={high}
            onChange={(e) => onChange([low, Math.max(Number(e.target.value), low)])}
          />
        </div>
        <span style={{ fontSize: "12px", color: "#888", minWidth: "24px" }}>
          {high}
        </span>
      </div>
    </div>
  );
}
