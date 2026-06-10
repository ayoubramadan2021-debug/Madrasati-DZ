import { useState, useEffect, useRef, useCallback } from "react";
import {
  DndContext, DragEndEvent, PointerSensor, TouchSensor,
  useSensor, useSensors, useDraggable, useDroppable,
  DragOverlay, DragStartEvent,
} from "@dnd-kit/core";

// ═══════════════════════════════════════════════════════════════
// SortSequenceExerciseV2 — رتّب العناصر
// كل عنصر يمكن أن يكون number أو count (تفاحات) أو word
// الفراغات أفقية (من اليمين لليسار للعربية)
// ═══════════════════════════════════════════════════════════════

export type SortItem =
  | { kind: "number"; value: number }
  | { kind: "count"; value: number; emoji?: string }
  | { kind: "word"; value: string; sort_value: number };

export type SortQuestion = {
  question: string;
  question_audio_key: string;
  items: SortItem[];          // المبعثرة
  direction: "asc" | "desc";  // تصاعدي / تنازلي
};

export interface SortSequenceExerciseV2Props {
  items: SortQuestion[];
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

// ─── Helper: get sort value from any SortItem ───
function getSortValue(item: SortItem): number {
  if (item.kind === "number") return item.value;
  if (item.kind === "count") return item.value;
  return item.sort_value;
}

// ─── Helper: get unique id from SortItem ───
function getItemId(item: SortItem, idx: number): string {
  return `${item.kind}-${item.kind === "word" ? item.value : item.value}-${idx}`;
}

// ─── Helper: render SortItem ───
function renderSortItem(item: SortItem, compact: boolean = false) {
  if (item.kind === "number") {
    return (
      <span style={{
        fontSize: compact ? 28 : 36,
        fontWeight: 900,
        color: C.navyDeep,
      }}>{item.value}</span>
    );
  }
  if (item.kind === "word") {
    return (
      <span style={{
        fontSize: compact ? 14 : 17,
        fontWeight: 800,
        color: C.navyDeep,
        padding: "0 4px",
      }}>{item.value}</span>
    );
  }
  const count = item.value;
  const emoji = item.emoji || "🍎";
  const emojiSize = compact
    ? (count <= 2 ? 16 : count <= 3 ? 13 : count <= 4 ? 11 : 9)
    : (count <= 2 ? 22 : count <= 3 ? 18 : count <= 4 ? 14 : 12);
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", justifyContent: "center",
      gap: 1, alignItems: "center", maxWidth: compact ? 50 : 64,
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ fontSize: emojiSize }}>{emoji}</span>
      ))}
    </div>
  );
}

// ─── Draggable ───
function DraggableSortItem({
  id, item, isPlaced,
}: { id: string; item: SortItem; isPlaced: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { id, sortValue: getSortValue(item), item },
    disabled: isPlaced,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        minWidth: 60, minHeight: 60,
        padding: "8px 10px",
        background: isPlaced ? "#E5DCC2" : "white",
        border: `3px solid ${isPlaced ? "#B8AB8E" : C.gold}`,
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isPlaced ? "default" : "grab",
        touchAction: "none",
        opacity: isDragging ? 0.3 : (isPlaced ? 0.4 : 1),
        boxShadow: isPlaced ? "none" : "0 6px 14px rgba(232,160,32,0.35)",
        userSelect: "none",
      }}
    >
      {renderSortItem(item)}
    </div>
  );
}

// ─── Droppable slot ───
function DroppableSlot({
  slotIdx, placedItem, isWrong, isCorrect,
}: {
  slotIdx: number;
  placedItem: SortItem | null;
  isWrong: boolean;
  isCorrect: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${slotIdx}`,
    data: { slotIdx },
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        width: 64, height: 64,
        background: isCorrect ? C.greenSoft
          : placedItem ? "rgba(255,255,255,0.95)"
          : isOver ? "rgba(232,160,32,0.25)"
          : "rgba(255,255,255,0.55)",
        border: `3px ${placedItem ? "solid" : "dashed"} ${isCorrect ? C.green : isOver ? C.gold : "#B8AB8E"}`,
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isOver ? "0 0 16px rgba(232,160,32,0.5)" : "none",
        animation: isWrong ? "shake 0.4s ease" : "none",
        transition: "background 0.2s, border 0.2s",
      }}
    >
      {placedItem ? (
        renderSortItem(placedItem, true)
      ) : (
        <span style={{ fontSize: 16, color: "#B8AB8E", fontWeight: 700 }}>
          {slotIdx + 1}
        </span>
      )}
    </div>
  );
}

export default function SortSequenceExerciseV2({
  items,
  audio_base,
  background_image = "/lessons/v2/lesson1-numbers-1-5/scene-1-intro.webp",
  onComplete,
}: SortSequenceExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [placements, setPlacements] = useState<Record<number, { id: string; item: SortItem }>>({});
  const [activeDrag, setActiveDrag] = useState<SortItem | null>(null);
  const [wrongSlot, setWrongSlot] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "complete">("idle");

  const karaoke = useKaraoke(audio_base);
  const question = items[itemIdx];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 80, tolerance: 6 } })
  );

  // الترتيب الصحيح (تصاعدي أو تنازلي)
  const sortedItems = question
    ? [...question.items].sort((a, b) => {
        const av = getSortValue(a);
        const bv = getSortValue(b);
        return question.direction === "asc" ? av - bv : bv - av;
      })
    : [];

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base]);

  useEffect(() => {
    karaoke.stop();
    setPlacements({});
    setFeedbackState("idle");
    setWrongSlot(null);
    setActiveDrag(null);
    if (!question) return;
    const t = timings[question.question_audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(question.question_audio_key, t), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const replayQuestion = () => {
    const t = timings[question.question_audio_key];
    if (t) karaoke.play(question.question_audio_key, t);
  };

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const handleDragStart = (e: DragStartEvent) => {
    const itm = e.active.data.current?.item as SortItem | undefined;
    if (itm) setActiveDrag(itm);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveDrag(null);
    const { active, over } = e;
    if (!over) return;
    const draggedId = active.data.current?.id as string | undefined;
    const draggedItem = active.data.current?.item as SortItem | undefined;
    const slotIdx = over.data.current?.slotIdx as number | undefined;
    if (!draggedId || !draggedItem || slotIdx === undefined) return;

    // التحقق: هل العنصر الصحيح في هذا الـslot؟
    const expectedItem = sortedItems[slotIdx];
    const isCorrect = getSortValue(draggedItem) === getSortValue(expectedItem);

    if (isCorrect && !placements[slotIdx]) {
      const newPlacements = { ...placements, [slotIdx]: { id: draggedId, item: draggedItem } };
      setPlacements(newPlacements);
      playFeedback(true);
      if (Object.keys(newPlacements).length === sortedItems.length) {
        setFeedbackState("complete");
        setTimeout(() => {
          if (itemIdx < items.length - 1) setItemIdx(itemIdx + 1);
          else onComplete?.(items.length, items.length);
        }, 1800);
      }
    } else {
      playFeedback(false);
      setWrongSlot(slotIdx);
      setTimeout(() => setWrongSlot(null), 800);
    }
  };

  if (!question) return null;
  const words = timings[question.question_audio_key];
  const isActive = karaoke.activeKey === question.question_audio_key;
  const placedIds = new Set(Object.values(placements).map((p) => p.id));

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
        {/* Direction indicator + slots row */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: C.navy,
            background: "rgba(255,255,255,0.7)",
            padding: "4px 10px", borderRadius: 999,
          }}>
            {question.direction === "asc" ? "← من الأصغر إلى الأكبر" : "← من الأكبر إلى الأصغر"}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "nowrap",
            maxWidth: "100%",
            overflowX: "auto",
            padding: "8px 4px",
          }}>
            {sortedItems.map((_, slotIdx) => (
              <DroppableSlot
                key={slotIdx}
                slotIdx={slotIdx}
                placedItem={placements[slotIdx]?.item ?? null}
                isWrong={wrongSlot === slotIdx}
                isCorrect={!!placements[slotIdx]}
              />
            ))}
          </div>
        </div>

        {/* Draggables (scrambled) */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "16px 16px 100px",
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}>
          {question.items.map((it, idx) => {
            const id = getItemId(it, idx);
            return (
              <DraggableSortItem
                key={id}
                id={id}
                item={it}
                isPlaced={placedIds.has(id)}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeDrag !== null ? (
            <div style={{
              minWidth: 60, minHeight: 60,
              padding: "8px 10px",
              background: "white",
              border: `3px solid ${C.gold}`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 24px rgba(232,160,32,0.5)",
              transform: "scale(1.15)",
            }}>{renderSortItem(activeDrag)}</div>
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
