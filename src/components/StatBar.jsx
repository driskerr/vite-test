export default function StatBar({ value, max, color, emoji }) {
  const pct = (value / max) * 100;
  return (
    <div className="stat-bar">
      <span className="stat-bar-emoji">{emoji}</span>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="stat-bar-value" style={{ color }}>{value}</span>
    </div>
  );
}
