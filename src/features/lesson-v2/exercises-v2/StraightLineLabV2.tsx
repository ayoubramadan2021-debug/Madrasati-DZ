import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Point = { x: number; y: number };

export interface StraightLineLabV2Props {
  start: Point;
  end: Point;
  locked?: boolean;
  showResult?: boolean;
  onResult: (correct: boolean) => void;
}

const distance = (a: Point, b: Point) =>
  Math.hypot(a.x - b.x, a.y - b.y);

function distanceToLine(p: Point, a: Point, b: Point) {
  const len = distance(a, b);
  if (!len) return Infinity;
  return Math.abs(
    (b.y - a.y) * p.x -
    (b.x - a.x) * p.y +
    b.x * a.y -
    b.y * a.x
  ) / len;
}

export default function StraightLineLabV2({
  start,
  end,
  locked = false,
  showResult = false,
  onResult,
}: StraightLineLabV2Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  const getPoint = (e: ReactPointerEvent<HTMLDivElement>): Point => {
    const r = boardRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    };
  };

  const startDraw = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (locked) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = getPoint(e);
    pointsRef.current = [p];
    setPoints([p]);
  };

  const moveDraw = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (locked || pointsRef.current.length === 0) return;
    const p = getPoint(e);
    pointsRef.current = [...pointsRef.current, p];
    setPoints(pointsRef.current);
  };

  const endDraw = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (locked || pointsRef.current.length === 0) return;

    const last = getPoint(e);
    const drawn = [...pointsRef.current, last];
    pointsRef.current = drawn;
    setPoints(drawn);

    const targetLength = distance(start, end);
    const first = drawn[0];
    const final = drawn[drawn.length - 1];

    const startOk = distance(first, start) <= 10;
    const endOk = distance(final, end) <= 10;
    const lengthOk = distance(first, final) >= targetLength * 0.8;
    const maxDeviation = Math.max(
      ...drawn.map(p => distanceToLine(p, start, end))
    );
    const straightOk = maxDeviation <= 6;

    onResult(startOk && endOk && lengthOk && straightOk);
  };

  const polyline = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div
      ref={boardRef}
      onPointerDown={startDraw}
      onPointerMove={moveDraw}
      onPointerUp={endDraw}
      style={{
        position: "relative",
        width: "100%",
        height: 260,
        maxWidth: 650,
        margin: "0 auto",
        borderRadius: 24,
        border: "3px solid rgba(23,54,95,.18)",
        background: "#fffdf7",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
      }}
      aria-label="اربط بين النقطتين بخط مستقيم"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {showResult && (
          <line
            x1={start.x} y1={start.y}
            x2={end.x} y2={end.y}
            stroke="#1FA463" strokeWidth="2.4"
            strokeLinecap="round"
          />
        )}

        {points.length > 1 && (
          <polyline
            points={polyline}
            fill="none"
            stroke="#E8A020"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        <circle cx={start.x} cy={start.y} r="4.2" fill="#E8A020" />
        <circle cx={end.x} cy={end.y} r="4.2" fill="#D45447" />
      </svg>
    </div>
  );
}
