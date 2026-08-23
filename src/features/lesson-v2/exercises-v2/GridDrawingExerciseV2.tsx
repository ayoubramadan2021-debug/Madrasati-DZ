import React, { useEffect, useMemo, useState } from "react";

export type GridPoint = { x: number; y: number };
export type GridSegment = { from: GridPoint; to: GridPoint };

export type GridDrawingActivityV2 = {
  grid: { cols: number; rows: number };
  starterSegments?: GridSegment[];
  targetSegments: GridSegment[];
  modelSegments?: GridSegment[];
  startPoint?: GridPoint;

  // نقاط إرشادية ظاهرة للتلميذ.
  // نستعملها في التمرين 4 فقط.
  guidePoints?: GridPoint[];

  modelLabel?: string;
  workLabel?: string;
  tip?: string;
};

type Props = {
  activity: GridDrawingActivityV2;
  locked?: boolean;
  showResult?: boolean;
  onResult: (ok: boolean) => void;
  questionId?: string;
};

const navy = "#1B3A6B";
const navySoft = "#375D95";
const gold = "#E8B129";
const cream = "#FFF9EE";
const panel = "#F4F7FB";
const green = "#1FA463";
const red = "#D45447";
const gray = "#A9B7C9";

const samePoint = (a: GridPoint, b: GridPoint) =>
  a.x === b.x && a.y === b.y;

const pointKey = (p: GridPoint) => `${p.x},${p.y}`;

const segKey = (s: GridSegment) => {
  const a = pointKey(s.from);
  const b = pointKey(s.to);
  return a < b ? `${a}|${b}` : `${b}|${a}`;
};

function GridBoard({
  cols,
  rows,
  starterSegments = [],
  drawnSegments = [],
  wrongSegment = null,
  selectedPoint = null,
  startPoint = null,
  guidePoints = [],
  onPick,
  interactive,
}: {
  cols: number;
  rows: number;
  starterSegments?: GridSegment[];
  drawnSegments?: GridSegment[];
  wrongSegment?: GridSegment | null;
  selectedPoint?: GridPoint | null;
  startPoint?: GridPoint | null;
  guidePoints?: GridPoint[];
  onPick?: (p: GridPoint) => void;
  interactive?: boolean;
}) {
  const step = 34;
  const pad = 18;
  const width = pad * 2 + cols * step;
  const height = pad * 2 + rows * step;

  const sx = (x: number) => pad + x * step;
  const sy = (y: number) => pad + (rows - y) * step;

  const points: GridPoint[] = [];
  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      points.push({ x, y });
    }
  }

  const renderSeg = (
    s: GridSegment,
    color: string,
    strokeWidth = 5,
    dash: string | undefined = undefined,
  ) => (
    <line
      key={`${segKey(s)}-${color}-${strokeWidth}`}
      x1={sx(s.from.x)}
      y1={sy(s.from.y)}
      x2={sx(s.to.x)}
      y2={sy(s.to.y)}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dash}
    />
  );

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        border: `3px solid ${gold}`,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 10px 24px rgba(27,58,107,.08)",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          background: "#ffffff",
        }}
      >
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={pad}
            y1={pad + i * step}
            x2={pad + cols * step}
            y2={pad + i * step}
            stroke="#D6E1EF"
            strokeWidth="1.2"
          />
        ))}

        {Array.from({ length: cols + 1 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={pad + i * step}
            y1={pad}
            x2={pad + i * step}
            y2={pad + rows * step}
            stroke="#D6E1EF"
            strokeWidth="1.2"
          />
        ))}

        {starterSegments.map((s) => renderSeg(s, navySoft, 4))}
        {drawnSegments.map((s) => renderSeg(s, green, 5))}
        {wrongSegment ? renderSeg(wrongSegment, red, 5, "8 5") : null}

        {startPoint ? (
          <circle
            cx={sx(startPoint.x)}
            cy={sy(startPoint.y)}
            r="7"
            fill={green}
            stroke="#ffffff"
            strokeWidth="3"
          />
        ) : null}

        {guidePoints.map((p, index) => (
          <g
            key={`guide-${index}-${p.x}-${p.y}`}
            style={{ pointerEvents:"none" }}
          >
            <circle
              cx={sx(p.x)}
              cy={sy(p.y)}
              r="13"
              fill="#FFF3B8"
              stroke={gold}
              strokeWidth="4"
            />

            <text
              x={sx(p.x)}
              y={sy(p.y) + 5}
              textAnchor="middle"
              fontSize="13"
              fontWeight="900"
              fill={navy}
            >
              {index + 1}
            </text>
          </g>
        ))}

        {selectedPoint ? (
          <circle
            cx={sx(selectedPoint.x)}
            cy={sy(selectedPoint.y)}
            r="10"
            fill="rgba(232,177,41,.22)"
            stroke={gold}
            strokeWidth="3"
          />
        ) : null}

        {points.map((p) => (
          <g key={pointKey(p)}>
            <circle
              cx={sx(p.x)}
              cy={sy(p.y)}
              r={interactive ? 8 : 5}
              fill="transparent"
              style={{ cursor: interactive ? "pointer" : "default" }}
              onClick={() => interactive && onPick && onPick(p)}
            />
            <circle
              cx={sx(p.x)}
              cy={sy(p.y)}
              r="2.3"
              fill={navy}
              opacity="0.7"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function GridDrawingExerciseV2({
  activity,
  locked = false,
  showResult = false,
  onResult,
  questionId,
}: Props) {
  const [selected, setSelected] = useState<GridPoint | null>(null);
  const [drawn, setDrawn] = useState<GridSegment[]>([]);
  const [drawnKeys, setDrawnKeys] = useState<string[]>([]);
  const [wrong, setWrong] = useState<GridSegment | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSelected(null);
    setDrawn([]);
    setDrawnKeys([]);
    setWrong(null);
    setDone(false);
  }, [questionId, activity]);

  const targetKeySet = useMemo(
    () => new Set(activity.targetSegments.map(segKey)),
    [activity.targetSegments],
  );

  useEffect(() => {
    if (
      !done &&
      drawnKeys.length === activity.targetSegments.length
    ) {
      setDone(true);

      // Submit immediately to UnifiedLessonExercisesV2.
      // The previous timeout was cancelled by the rerender
      // caused by setDone(true), so Q1 never advanced.
      onResult(true);
    }
  }, [
    done,
    drawnKeys.length,
    activity.targetSegments.length,
    onResult,
  ]);

  const handlePick = (p: GridPoint) => {
    if (locked || showResult || done) return;

    if (!selected) {
      setSelected(p);
      return;
    }

    if (samePoint(selected, p)) {
      setSelected(null);
      return;
    }

    const candidate: GridSegment = { from: selected, to: p };
    const key = segKey(candidate);

    if (targetKeySet.has(key) && !drawnKeys.includes(key)) {
      setDrawn((prev) => [...prev, candidate]);
      setDrawnKeys((prev) => [...prev, key]);
      setWrong(null);
    } else {
      setWrong(candidate);
      onResult(false);
      window.setTimeout(() => setWrong(null), 700);
    }

    setSelected(null);
  };

  const cols = activity.grid.cols;
  const rows = activity.grid.rows;

  const helperText =
    activity.tip ||
    (
      activity.guidePoints?.length
        ? "اِضْغَطْ عَلَى النِّقَاطِ الْمُرَقَّمَةِ بِالتَّرْتِيبِ."
        : "اِخْتَرْ نُقْطَتَيْنِ لِرَسْمِ قِطْعَةٍ مُسْتَقِيمَةٍ."
    );

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gap: 14,
      }}
    >
      <div
        style={{
          border: `3px solid ${gold}`,
          borderRadius: 22,
          background: cream,
          color: navy,
          padding: "12px 14px",
          textAlign: "center",
          fontWeight: 900,
          fontSize: "clamp(16px,4vw,22px)",
          boxShadow: "0 8px 18px rgba(27,58,107,.07)",
        }}
      >
        {helperText}
      </div>

      {activity.modelSegments?.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 14,
          }}
        >
          <div
            style={{
              background: panel,
              border: `3px solid ${gold}`,
              borderRadius: 26,
              padding: 12,
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: navy,
                fontWeight: 900,
                marginBottom: 10,
                fontSize: "clamp(15px,3.7vw,20px)",
              }}
            >
              {activity.modelLabel || "النَّمُوذَجُ"}
            </div>
            <GridBoard
              cols={cols}
              rows={rows}
              starterSegments={activity.modelSegments}
              drawnSegments={[]}
              interactive={false}
            />
          </div>
        </div>
      ) : null}

      <div
        style={{
          background: panel,
          border: `3px solid ${gold}`,
          borderRadius: 26,
          padding: 12,
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: navy,
            fontWeight: 900,
            marginBottom: 10,
            fontSize: "clamp(15px,3.7vw,20px)",
          }}
        >
          {activity.workLabel || "أَرْسُمُ هُنَا"}
        </div>

        <GridBoard
          cols={cols}
          rows={rows}
          starterSegments={activity.starterSegments || []}
          drawnSegments={drawn}
          wrongSegment={wrong}
          selectedPoint={selected}
          startPoint={activity.startPoint || null}
          guidePoints={activity.guidePoints || []}
          onPick={handlePick}
          interactive={!locked && !showResult}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: `2px solid ${gold}`,
            borderRadius: 999,
            padding: "8px 14px",
            color: navy,
            fontWeight: 800,
          }}
        >
          أَنْجَزْتُ: {drawnKeys.length} / {activity.targetSegments.length}
        </div>

        {activity.startPoint ? (
          <div
            style={{
              background: "#fff",
              border: `2px solid ${green}`,
              borderRadius: 999,
              padding: "8px 14px",
              color: green,
              fontWeight: 800,
            }}
          >
            أَبْدَأُ مِنَ النُّقْطَةِ الْخَضْرَاءِ
          </div>
        ) : null}
      </div>
    </div>
  );
}
