import { GraphLink } from "src/types/utils";

function linkArc(d: GraphLink): string {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);

  return `M${d.source.x},${d.source.y}A${r},${r} 0 0,1 ${d.target.x},${d.target.y}`;
}

function selfLoopArc(d: GraphLink): string {
  const { x } = d.source;
  const { y } = d.source;
  const dx = 140;
  const dy = 140;

  return `M${x},${y}C${x + dx},${y - dy} ${x - dx},${y - dy} ${x},${y}`;
}

export { linkArc, selfLoopArc };
