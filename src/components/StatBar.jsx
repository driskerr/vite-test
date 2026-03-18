export default function StatBar({ value, max, color, emoji }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "4px 0" }}>
      <span style={{ fontSize: "13px", width: "18px" }}>{emoji}</span>
      <div style={{ flex: 1, background: "#e8e8e8", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: "999px" }} />
      </div>
      <span style={{ fontSize: "11px", color, fontWeight: "700", minWidth: "24px", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
