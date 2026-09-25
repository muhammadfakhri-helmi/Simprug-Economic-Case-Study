/** Static SVG version of the field for devices without WebGL. */
export function FieldFallback({ mode }: { mode: "hero" | "decision" }) {
  const wells = Array.from({ length: 30 }, (_, i) => {
    const ring = i < 15 ? 0 : 1;
    const a = ((i % 15) / 15) * Math.PI * 2 + ring * 0.2;
    const rx = ring ? 150 : 85;
    return { x: 260 + Math.cos(a) * rx, y: 120 + Math.sin(a) * rx * 0.28, b: ring === 1 };
  });
  return (
    <svg viewBox="0 0 520 330" className="absolute inset-0 h-full w-full" aria-hidden>
      <polygon points="40,120 260,60 480,120 260,180" fill="#101a2b" stroke="#2b3a52" />
      <polygon points="40,120 260,180 260,300 40,240" fill="#172234" stroke="#2b3a52" />
      <polygon points="480,120 260,180 260,300 480,240" fill="#121b29" stroke="#2b3a52" />
      <path d="M40,200 Q150,165 260,215 L260,245 Q150,200 40,228 Z" fill="#b7925e" opacity="0.9" />
      <path d="M260,215 Q370,170 480,200 L480,228 Q370,200 260,245 Z" fill="#9c7b4d" opacity="0.9" />
      {wells.map((w, i) => (
        <g key={i}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={w.y + 60} stroke={mode === "decision" ? (w.b ? "#5ec4da" : "#7f98cf") : "#c9d3df"} strokeWidth="1" opacity="0.5" />
          <circle cx={w.x} cy={w.y} r="3" fill={mode === "decision" ? (w.b ? "#5ec4da" : "#7f98cf") : "#c9d3df"} />
        </g>
      ))}
      <rect x="90" y="98" width="34" height="16" fill="#2a3850" stroke="#8f9bab" />
      <line x1="90" y1="110" x2="40" y2="128" stroke="#5ec4da" strokeWidth="2" />
    </svg>
  );
}
