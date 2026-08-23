import { useMemo, type ComponentType, type CSSProperties } from "react";
import { DragRoundView, EffortRoundView, PulseImageRoundView } from "./Lesson52PremiumHealthExercisesV2";
import type { UnifiedLessonExerciseRenderContextV2 } from "./UnifiedLessonExercisesV2";
import type { Lesson52UnifiedQuestion } from "../content/lesson52_exercises_unified";

type Ctx = UnifiedLessonExerciseRenderContextV2<Lesson52UnifiedQuestion>;
const card: CSSProperties = { border:"2px solid #DCE8F2", borderRadius:20, background:"rgba(255,255,255,.97)", padding:10, minHeight:110, display:"grid", placeItems:"center", gap:8, cursor:"pointer", boxShadow:"0 6px 18px rgba(20,55,90,.10)" };
const str=(...v:any[])=>{ for(const x of v) if(typeof x==="string"&&x.trim()) return x; return ""; };
function img(o:any){ if(typeof o==="string"&&/\.(webp|png|jpe?g|svg)$/i.test(o)) return o; return str(o?.image,o?.imageSrc,o?.image_src,o?.src,o?.url,o?.asset); }
function label(o:any,i:number){ if(typeof o==="string"&&!/\.(webp|png|jpe?g|svg)$/i.test(o)) return o; return str(o?.label,o?.text,o?.content,o?.value,o?.ariaLabel,o?.aria_label,`الخيار ${i+1}`); }
function correct(raw:any,o:any,i:number){ const ci=raw?.correct_index??raw?.correctIndex; if(typeof ci==="number") return i===ci; const id=raw?.correctId??raw?.correct_id??raw?.answer??raw?.correctAnswer; if(id!=null) return String(o?.id??o?.value??o?.label??i)===String(id); return !!(o&&typeof o==="object"&&o.correct===true); }
function ImageChoice(ctx:Ctx){ const raw=ctx.question.raw??{}; const options=useMemo(()=>Array.from(raw.options??raw.choices??[]),[raw]); return <div dir="rtl" style={{width:"min(820px,96%)",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:12}}>{options.map((o:any,i:number)=>{const src=img(o),lab=label(o,i);return <button key={String(o?.id??o?.value??i)} type="button" disabled={ctx.locked} onClick={()=>ctx.submitResult(correct(raw,o,i))} style={{...card,fontFamily:"inherit",color:"#17365F",fontWeight:900}}>{src?<img src={src} alt="" draggable={false} style={{width:"100%",maxHeight:160,objectFit:raw.image_fit??raw.imageFit??"contain",borderRadius:14}}/>:null}<span>{lab}</span></button>;})}</div>; }
function LegacyVisual(ctx:Ctx){
  const View=(ctx.question.activityKind==="drag-premium"?DragRoundView:ctx.question.activityKind==="effort-premium"?EffortRoundView:PulseImageRoundView) as unknown as ComponentType<any>;
  const yes=()=>ctx.submitResult(true), no=()=>ctx.submitResult(false);
  const result=(v?:any)=>ctx.submitResult(typeof v==="boolean"?v:true);
  const props:any={
    index:ctx.question.roundIndex, roundIndex:ctx.question.roundIndex, questionIndex:ctx.question.roundIndex,
    item:ctx.question.raw, question:ctx.question.raw, locked:ctx.locked, disabled:ctx.locked,
    completeRound:yes, onComplete:yes, onCorrect:yes, success:yes,
    showWrong:no, onWrong:no, onRetry:no, fail:no,
    submitResult:result, onResult:result, onAnswer:result, onSelect:result, onChoose:result, choose:result,
  };
  return <View {...props}/>;
}
export default function Lesson52ActivityAdapterV2(ctx:Ctx){ return ctx.question.activityKind==="image-choice"?<ImageChoice {...ctx}/>:<LegacyVisual {...ctx}/>; }
