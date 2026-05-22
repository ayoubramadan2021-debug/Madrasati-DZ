import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');",
".ed-root *{box-sizing:border-box;margin:0;padding:0}",
".ed-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;padding:16px 14px 120px;position:relative}",
".ed-head{text-align:center;margin-bottom:8px}",
".ed-title{font-size:22px;font-weight:900;background:var(--title-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".ed-sub{font-size:13px;color:var(--text-faint);margin-top:2px}",
".ed-card{background:var(--surface);border:1px solid var(--border);border-radius:22px;padding:18px;margin-top:16px;box-shadow:var(--shadow-card)}",
".ed-q{font-size:16px;font-weight:800;color:var(--text);text-align:center;margin-bottom:18px}",
".ed-rows{display:flex;flex-direction:column;gap:14px}",
".ed-row{display:flex;align-items:center;justify-content:space-between;gap:10px}",
".ed-set{flex:1;display:flex;align-items:center;gap:5px;flex-wrap:wrap;background:var(--surface-soft);border:1.5px solid var(--border);border-radius:14px;padding:12px;min-height:62px}",
".ed-emoji{font-size:26px}",
".ed-slot{width:62px;height:62px;border-radius:50%;border:2.5px dashed var(--gold-border);display:grid;place-items:center;flex-shrink:0;transition:all .25s;background:var(--gold-soft)}",
".ed-slot.filled{border-style:solid;border-color:var(--gold)}",
".ed-slot.correct{border-color:#22C55E;background:rgba(34,197,94,.15)}",
".ed-slot.wrong{border-color:#ef4444;background:rgba(239,68,68,.12);animation:ed-shake .4s}",
"@keyframes ed-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}",
".ed-slot-num{font-size:26px;font-weight:900;color:var(--gold)}",
".ed-slot.correct .ed-slot-num{color:#22C55E}",
".ed-bank{display:flex;justify-content:center;gap:14px;margin-top:22px;flex-wrap:wrap}",
".ed-chip{width:60px;height:60px;border-radius:50%;background:linear-gradient(145deg,var(--gold),var(--gold-deep));display:grid;place-items:center;font-size:26px;font-weight:900;color:#3a2400;cursor:grab;box-shadow:0 5px 16px var(--gold-glow);touch-action:none;user-select:none;transition:transform .15s,opacity .2s}",
".ed-chip:active{cursor:grabbing;transform:scale(1.12)}",
".ed-chip.used{opacity:.25;pointer-events:none}",
".ed-chip.dragging{position:fixed;z-index:999;pointer-events:none;transform:scale(1.15)}",
".ed-done{margin-top:20px;padding:15px;border:none;border-radius:16px;background:linear-gradient(135deg,#22C55E,#16a34a);color:#fff;font-family:'Tajawal',sans-serif;font-size:16px;font-weight:800;width:100%;cursor:pointer;box-shadow:0 6px 20px rgba(34,197,94,.35);transition:transform .15s,opacity .2s}",
".ed-done:active{transform:scale(.97)}",
".ed-done:disabled{opacity:.4;pointer-events:none}",
".ed-result{text-align:center;margin-top:18px;font-size:17px;font-weight:800;min-height:24px}",
".ed-back{position:absolute;top:16px;left:14px;background:var(--surface-soft);border:1px solid var(--border);color:var(--text-muted);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;z-index:5}",
".ed-celebrate{position:fixed;inset:0;pointer-events:none;z-index:1000;display:grid;place-items:center}",
".ed-cele-emoji{font-size:90px;animation:ed-pop .6s cubic-bezier(.34,1.56,.64,1)}",
"@keyframes ed-pop{0%{transform:scale(0) rotate(-30deg);opacity:0}60%{transform:scale(1.2) rotate(8deg)}100%{transform:scale(1) rotate(0);opacity:1}}",
].join("\n");

// التمرين: 3 مجموعات، الطفل يسحب الرقم الصحيح لكل مجموعة
const GROUPS = [
  { emoji: "🍎", count: 3 },
  { emoji: "🌸", count: 5 },
  { emoji: "🐱", count: 1 },
];
const CHIPS = [3, 5, 1]; // الأرقام المتاحة (مخلوطة)

export default function ExerciseDemoPage() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<(number | null)[]>([null, null, null]);
  const [checked, setChecked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [drag, setDrag] = useState<{ num: number; x: number; y: number } | null>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const usedNums = slots.filter((s) => s !== null) as number[];
  const allFilled = slots.every((s) => s !== null);

  function startDrag(num: number, e: React.TouchEvent | React.MouseEvent) {
    if (checked) return;
    const p = "touches" in e ? e.touches[0] : e;
    setDrag({ num, x: p.clientX, y: p.clientY });
  }

  useEffect(() => {
    if (!drag) return;
    function move(e: TouchEvent | MouseEvent) {
      const p = "touches" in e ? e.touches[0] : e;
      setDrag((d) => (d ? { ...d, x: p.clientX, y: p.clientY } : null));
    }
    function end(e: TouchEvent | MouseEvent) {
      const p = "changedTouches" in e ? e.changedTouches[0] : (e as MouseEvent);
      slotRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (p.clientX >= r.left && p.clientX <= r.right && p.clientY >= r.top && p.clientY <= r.bottom) {
          setSlots((prev) => {
            const next = [...prev];
            // أزل الرقم من أي خانة أخرى
            for (let j = 0; j < next.length; j++) if (next[j] === drag!.num) next[j] = null;
            next[i] = drag!.num;
            return next;
          });
        }
      });
      setDrag(null);
    }
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mousemove", move);
    window.addEventListener("touchend", end);
    window.addEventListener("mouseup", end);
    return () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchend", end);
      window.removeEventListener("mouseup", end);
    };
  }, [drag]);

  function check() {
    setChecked(true);
    const allCorrect = GROUPS.every((g, i) => slots[i] === g.count);
    if (allCorrect) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1800);
    }
  }

  function reset() {
    setSlots([null, null, null]);
    setChecked(false);
  }

  const allCorrect = checked && GROUPS.every((g, i) => slots[i] === g.count);

  return (
    <>
      <style>{CSS}</style>
      <div className="ed-root">
        <button className="ed-back" onClick={() => navigate("/")}>← رجوع</button>
        <div className="ed-head" style={{ marginTop: 8 }}>
          <div className="ed-title">تمارين الأعداد</div>
          <div className="ed-sub">السنة الأولى ابتدائي</div>
        </div>

        <div className="ed-card">
          <div className="ed-q">اسحب العدد المطابق لكل مجموعة</div>
          <div className="ed-rows">
            {GROUPS.map((g, i) => {
              const cls = checked ? (slots[i] === g.count ? "correct" : "wrong") : slots[i] !== null ? "filled" : "";
              return (
                <div className="ed-row" key={i}>
                  <div className="ed-set">
                    {Array.from({ length: g.count }).map((_, k) => (
                      <span className="ed-emoji" key={k}>{g.emoji}</span>
                    ))}
                  </div>
                  <div className={"ed-slot " + cls} ref={(el) => (slotRefs.current[i] = el)}>
                    {slots[i] !== null && <span className="ed-slot-num">{slots[i]}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ed-bank">
            {CHIPS.map((n, i) => (
              <div
                key={i}
                className={"ed-chip " + (usedNums.includes(n) ? "used" : "")}
                onTouchStart={(e) => startDrag(n, e)}
                onMouseDown={(e) => startDrag(n, e)}
              >
                {n}
              </div>
            ))}
          </div>

          {!checked ? (
            <button className="ed-done" disabled={!allFilled} onClick={check}>تحقّق ✓</button>
          ) : (
            <button className="ed-done" style={{ background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#3a2400" }} onClick={reset}>أعد المحاولة ↻</button>
          )}

          <div className="ed-result" style={{ color: allCorrect ? "#22C55E" : checked ? "#ef4444" : "transparent" }}>
            {checked ? (allCorrect ? "أحسنت! إجابة صحيحة 🎉" : "حاول مرة أخرى 💪") : "."}
          </div>
        </div>
      </div>

      {drag && (
        <div className="ed-chip dragging" style={{ left: drag.x - 30, top: drag.y - 30 }}>{drag.num}</div>
      )}
      {celebrate && (
        <div className="ed-celebrate"><div className="ed-cele-emoji">🎉</div></div>
      )}
    </>
  );
}
