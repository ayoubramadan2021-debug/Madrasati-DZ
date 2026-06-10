import { useState, useEffect, useRef, useCallback } from "react";
import {
  DndContext, DragEndEvent, PointerSensor, TouchSensor,
  useSensor, useSensors, useDraggable, useDroppable,
  DragOverlay, DragStartEvent,
} from "@dnd-kit/core";

// ═══════════════════════════════════════════════════════════════
// DragMatchExerciseV2 — ربط مرن (4 أنماط مختلفة)
// أنماط: num→count, count→num, word→count, num→word
// ═══════════════════════════════════════════════════════════════

export type ItemRepresentation =
  | { kind: "number"; value: number }
  | { kind: "count"; value: number; emoji?: string }
  | { kind: "word"; value: string };

export type DragMatchPair = {
  draggable: ItemRepresentation;   // العنصر القابل للسحب
  target: ItemRepresentation;      // العنصر الـtarget
  match_id: string;                // معرّف الزوج (لتحديد التطابق)
};

export type DragMatchItem = {
  question: string;
  question_audio_key: string;
  pairs: DragMatchPair[];          // 3-4 أزواج
};

export interface DragMatchExerciseV2Props {
  items: DragMatchItem[];
  audio_base: string;
  background_image?: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
  greenSoft: "#5BCB8E",
  red: "#D45447",
  redSoft: "#F4C4BE",
};

type WordTiming = { text: string; offset: number; duration: number };

function useKaraoke(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActiveKey(null);
    setCurrentIdx(-1);
  }, []);

  const play = useCallback(async (key: string, words: WordTiming[]) => {
    stop();
    setShown(new Set());
    setActiveKey(key);
    const audio = new Audio(`${audioBase}/${key}.mp3`);
    audioRef.current = audio;
    audio.addEventListener("ended", () => setCurrentIdx(-1));
    try {
      await audio.play();
    } catch {
      const all = new Set<number>();
      words.forEach((_, i) => all.add(i));
      setShown(all);
      return;
    }
    words.forEach((w, i) => {
      const t1 = window.setTimeout(() => {
        setShown((prev) => new Set(prev).add(i));
        setCurrentIdx(i);
      }, w.offset);
      const t2 = window.setTimeout(() => {
        setCurrentIdx((cur) => (cur === i ? -1 : cur));
      }, w.offset + w.duration);
      timersRef.current.push(t1, t2);
    });
  }, [audioBase, stop]);

  useEffect(() => () => stop(), [stop]);
  return { play, stop, activeKey, currentIdx, shown };
}

async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
  try {
    const r = await fetch(`${audioBase}/${key}.json`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

// ─── Helper: render an item representation as visual chip/group ───
function renderRepresentation(rep: ItemRepresentation, size: "sm" | "md" | "lg" = "md") {
  const baseFontSize = size === "lg" ? 36 : size === "md" ? 30 : 22;
  if (rep.kind === "number") {
    return (
      <span style={{ fontSize: baseFontSize + 4, fontWeight: 900, color: C.navyDeep }}>
        {rep.value}
      </span>
    );
  }
  if (rep.kind === "word") {
    return (
      <span style={{ fontSize: 18, fontWeight: 800, color: C.navyDeep, padding: "0 4px" }}>
        {rep.value}
      </span>
    );
  }
  // count → render emojis
  const count = rep.value;
  const emoji = rep.emoji || "🍎";
  const emojiSize = count <= 2 ? 26 : count <= 3 ? 22 : count <= 4 ? 18 : 15;
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", justifyContent: "center",
      gap: 2, alignItems: "center",
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{
          fontSize: emojiSize,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}>{emoji}</span>
      ))}
    </div>
  );
}

// ─── Draggable chip ───
function DraggableChip({
  pair, isMatched,
}: { pair: DragMatchPair; isMatched: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `drag-${pair.match_id}`,
    data: { match_id: pair.match_id },
    disabled: isMatched,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        minWidth: 70, minHeight: 70,
        padding: "6px 14px",
        background: isMatched ? "#E5DCC2" : "white",
        border: `4px solid ${isMatched ? "#B8AB8E" : C.gold}`,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isMatched ? "default" : "grab",
        touchAction: "none",
        opacity: isDragging ? 0.3 : 1,
        boxShadow: isMatched
          ? "0 2px 6px rgba(0,0,0,0.1)"
          : "0 6px 14px rgba(232,160,32,0.35)",
        transition: "opacity 0.2s",
        userSelect: "none",
      }}
    >
      {isMatched ? (
        <span style={{ fontSize: 28, fontWeight: 900, color: "#888" }}>✓</span>
      ) : (
        renderRepresentation(pair.draggable, "md")
      )}
    </div>
  );
}

// ─── Droppable target ───
function DroppableTarget({
  pair, matchedDraggable, isWrong,
}: {
  pair: DragMatchPair;
  matchedDraggable: ItemRepresentation | null;
  isWrong: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `target-${pair.match_id}`,
    data: { match_id: pair.match_id },
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        flex: "1 1 22%",
        minWidth: 80,
        maxWidth: 130,
        background: matchedDraggable !== null
          ? C.greenSoft
          : isOver
          ? "rgba(232,160,32,0.25)"
          : "rgba(255,255,255,0.95)",
        border: `3px solid ${matchedDraggable !== null ? C.green : isOver ? C.gold : "#E0CFA8"}`,
        borderRadius: 18,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        boxShadow: isOver
          ? "0 0 20px rgba(232,160,32,0.5)"
          : "0 4px 12px rgba(0,0,0,0.1)",
        animation: isWrong ? "shake 0.4s ease" : "none",
        transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Target visual */}
      <div style={{
        minHeight: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {renderRepresentation(pair.target, "md")}
      </div>
      {/* Slot */}
      <div style={{
        width: 50, height: 50,
        background: matchedDraggable !== null ? C.green : "rgba(255,255,255,0.5)",
        border: `2px dashed ${matchedDraggable !== null ? C.green : "#B8AB8E"}`,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: matchedDraggable !== null ? "white" : "#B8AB8E",
        transition: "all 0.3s ease",
      }}>
        {matchedDraggable !== null
          ? renderRepresentation(matchedDraggable, "sm")
          : <span style={{ fontSize: 22, fontWeight: 900 }}>؟</span>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════
export default function DragMatchExerciseV2({
  items,
  audio_base,
  background_image = "/lessons/v2/lesson1-numbers-1-5/scene-1-intro.webp",
  onComplete,
}: DragMatchExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [matches, setMatches] = useState<Record<string, ItemRepresentation>>({});
  const [activeDrag, setActiveDrag] = useState<ItemRepresentation | null>(null);
  const [wrongMatchId, setWrongMatchId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "complete">("idle");

  const karaoke = useKaraoke(audio_base);
  const item = items[itemIdx];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 80, tolerance: 6 } })
  );

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base]);

  useEffect(() => {
    karaoke.stop();
    setMatches({});
    setFeedbackState("idle");
    setWrongMatchId(null);
    setActiveDrag(null);
    if (!item) return;
    const t = timings[item.question_audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const replayQuestion = () => {
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  };

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const handleDragStart = (e: DragStartEvent) => {
    const matchId = e.active.data.current?.match_id as string | undefined;
    if (!matchId) return;
    const pair = item.pairs.find((p) => p.match_id === matchId);
    if (pair) setActiveDrag(pair.draggable);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveDrag(null);
    const { active, over } = e;
    if (!over) return;
    const draggedMatchId = active.data.current?.match_id as string | undefined;
    const targetMatchId = over.data.current?.match_id as string | undefined;
    if (!draggedMatchId || !targetMatchId) return;

    if (draggedMatchId === targetMatchId) {
      // صحيح!
      const pair = item.pairs.find((p) => p.match_id === draggedMatchId);
      if (!pair) return;
      const newMatches = { ...matches, [targetMatchId]: pair.draggable };
      setMatches(newMatches);
      playFeedback(true);
      if (Object.keys(newMatches).length === item.pairs.length) {
        setFeedbackState("complete");
        setTimeout(() => {
          if (itemIdx < items.length - 1) setItemIdx(itemIdx + 1);
          else onComplete?.(items.length, items.length);
        }, 1800);
      }
    } else {
      playFeedback(false);
      setWrongMatchId(targetMatchId);
      setTimeout(() => setWrongMatchId(null), 800);
    }
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;
  const matchedIds = new Set(Object.keys(matches));

  return (
    <div style={{
      minHeight: "100dvh",
      width: "100%",
      position: "relative",
      fontFamily: "Tajawal, sans-serif",
      direction: "rtl",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url('${background_image}')`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px) brightness(0.85)",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "78%",
        background: "linear-gradient(180deg, transparent 0%, rgba(255,248,236,0.9) 35%, rgba(247,219,160,0.98) 100%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px",
      }}>
        <button onClick={replayQuestion} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: C.gold, color: "white",
          border: `3px solid ${C.cream}`,
          fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 12px rgba(232,160,32,.4)",
        }}>🔊</button>
        <div style={{ display: "flex", gap: 6 }}>
          {items.map((_, i) => (
            <div key={i} style={{
              width: i === itemIdx ? 24 : 8, height: 8, borderRadius: 4,
              background: i < itemIdx ? C.green : i === itemIdx ? C.gold : "#E0CFA8",
              transition: "all .3s ease",
            }} />
          ))}
        </div>
        <div style={{
          background: C.navy, color: C.cream,
          padding: "6px 12px", borderRadius: 999,
          fontSize: 13, fontWeight: 700,
        }}>{itemIdx + 1} / {items.length}</div>
      </div>

      {/* Question */}
      <div style={{ position: "relative", zIndex: 2, padding: "8px 16px 12px" }}>
        <div onClick={replayQuestion} style={{
          background: "rgba(255,255,255,0.95)",
          border: `2px solid ${C.gold}`,
          borderRadius: 18,
          padding: "12px 16px",
          maxWidth: 400, margin: "0 auto",
          minHeight: 48,
          fontSize: 16, lineHeight: 1.6,
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,.15)",
          cursor: "pointer",
        }}>
          {words ? words.map((w, i) => {
            const isShown = !isActive || karaoke.shown.has(i);
            const isCurrent = isActive && karaoke.currentIdx === i;
            return (
              <span key={i} style={{
                display: "inline-block",
                opacity: isShown ? 1 : 0,
                transform: isCurrent ? "translateY(-3px) scale(1.1)" : "translateY(0)",
                color: isCurrent ? C.gold : C.navyDeep,
                fontWeight: isCurrent ? 900 : 700,
                transition: "all .25s ease",
                margin: "0 2px",
              }}>{w.text} </span>
            );
          }) : <span style={{ opacity: 0.5 }}>...</span>}
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Targets */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "8px 12px",
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
          maxWidth: 480, margin: "0 auto",
          width: "100%",
        }}>
          {item.pairs.map((pair) => (
            <DroppableTarget
              key={pair.match_id}
              pair={pair}
              matchedDraggable={matches[pair.match_id] ?? null}
              isWrong={wrongMatchId === pair.match_id}
            />
          ))}
        </div>

        {/* Draggables row */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "20px 16px 100px",
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}>
          {item.pairs.map((pair) => (
            <DraggableChip
              key={pair.match_id}
              pair={pair}
              isMatched={matchedIds.has(pair.match_id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDrag !== null ? (
            <div style={{
              minWidth: 70, minHeight: 70,
              padding: "6px 14px",
              background: "white",
              border: `4px solid ${C.gold}`,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 24px rgba(232,160,32,0.5)",
              transform: "scale(1.15)",
            }}>{renderRepresentation(activeDrag, "md")}</div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {feedbackState === "complete" && (
        <div style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: C.green, color: "white",
          padding: "16px 28px", borderRadius: 24,
          fontSize: 20, fontWeight: 800,
          boxShadow: "0 12px 32px rgba(0,0,0,.3)",
          zIndex: 100,
          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          pointerEvents: "none", textAlign: "center",
        }}>أَحْسَنْت 🎉</div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes feedbackPop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          60% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}
