import { useState, useEffect, useRef } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type Hotspot = {
  id?: string;
  emoji?: string;
  image?: string;
  label: any;
  speak: any;
  sfx?: string;
  voice?: string;
  x: number; y: number;
  width?: number; height?: number;
};

export interface IntroSceneProps {
  narrator: any;
  hotspots: Hotspot[];
  background_image?: string;
  onDone?: () => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";

function speak(text: string, lang: string, character?: string) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const target = lang === "fr" ? "fr" : "ar";
    u.lang = lang === "fr" ? "fr-FR" : "ar-SA";
    const voices = window.speechSynthesis.getVoices();
    const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(target));
    const isLeila = character === "leila";
    const isAmine = character === "amine";
    const femHint = /female|woman|leila|salma|amira|hoda|google.*ar|samira|zariyah/i;
    const malHint = /male|man|amine|fahed|naayf|tarik/i;
    let pick: SpeechSynthesisVoice | undefined;
    if (isLeila) pick = langVoices.find((v) => femHint.test(v.name));
    if (isAmine) pick = langVoices.find((v) => malHint.test(v.name));
    if (!pick) pick = langVoices.find((v) => /google|microsoft|enhanced|premium/i.test(v.name)) || langVoices[0];
    if (pick) u.voice = pick;
    u.rate = 0.78;
    u.pitch = isLeila ? 1.6 : isAmine ? 1.35 : 1.15;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

function playSfx(url?: string) {
  if (!url) return;
  try { const a = new Audio(url); a.volume = 0.6; a.play().catch(() => {}); } catch (e) {}
}

export default function IntroScene({ narrator, hotspots, background_image, onDone }: IntroSceneProps) {
  const { t, lang } = useLang();
  const [found, setFound] = useState<boolean[]>(() => hotspots.map(() => false));
  const [bubble, setBubble] = useState<string | null>(null);
  const [imgOk, setImgOk] = useState<boolean[]>(() => hotspots.map(() => true));
  const [bgOk, setBgOk] = useState(true);
  const [burst, setBurst] = useState<{ x: number; y: number; id: number } | null>(null);
  const burstId = useRef(0);

  useEffect(() => {
    const txt = pickLang(narrator, lang);
    const charge = () => { if (txt) speak(txt, lang, (narrator && narrator.voice) || undefined); };
    // الأصوات تُحمّل بشكل غير متزامن أحيانًا
    if (window.speechSynthesis && window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = charge;
      setTimeout(charge, 400);
    } else charge();
    return () => { try { window.speechSynthesis.cancel(); } catch (e) {} };
  }, []);

  const tap = (i: number, ev: React.MouseEvent) => {
    const h = hotspots[i];
    playSfx(h.sfx);
    const word = pickLang(h.speak || h.label, lang);
    speak(word, lang, h.voice);
    setBubble(pickLang(h.label, lang));
    setFound((prev) => prev.map((v, idx) => (idx === i ? true : v)));
    // فرقعة نجوم عند العنصر
    const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    burstId.current += 1;
    setBurst({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, id: burstId.current });
    setTimeout(() => setBubble(null), 1800);
    setTimeout(() => setBurst((b) => (b && b.id === burstId.current ? null : b)), 700);
  };

  const allFound = found.every(Boolean);

  return (
    <div dir="rtl" style={{ fontFamily: "Tajawal,Cairo,system-ui,sans-serif", maxWidth: 480, margin: "0 auto", padding: "16px 14px 120px", color: "#fff" }}>
      {/* المعلّم الروبوت */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg," + NAVY + ",#0c1e3a)", border: "1px solid rgba(232,160,32,.4)", borderRadius: 18, padding: "14px 16px", marginBottom: 16, boxShadow: "0 6px 20px rgba(0,0,0,.3)" }}>
        <div style={{ fontSize: 38, flexShrink: 0, animation: "intro-bob 3s ease-in-out infinite" }}>🤖</div>
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.6 }}>{pickLang(narrator, lang)}</div>
      </div>

      {/* مشهد القسم */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", background: (background_image && bgOk) ? "#cfe5fb" : "linear-gradient(180deg,#dfeefe 0%,#cfe5fb 55%,#bfd9a8 55%,#aecf94 100%)", borderRadius: 20, overflow: "hidden", border: "3px solid " + NAVY, boxShadow: "0 10px 30px rgba(0,0,0,.35)" }}>
        {background_image && bgOk && (
          <img src={background_image} onError={() => setBgOk(false)} onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity .4s ease" }} />
        )}
        {(!background_image || !bgOk) && (
          <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: "55%", height: "20%", background: "#2c5234", borderRadius: 8, border: "4px solid #8a5a2b" }} />
        )}

        {hotspots.map((h, i) => {
          const useImg = h.image && imgOk[i];
          const w = h.width ? h.width + "%" : "auto";
          const hh = h.height ? h.height + "%" : "auto";
          return (
            <button key={i} onClick={(e) => tap(i, e)} style={{ position: "absolute", left: h.x + "%", top: h.y + "%", transform: "translate(-50%,-50%)", background: "none", border: "none", padding: 0, cursor: "pointer", width: useImg ? w : "auto", height: useImg ? hh : "auto", fontSize: useImg ? 0 : 44, filter: found[i] ? "drop-shadow(0 0 12px rgba(34,197,94,.95))" : "drop-shadow(0 0 9px rgba(232,160,32,.85))", animation: found[i] ? "none" : "intro-pulse 1.8s ease-in-out infinite", transition: "transform .15s" }}>
              {useImg ? (
                <img src={h.image} onError={() => setImgOk((p) => p.map((v, idx) => idx === i ? false : v))} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }} />
              ) : (h.emoji || "❓")}
              {found[i] && <span style={{ position: "absolute", top: -6, right: -6, fontSize: 18 }}>✅</span>}
            </button>
          );
        })}

        {bubble && (
          <div style={{ position: "absolute", bottom: "6%", left: "50%", transform: "translateX(-50%)", background: GOLD, color: "#000", fontWeight: 800, fontSize: 20, padding: "10px 24px", borderRadius: 999, boxShadow: "0 6px 18px rgba(0,0,0,.3)", animation: "intro-pop .35s cubic-bezier(.34,1.56,.64,1)" }}>{bubble}</div>
        )}
      </div>

      {/* فرقعة نجوم */}
      {burst && (
        <div style={{ position: "fixed", left: burst.x, top: burst.y, pointerEvents: "none", zIndex: 50 }}>
          {["✨","⭐","🌟","✨","⭐","🌟"].map((s, k) => (
            <span key={k} style={{ position: "absolute", fontSize: 20, animation: "intro-burst .7s ease-out forwards", transform: "rotate(" + (k * 60) + "deg)", ["--a" as any]: (k * 60) + "deg" }}>{s}</span>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: NAVY, fontWeight: 700 }}>{found.filter(Boolean).length} / {hotspots.length}</div>

      <button onClick={() => { try { window.speechSynthesis.cancel(); } catch (e) {} onDone?.(); }} disabled={!allFound} style={{ width: "100%", height: 56, marginTop: 16, fontSize: 18, fontWeight: 800, color: allFound ? "#000" : "#fff", background: allFound ? "linear-gradient(135deg," + GOLD + ",#c9810a)" : "#9aa3b2", border: "none", borderRadius: 16, cursor: allFound ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: allFound ? "0 6px 18px rgba(232,160,32,.4)" : "none" }}>
        {allFound ? t("cheer_continue") : pickLang({ar:"اكْتَشِفْ كُلَّ العَناصِر أَوّلاً",fr:"Découvre tous les éléments"}, lang)}
      </button>

      <style>{"@keyframes intro-pulse{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.12)}}@keyframes intro-pop{from{transform:translateX(-50%) scale(.6);opacity:0}to{transform:translateX(-50%) scale(1);opacity:1}}@keyframes intro-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes intro-burst{0%{opacity:1;transform:translate(0,0) scale(.5)}100%{opacity:0;transform:translate(calc(cos(var(--a))*60px),calc(sin(var(--a))*60px)) scale(1.3)}}"}</style>
    </div>
  );
}
