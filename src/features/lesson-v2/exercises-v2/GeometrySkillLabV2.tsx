// GEOMETRY_HOTFIX_V1_2: complete polygons + drag missing side
import { useEffect, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

type ShapeName = "square" | "rectangle" | "triangle";
type MissingSide = "top" | "right" | "bottom" | "left";

export type GeometryActivityDataV2 =
  | { mode:"identify"; visual:string; options:[string,string][]; answer:number }
  | { mode:"number"; visual:string; numbers:number[]; answer:number }
  | { mode:"classify"; visual:string; bins:[string,string][]; answer:number }
  | { mode:"featureTap"; shape:"cube"; feature:"face"|"vertex"|"edge" }
  | { mode:"tapVertices"; shape:ShapeName; target:number }
  | { mode:"yesNo"; visual:string; answer:boolean }
  | { mode:"compose"; visual:string; parts:[string,string][]; answer:number[] }
  | { mode:"identifyIncomplete"; shape:ShapeName; missing:MissingSide; options:[string,string][]; answer:number }
  | { mode:"sideChoice"; shape:ShapeName; missing:MissingSide; options:string[]; answer:number }
  | { mode:"completeSegment"; shape:ShapeName; missing:MissingSide; segments:string[]; answer:number }
  | { mode:"tapEndpoints"; shape:ShapeName; missing:MissingSide }
  | { mode:"drawMissingSide"; shape:ShapeName; missing:MissingSide; name:string };

type Props = {
  activity: GeometryActivityDataV2;
  locked: boolean;
  showResult: boolean;
  onResult: (correct:boolean)=>void;
};

const A=(k:string)=>`/lessons/v2/geometry-skilllab/${k}.webp`;

function Asset({keyName,size=86}:{keyName:string;size?:number}) {
  const keys=String(keyName).split("+").slice(0,2);
  return <div style={{display:"flex",gap:6,justifyContent:"center",alignItems:"center"}}>
    {keys.map(k=><img key={k} src={A(k)} alt="" draggable={false}
      style={{width:keys.length>1?size*.68:size,height:keys.length>1?size*.68:size,objectFit:"contain"}} />)}
  </div>;
}

const card:CSSProperties={
  minHeight:140,borderRadius:26,border:"2px solid #DCE7EF",background:"#fff",
  boxShadow:"0 9px 22px rgba(23,54,95,.08)",display:"grid",placeItems:"center",
  padding:10,fontFamily:"inherit",fontWeight:900,color:"#17365F",
  fontSize:"clamp(17px,4.6vw,24px)",textAlign:"center"
};

function ShapeSvg({
  shape, missing, tappableVertices=false, onVertex, selected=[],
  endpoints=false, onEndpoint, completed=false,
}:{
  shape:ShapeName; missing?:MissingSide; tappableVertices?:boolean;
  onVertex?:(i:number)=>void; selected?:number[];
  endpoints?:boolean; onEndpoint?:(i:number)=>void; completed?:boolean;
}) {
  const stroke="#236FA4";

  const pts =
    shape==="triangle"
      ? [[128,34],[34,204],[222,204]]
      : shape==="rectangle"
        ? [[26,64],[230,64],[230,192],[26,192]]
        : [[48,48],[208,48],[208,208],[48,208]];

  const edges =
    shape==="triangle"
      ? [[0,1],[1,2],[2,0]]
      : [[0,1],[1,2],[2,3],[3,0]];

  let omit=-1;

  if(missing){
    if(shape==="triangle"){
      omit=missing==="right" ? 2 : 0;
    } else {
      if(missing==="top") omit=0;
      if(missing==="right") omit=1;
      if(missing==="bottom") omit=2;
      if(missing==="left") omit=3;
    }
  }

  const missingEdge=omit>=0 ? edges[omit] : null;

  return (
    <svg viewBox="0 0 256 256" style={{width:"100%",maxWidth:285,height:230,touchAction:"manipulation"}}>
      {edges.map(([a,b],i)=>{
        if(i===omit && !completed) return null;
        const p1=pts[a],p2=pts[b];
        return <line key={i} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]}
          stroke={stroke} strokeWidth="11" strokeLinecap="round"/>;
      })}
      {endpoints && !completed && missingEdge && missingEdge.map((v,j)=>{
        const p=pts[v];
        return <circle key={j} cx={p[0]} cy={p[1]} r="17"
          fill={selected.includes(j)?"#55B979":"#E34F5F"} stroke="#fff" strokeWidth="6"
          onClick={()=>onEndpoint?.(j)} style={{cursor:"pointer"}}/>;
      })}
      {tappableVertices && pts.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="16"
        fill={selected.includes(i)?"#55B979":"#F6C744"} stroke="#fff" strokeWidth="5"
        onClick={()=>onVertex?.(i)} style={{cursor:"pointer"}}/>)}
    </svg>
  );
}

function missingGeometry(shape:ShapeName,missing:MissingSide) {
  const pts =
    shape==="triangle"
      ? [[128,34],[34,204],[222,204]]
      : shape==="rectangle"
        ? [[26,64],[230,64],[230,192],[26,192]]
        : [[48,48],[208,48],[208,208],[48,208]];

  const edges =
    shape==="triangle"
      ? [[0,1],[1,2],[2,0]]
      : [[0,1],[1,2],[2,3],[3,0]];

  let omit=0;
  if(shape==="triangle"){
    omit=missing==="right" ? 2 : 0;
  } else {
    if(missing==="top") omit=0;
    if(missing==="right") omit=1;
    if(missing==="bottom") omit=2;
    if(missing==="left") omit=3;
  }

  return {pts,edges,omit,missingEdge:edges[omit]};
}

function DragMissingSide({
  shape,missing,solved,disabled,onSolved,
}:{
  shape:ShapeName; missing:MissingSide; solved:boolean; disabled:boolean; onSolved:()=>void;
}) {
  const [dragging,setDragging]=useState(false);
  const [dragFrom,setDragFrom]=useState<0|1|null>(null);
  const [cursor,setCursor]=useState<[number,number]|null>(null);
  const g=missingGeometry(shape,missing);
  const a=g.pts[g.missingEdge[0]];
  const b=g.pts[g.missingEdge[1]];

  const toPoint=(e:ReactPointerEvent<SVGSVGElement>):[number,number]=>{
    const r=e.currentTarget.getBoundingClientRect();
    return [(e.clientX-r.left)*256/r.width,(e.clientY-r.top)*256/r.height];
  };
  const distance=(p:[number,number],q:number[])=>Math.hypot(p[0]-q[0],p[1]-q[1]);

  const down=(e:ReactPointerEvent<SVGSVGElement>)=>{
    if(disabled||solved) return;
    const p=toPoint(e);
    const fromA=distance(p,a)<=34;
    const fromB=distance(p,b)<=34;

    if(fromA||fromB){
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragFrom(fromA ? 0 : 1);
      setDragging(true);
      setCursor(p);
    }
  };
  const move=(e:ReactPointerEvent<SVGSVGElement>)=>{
    if(!dragging||disabled||solved) return;
    setCursor(toPoint(e));
  };
  const up=(e:ReactPointerEvent<SVGSVGElement>)=>{
    if(!dragging||disabled||solved) return;
    const p=toPoint(e);
    const target=dragFrom===1 ? a : b;
    setDragging(false);
    setDragFrom(null);
    setCursor(null);
    if(distance(p,target)<=38) onSolved();
  };

  return (
    <div style={{display:"grid",placeItems:"center",gap:8}}>
      <svg viewBox="0 0 256 256" onPointerDown={down} onPointerMove={move} onPointerUp={up}
        onPointerCancel={()=>{setDragging(false);setDragFrom(null);setCursor(null)}}
        style={{width:"100%",maxWidth:300,height:240,touchAction:"none",background:"#F8FBFE",border:"2px solid #DFEAF3",borderRadius:26}}>
        {g.edges.map(([x,y],i)=>{
          if(i===g.omit && !solved) return null;
          const p1=g.pts[x],p2=g.pts[y];
          return <line key={i} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]}
            stroke="#236FA4" strokeWidth="11" strokeLinecap="round"/>;
        })}
        {!solved && <>
          <circle cx={a[0]} cy={a[1]} r="18" fill="#E34F5F" stroke="#fff" strokeWidth="6"/>
          <circle cx={b[0]} cy={b[1]} r="18" fill="#E34F5F" stroke="#fff" strokeWidth="6"/>
        </>}
        {dragging && cursor && dragFrom!==null && <line
          x1={(dragFrom===0?a:b)[0]} y1={(dragFrom===0?a:b)[1]} x2={cursor[0]} y2={cursor[1]}
          stroke="#F0B828" strokeWidth="12" strokeLinecap="round"/>}
      </svg>
      <div dir="rtl" style={{fontWeight:900,color:"#52697A",textAlign:"center"}}>
        اسْحَبْ مِنَ النُّقْطَةِ الْحَمْرَاءِ إِلَى النُّقْطَةِ الْأُخْرَى.
      </div>
    </div>
  );
}

function CubeFeatureSvg({feature,onHit}:{feature:"face"|"vertex"|"edge";onHit:()=>void}) {
  return <svg viewBox="0 0 256 256" style={{width:"100%",maxWidth:290,height:230}}>
    <polygon points="55,91 150,91 150,187 55,187" fill="#79C2EE" stroke="#245F94" strokeWidth="7"/>
    <polygon points="55,91 91,55 186,55 150,91" fill="#A7D9F5" stroke="#245F94" strokeWidth="7"/>
    <polygon points="150,91 186,55 186,151 150,187" fill="#4E9ED3" stroke="#245F94" strokeWidth="7"/>
    {feature==="face" && <polygon points="65,101 140,101 140,177 65,177"
      fill="rgba(246,199,68,.55)" stroke="#E3A91F" strokeWidth="6" onClick={onHit}/>}
    {feature==="vertex" && <circle cx="55" cy="91" r="18"
      fill="#F6C744" stroke="#fff" strokeWidth="6" onClick={onHit}/>}
    {feature==="edge" && <line x1="55" y1="187" x2="150" y2="187"
      stroke="#F6C744" strokeWidth="19" strokeLinecap="round" onClick={onHit}/>}
  </svg>;
}

export default function GeometrySkillLabV2({activity,locked,onResult}:Props) {
  const [selected,setSelected]=useState<number[]>([]);
  const [solved,setSolved]=useState(false);

  useEffect(()=>{setSelected([]);setSolved(false)},[activity]);

  const submit=(ok:boolean)=>{
    if(locked||solved) return;
    if(ok) setSolved(true);
    onResult(ok);
  };

  if(activity.mode==="featureTap"){
    return <div style={{display:"grid",placeItems:"center",gap:10}}>
      <CubeFeatureSvg feature={activity.feature} onHit={()=>submit(true)}/>
      <div style={{fontWeight:900,color:"#52697A"}}>اِلْمَسِ الْجُزْءَ الْمُضِيءَ.</div>
    </div>;
  }

  if(activity.mode==="tapVertices"){
    const hit=(i:number)=>{
      if(locked||solved||selected.includes(i)) return;
      const next=[...selected,i];
      setSelected(next);
      if(next.length===activity.target){setSolved(true);onResult(true)}
    };
    return <div style={{display:"grid",placeItems:"center",gap:8}}>
      <ShapeSvg shape={activity.shape} tappableVertices onVertex={hit} selected={selected}/>
      <div style={{fontWeight:900,color:"#52697A"}}>{selected.length} / {activity.target}</div>
    </div>;
  }

  if(activity.mode==="tapEndpoints"){
    const hit=(i:number)=>{
      if(locked||solved||selected.includes(i)) return;
      const next=[...selected,i];
      setSelected(next);
      if(next.length===2){
        setSolved(true);
        setTimeout(()=>onResult(true),220);
      }
    };
    return <div style={{display:"grid",placeItems:"center",gap:8}}>
      <ShapeSvg shape={activity.shape} missing={activity.missing}
        endpoints onEndpoint={hit} selected={selected} completed={solved}/>
      <div style={{fontWeight:900,color:"#52697A"}}>اِلْمَسِ النُّقْطَتَيْنِ الْحَمْرَاوَيْنِ.</div>
    </div>;
  }

  if(activity.mode==="drawMissingSide"){
    return <div style={{display:"grid",gap:10}}>
      <DragMissingSide shape={activity.shape} missing={activity.missing}
        solved={solved} disabled={locked}
        onSolved={()=>{
          if(locked||solved) return;
          setSolved(true);
          setTimeout(()=>onResult(true),250);
        }}/>
      {solved && <div dir="rtl" style={{textAlign:"center",fontWeight:950,fontSize:28,color:"#17365F"}}>
        {activity.name}
      </div>}
    </div>;
  }

  if(activity.mode==="identifyIncomplete" || activity.mode==="sideChoice" || activity.mode==="completeSegment"){
    return <div style={{display:"grid",gap:14}}>
      <div style={{background:"#F8FBFE",border:"2px solid #DFEAF3",borderRadius:26,padding:8}}>
        <ShapeSvg shape={activity.shape} missing={activity.missing}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:10}}>
        {activity.mode==="identifyIncomplete" && activity.options.map((o,i)=>
          <button key={i} disabled={locked||solved} onClick={()=>submit(i===activity.answer)} style={card}>
            <Asset keyName={o[1]} size={72}/><span>{o[0]}</span>
          </button>)}
        {activity.mode==="sideChoice" && activity.options.map((o,i)=>
          <button key={i} disabled={locked||solved} onClick={()=>submit(i===activity.answer)}
            style={{...card,minHeight:102}}>{o}</button>)}
        {activity.mode==="completeSegment" && activity.segments.map((s,i)=>
          <button key={i} disabled={locked||solved} onClick={()=>submit(i===activity.answer)} style={card}>
            <Asset keyName={s} size={88}/>
          </button>)}
      </div>
    </div>;
  }

  if(activity.mode==="compose"){
    const toggle=(i:number)=>{
      if(locked||solved) return;
      const next=selected.includes(i)?selected.filter(x=>x!==i):[...selected,i].slice(-2);
      setSelected(next);
      if(next.length===2){
        const a=[...next].sort().join(",");
        const b=[...activity.answer].sort().join(",");
        const ok=a===b;
        if(ok) setSolved(true);
        onResult(ok);
      }
    };
    return <div style={{display:"grid",gap:14}}>
      <div style={{background:"#F8FBFE",border:"2px solid #DFEAF3",borderRadius:26,padding:12}}>
        <Asset keyName={activity.visual} size={118}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:10}}>
        {activity.parts.map((p,i)=><button key={i} disabled={locked||solved} onClick={()=>toggle(i)}
          style={{...card,border:selected.includes(i)?"4px solid #F0B828":"2px solid #DCE7EF"}}>
          <Asset keyName={p[1]} size={72}/><span>{p[0]}</span>
        </button>)}
      </div>
    </div>;
  }

  if(activity.mode==="yesNo"){
    return <div style={{display:"grid",gap:16}}>
      <div style={{background:"#F8FBFE",border:"2px solid #DFEAF3",borderRadius:26,padding:12}}>
        <Asset keyName={activity.visual} size={118}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <button style={{...card,minHeight:105}} disabled={locked||solved} onClick={()=>submit(activity.answer===true)}>نَعَمْ</button>
        <button style={{...card,minHeight:105}} disabled={locked||solved} onClick={()=>submit(activity.answer===false)}>لَا</button>
      </div>
    </div>;
  }

  if(activity.mode==="number"){
    return <div style={{display:"grid",gap:16}}>
      <div style={{background:"#F8FBFE",border:"2px solid #DFEAF3",borderRadius:26,padding:12}}>
        <Asset keyName={activity.visual} size={118}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9}}>
        {activity.numbers.map(n=><button key={n} disabled={locked||solved} onClick={()=>submit(n===activity.answer)}
          style={{...card,minHeight:86,fontSize:32}}>{n}</button>)}
      </div>
    </div>;
  }

  if(activity.mode==="classify"){
    return <div style={{display:"grid",gap:16}}>
      <div style={{background:"#F8FBFE",border:"2px solid #DFEAF3",borderRadius:26,padding:12}}>
        <Asset keyName={activity.visual} size={118}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {activity.bins.map((b,i)=><button key={i} disabled={locked||solved} onClick={()=>submit(i===activity.answer)}
          style={{...card,minHeight:145}}><Asset keyName={b[1]} size={72}/><span>{b[0]}</span></button>)}
      </div>
    </div>;
  }

  if(activity.mode==="identify"){
    return <div style={{display:"grid",gap:16}}>
      <div style={{background:"#F8FBFE",border:"2px solid #DFEAF3",borderRadius:26,padding:12}}>
        <Asset keyName={activity.visual} size={118}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:10}}>
        {activity.options.map((o,i)=><button key={i} disabled={locked||solved} onClick={()=>submit(i===activity.answer)}
          style={card}><Asset keyName={o[1]} size={70}/><span>{o[0]}</span></button>)}
      </div>
    </div>;
  }

  return null;
}
