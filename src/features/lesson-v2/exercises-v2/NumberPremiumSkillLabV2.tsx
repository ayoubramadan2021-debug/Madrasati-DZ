// NUMBER_PREMIUM_PEDAGOGY_HOTFIX_V1_4
import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";

export type NumberPremiumSkillActivityV2 =
  | {
      mode:"nextTen";
      start:number;
      target:number;
      choices:number[];
    }
  | {
      mode:"lineGap";
      start:number;
      target:number;
      answer:number;
      choices:number[];
    }
  | {
      mode:"tenStripGap";
      start:number;
      target:number;
      answer:number;
      choices:number[];
    }
  | {
      mode:"tapSteps";
      start:number;
      target:number;
    }
  | {
      mode:"splitAddend";
      start:number;
      addend:number;
      target:number;
      first:number;
      choices:number[];
    }
  | {
      mode:"bridgeGap";
      start:number;
      addend:number;
      target:number;
      answer:number;
      choices:number[];
    }
  | {
      mode:"finalOperation";
      start:number;
      addend:number;
      target:number;
      bridge:number;
      remainder:number;
      answer:number;
      choices:number[];
    }
  | {
      mode:"compareCards";
      values:number[];
      want:"larger"|"smaller";
      answer:number;
    }
  | {
      mode:"placeValueCompare";
      values:number[];
      want:"larger"|"smaller";
      answer:number;
    }
  | {
      mode:"sequenceGap";
      sequence:(number|null)[];
      answer:number;
      choices:number[];
    }
  | {
      mode:"orderTap";
      values:number[];
      direction:"asc"|"desc";
    }
  | {
      mode:"tenBracket";
      value:number;
      pairs:number[][];
      answer:number;
    };

type Props = {
  activity:NumberPremiumSkillActivityV2;
  locked:boolean;
  showResult:boolean;
  onResult:(correct:boolean)=>void;
};

const navy="#183B63";
const ink="#21384D";
const gold="#F4C542";
const paleGold="#FFF8DC";
const emerald="#45A66F";
const blue="#4A9DE0";
const paleBlue="#F4FAFE";
const border="#D9E7F1";

const panel:CSSProperties={
  background:paleBlue,
  border:`2px solid ${border}`,
  borderRadius:28,
  padding:"18px 14px",
  boxShadow:"0 12px 30px rgba(24,59,99,.08)",
};

const choiceBase:CSSProperties={
  minHeight:92,
  borderRadius:23,
  border:`2px solid ${border}`,
  background:"#FFFFFF",
  boxShadow:"0 8px 20px rgba(24,59,99,.08)",
  color:navy,
  fontFamily:"inherit",
  fontWeight:950,
  fontSize:"clamp(25px,7vw,36px)",
  display:"grid",
  placeItems:"center",
  padding:10,
};

function ChoiceGrid({
  choices,
  answer,
  disabled,
  onAnswer,
}:{
  choices:number[];
  answer:number;
  disabled:boolean;
  onAnswer:(ok:boolean)=>void;
}) {
  return (
    <div
      style={{
        display:"grid",
        gridTemplateColumns:
          choices.length===2
            ? "repeat(2,minmax(0,1fr))"
            : "repeat(2,minmax(0,1fr))",
        gap:12,
      }}
    >
      {choices.map((value,index)=>(
        <button
          key={`${value}-${index}`}
          type="button"
          disabled={disabled}
          onClick={()=>onAnswer(value===answer)}
          style={choiceBase}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

function DecadeBadge({
  value,
  active=false,
}:{
  value:number;
  active?:boolean;
}) {
  return (
    <div
      style={{
        minWidth:72,
        minHeight:72,
        borderRadius:24,
        border:active
          ? `4px solid ${gold}`
          : `2px solid ${border}`,
        background:active?paleGold:"#fff",
        display:"grid",
        placeItems:"center",
        color:navy,
        fontWeight:950,
        fontSize:30,
        boxShadow:active
          ? "0 8px 20px rgba(244,197,66,.22)"
          : "none",
      }}
    >
      {value}
    </div>
  );
}

function Arrow(){
  return (
    <div
      aria-hidden
      style={{
        color:blue,
        fontSize:34,
        fontWeight:950,
        lineHeight:1,
      }}
    >
      →
    </div>
  );
}

function RevealBadge({
  value,
  revealed,
  compact=false,
}:{
  value:number;
  revealed:boolean;
  compact?:boolean;
}) {
  return (
    <div
      style={{
        minWidth:compact?54:76,
        minHeight:compact?54:72,
        padding:compact?"0 10px":"0 14px",
        borderRadius:compact?18:24,
        border:`3px solid ${gold}`,
        background:revealed?paleGold:"#fff",
        display:"grid",
        placeItems:"center",
        color:revealed?navy:gold,
        fontWeight:950,
        fontSize:compact?24:32,
        boxShadow:"0 8px 20px rgba(244,197,66,.14)",
      }}
    >
      {revealed?value:"؟"}
    </div>
  );
}

function PlaceValueCard({value}:{value:number}) {
  const tens=Math.floor(value/10);
  const ones=value%10;

  return (
    <div
      style={{
        border:`2px solid ${border}`,
        borderRadius:24,
        background:"#fff",
        overflow:"hidden",
        boxShadow:"0 8px 18px rgba(24,59,99,.07)",
      }}
    >
      <div
        style={{
          textAlign:"center",
          padding:"9px 6px",
          fontWeight:950,
          color:navy,
          fontSize:30,
          borderBottom:`2px solid ${border}`,
        }}
      >
        {value}
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
        }}
      >
        <div
          style={{
            padding:10,
            textAlign:"center",
            borderLeft:`1px solid ${border}`,
          }}
        >
          <div
            style={{
              fontSize:14,
              fontWeight:900,
              color:"#63788A",
            }}
          >
            عَشَرَات
          </div>
          <div
            style={{
              fontSize:30,
              fontWeight:950,
              color:emerald,
            }}
          >
            {tens}
          </div>
        </div>

        <div
          style={{
            padding:10,
            textAlign:"center",
          }}
        >
          <div
            style={{
              fontSize:14,
              fontWeight:900,
              color:"#63788A",
            }}
          >
            وَحَدَات
          </div>
          <div
            style={{
              fontSize:30,
              fontWeight:950,
              color:blue,
            }}
          >
            {ones}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NumberPremiumSkillLabV2({
  activity,
  locked,
  showResult,
  onResult,
}:Props) {
  const [progress,setProgress]=useState(0);
  const [picked,setPicked]=useState<number[]>([]);
  const [solved,setSolved]=useState(false);

  useEffect(()=>{
    setProgress(0);
    setPicked([]);
    setSolved(false);
  },[activity]);

  useEffect(()=>{
    if(!locked&&!showResult&&!solved){
      // The central engine may unlock the same question after
      // retry feedback. Keep the activity ready for a fresh try.
    }
  },[locked,showResult,solved]);

  const submit=(ok:boolean)=>{
    if(locked||solved) return;
    if(ok) setSolved(true);
    onResult(ok);
  };

  if(activity.mode==="nextTen"){
    const previous=
      Math.floor(activity.start/10)*10;

    return (
      <div style={{display:"grid",gap:16}}>
        <div style={panel}>
          <div
            style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:10,
              direction:"ltr",
              flexWrap:"wrap",
            }}
          >
            <DecadeBadge value={previous}/>
            <Arrow/>
            <DecadeBadge value={activity.start} active/>
            <Arrow/>
            <RevealBadge
              value={activity.target}
              revealed={solved}
            />
          </div>
        </div>

        <ChoiceGrid
          choices={activity.choices}
          answer={activity.target}
          disabled={locked||solved}
          onAnswer={submit}
        />
      </div>
    );
  }

  if(activity.mode==="lineGap"){
    const gap=activity.target-activity.start;
    const ticks=Array.from(
      {length:gap+1},
      (_,i)=>activity.start+i,
    );

    return (
      <div style={{display:"grid",gap:16}}>
        <div style={panel}>
          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"end",
              gap:4,
              direction:"ltr",
              overflowX:"auto",
              padding:"12px 3px 4px",
            }}
          >
            {ticks.map((v,i)=>(
              <div
                key={v}
                style={{
                  minWidth:38,
                  display:"grid",
                  justifyItems:"center",
                  gap:5,
                }}
              >
                <div
                  style={{
                    width:18,
                    height:18,
                    borderRadius:"50%",
                    background:
                      i===0
                        ? blue
                        : i===ticks.length-1
                          ? emerald
                          : gold,
                    border:"3px solid #fff",
                    boxShadow:"0 0 0 2px rgba(24,59,99,.1)",
                  }}
                />
                <div
                  style={{
                    color:ink,
                    fontWeight:900,
                    fontSize:14,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop:12,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              gap:8,
              direction:"ltr",
              fontWeight:950,
              color:navy,
              fontSize:23,
            }}
          >
            <span>{activity.start}</span>
            <span>+</span>
            <RevealBadge
              value={activity.answer}
              revealed={solved}
              compact
            />
            <span>=</span>
            <span>{activity.target}</span>
          </div>
        </div>

        <ChoiceGrid
          choices={activity.choices}
          answer={activity.answer}
          disabled={locked||solved}
          onAnswer={submit}
        />
      </div>
    );
  }

  if(activity.mode==="tenStripGap"){
    const units=activity.start%10;
    const cells=Array.from({length:10},(_,i)=>i);

    return (
      <div style={{display:"grid",gap:16}}>
        <div style={panel}>
          <div
            style={{
              textAlign:"center",
              color:navy,
              fontWeight:950,
              fontSize:29,
              marginBottom:14,
            }}
          >
            {activity.start} → {activity.target}
          </div>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(5,1fr)",
              gap:8,
              maxWidth:360,
              margin:"0 auto",
            }}
          >
            {cells.map(i=>(
              <div
                key={i}
                style={{
                  aspectRatio:"1",
                  borderRadius:14,
                  border:`2px solid ${i<units?emerald:gold}`,
                  background:i<units
                    ? "rgba(69,166,111,.2)"
                    : "rgba(244,197,66,.12)",
                  display:"grid",
                  placeItems:"center",
                }}
              >
                <div
                  style={{
                    width:"58%",
                    height:"58%",
                    borderRadius:"50%",
                    background:i<units
                      ? emerald
                      : "transparent",
                    border:i<units
                      ? "none"
                      : `2px dashed ${gold}`,
                  }}
                />
              </div>
            ))}
          </div>

          <div
            dir="rtl"
            style={{
              textAlign:"center",
              marginTop:12,
              color:"#607487",
              fontWeight:900,
            }}
          >
            الْخَانَاتُ الْفَارِغَةُ هِيَ الْمُتَمِّمُ.
          </div>
        </div>

        <ChoiceGrid
          choices={activity.choices}
          answer={activity.answer}
          disabled={locked||solved}
          onAnswer={submit}
        />
      </div>
    );
  }

  if(activity.mode==="tapSteps"){
    const steps=Array.from(
      {length:activity.target-activity.start},
      (_,i)=>activity.start+i+1,
    );

    const press=(index:number)=>{
      if(locked||solved) return;

      if(index!==progress){
        setProgress(0);
        onResult(false);
        return;
      }

      const next=progress+1;
      setProgress(next);

      if(next===steps.length){
        setSolved(true);
        onResult(true);
      }
    };

    return (
      <div style={{display:"grid",gap:14}}>
        <div style={panel}>
          <div
            dir="rtl"
            style={{
              textAlign:"center",
              fontWeight:950,
              color:navy,
              fontSize:24,
              marginBottom:13,
            }}
          >
            {activity.start} → خُطُوَاتٌ → {activity.target}
          </div>

          <div
            style={{
              display:"flex",
              flexWrap:"wrap",
              justifyContent:"center",
              gap:9,
              direction:"ltr",
            }}
          >
            {steps.map((v,i)=>(
              <button
                key={v}
                disabled={locked||solved||i<progress}
                onClick={()=>press(i)}
                style={{
                  width:58,
                  height:58,
                  borderRadius:"50%",
                  border:`3px solid ${i<progress?emerald:gold}`,
                  background:i<progress
                    ? "rgba(69,166,111,.18)"
                    : "#fff",
                  color:navy,
                  fontWeight:950,
                  fontSize:20,
                }}
              >
                {v}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop:12,
              textAlign:"center",
              color:"#607487",
              fontWeight:900,
            }}
          >
            {progress} / {steps.length}
          </div>
        </div>
      </div>
    );
  }

  if(activity.mode==="splitAddend"){
    const remainder=
      activity.addend-activity.first;

    return (
      <div style={{display:"grid",gap:16}}>
        <div style={panel}>
          <div
            style={{
              textAlign:"center",
              fontSize:31,
              fontWeight:950,
              color:navy,
            }}
          >
            {activity.start} + {activity.addend}
          </div>

          <div
            style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:12,
              marginTop:15,
              direction:"ltr",
              flexWrap:"wrap",
            }}
          >
            <DecadeBadge value={activity.addend} active/>
            <Arrow/>
            <div
              style={{
                display:"flex",
                gap:8,
                alignItems:"center",
              }}
            >
              <RevealBadge
                value={activity.first}
                revealed={solved}
              />

              <div
                style={{
                  color:ink,
                  fontWeight:950,
                  fontSize:27,
                }}
              >
                +
              </div>

              <DecadeBadge value={remainder}/>
            </div>
          </div>

          <div
            dir="rtl"
            style={{
              marginTop:14,
              textAlign:"center",
              color:"#607487",
              fontWeight:900,
            }}
          >
            نَأْخُذُ أَوَّلًا مَا يُكْمِلُ {activity.target}.
          </div>
        </div>

        <ChoiceGrid
          choices={activity.choices}
          answer={activity.first}
          disabled={locked||solved}
          onAnswer={submit}
        />
      </div>
    );
  }

  if(activity.mode==="bridgeGap"){
    return (
      <div style={{display:"grid",gap:16}}>
        <div style={panel}>
          <div
            style={{
              display:"grid",
              justifyItems:"center",
              gap:12,
            }}
          >
            <div
              style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                gap:8,
                direction:"ltr",
                fontWeight:950,
                color:navy,
                fontSize:30,
              }}
            >
              <span>{activity.start}</span>
              <span>+</span>
              <RevealBadge
                value={activity.answer}
                revealed={solved}
                compact
              />
              <span>=</span>
              <span>{activity.target}</span>
            </div>

            <div
              style={{
                width:"100%",
                maxWidth:380,
                display:"grid",
                gridTemplateColumns:"auto 1fr auto",
                alignItems:"center",
                gap:8,
                direction:"ltr",
              }}
            >
              <DecadeBadge value={activity.start}/>
              <div
                style={{
                  height:8,
                  borderRadius:999,
                  background:
                    "linear-gradient(90deg,#4A9DE0,#F4C542,#45A66F)",
                  position:"relative",
                }}
              >
                <div
                  style={{
                    position:"absolute",
                    left:"50%",
                    top:"50%",
                    transform:"translate(-50%,-50%)",
                  }}
                >
                  <RevealBadge
                    value={activity.answer}
                    revealed={solved}
                    compact
                  />
                </div>
              </div>
              <DecadeBadge
                value={activity.target}
                active
              />
            </div>
          </div>
        </div>

        <ChoiceGrid
          choices={activity.choices}
          answer={activity.answer}
          disabled={locked||solved}
          onAnswer={submit}
        />
      </div>
    );
  }

  if(activity.mode==="finalOperation"){
    return (
      <div style={{display:"grid",gap:16}}>
        <div style={panel}>
          <div
            style={{
              textAlign:"center",
              color:navy,
              fontWeight:950,
              fontSize:30,
            }}
          >
            {activity.start} + {activity.addend}
          </div>

          <div
            style={{
              margin:"16px auto 0",
              maxWidth:430,
              display:"grid",
              gridTemplateColumns:"1fr auto 1fr auto 1fr",
              alignItems:"center",
              gap:8,
              direction:"ltr",
            }}
          >
            <DecadeBadge value={activity.start}/>
            <Arrow/>
            <DecadeBadge
              value={activity.target}
              active
            />
            <Arrow/>
            <div
              style={{
                minWidth:82,
                minHeight:72,
                borderRadius:24,
                border:`2px solid ${border}`,
                background:"#fff",
                display:"grid",
                placeItems:"center",
                color:ink,
                fontWeight:950,
                fontSize:22,
              }}
            >
              + {activity.remainder}
            </div>
          </div>

          <div
            dir="rtl"
            style={{
              marginTop:13,
              textAlign:"center",
              color:"#607487",
              fontWeight:900,
            }}
          >
            أَكْمَلْ إِلَى {activity.target} ثُمَّ أَضِفِ الْبَاقِي.
          </div>
        </div>

        <ChoiceGrid
          choices={activity.choices}
          answer={activity.answer}
          disabled={locked||solved}
          onAnswer={submit}
        />
      </div>
    );
  }

  if(activity.mode==="compareCards"){
    return (
      <div style={{display:"grid",gap:14}}>
        <div
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:14,
          }}
        >
          {activity.values.map((v,i)=>(
            <button
              key={`${v}-${i}`}
              disabled={locked||solved}
              onClick={()=>submit(v===activity.answer)}
              style={{
                ...choiceBase,
                minHeight:190,
                fontSize:"clamp(42px,12vw,66px)",
                border:`3px solid ${gold}`,
                background:"#fff",
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <div style={{display:"grid",placeItems:"center"}}>
          <RevealBadge
            value={activity.answer}
            revealed={solved}
            compact
          />
        </div>
      </div>
    );
  }

  if(activity.mode==="placeValueCompare"){
    return (
      <div style={{display:"grid",gap:14}}>
        <div
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:14,
          }}
        >
          {activity.values.map((v,i)=>(
            <button
              key={`${v}-${i}`}
              disabled={locked||solved}
              onClick={()=>submit(v===activity.answer)}
              style={{
                border:"none",
                background:"transparent",
                padding:0,
                fontFamily:"inherit",
              }}
            >
              <PlaceValueCard value={v}/>
            </button>
          ))}
        </div>

        <div style={{display:"grid",placeItems:"center"}}>
          <RevealBadge
            value={activity.answer}
            revealed={solved}
            compact
          />
        </div>
      </div>
    );
  }

  if(activity.mode==="sequenceGap"){
    return (
      <div style={{display:"grid",gap:16}}>
        <div style={panel}>
          <div
            style={{
              display:"flex",
              gap:9,
              justifyContent:"center",
              flexWrap:"wrap",
              direction:"ltr",
            }}
          >
            {activity.sequence.map((v,i)=>(
              <div
                key={i}
                style={{
                  minWidth:66,
                  minHeight:66,
                  borderRadius:20,
                  border:v===null
                    ? `3px dashed ${gold}`
                    : `2px solid ${border}`,
                  background:v===null
                    ? paleGold
                    : "#fff",
                  display:"grid",
                  placeItems:"center",
                  color:v===null?gold:navy,
                  fontWeight:950,
                  fontSize:28,
                }}
              >
                {v===null?(solved?activity.answer:"؟"):v}
              </div>
            ))}
          </div>
        </div>

        <ChoiceGrid
          choices={activity.choices}
          answer={activity.answer}
          disabled={locked||solved}
          onAnswer={submit}
        />
      </div>
    );
  }

  if(activity.mode==="orderTap"){
    const ordered=[...activity.values].sort((a,b)=>a-b);

    if(activity.direction==="desc"){
      ordered.reverse();
    }

    const choose=(v:number)=>{
      if(locked||solved) return;

      const expected=ordered[picked.length];

      if(v!==expected){
        setPicked([]);
        onResult(false);
        return;
      }

      const next=[...picked,v];
      setPicked(next);

      if(next.length===ordered.length){
        setSolved(true);
        onResult(true);
      }
    };

    return (
      <div style={{display:"grid",gap:15}}>
        <div style={panel}>
          <div
            dir="rtl"
            style={{
              textAlign:"center",
              color:"#607487",
              fontWeight:900,
              marginBottom:10,
            }}
          >
            اِلْمَسِ الْبِطَاقَاتِ بِالتَّرْتِيبِ الصَّحِيحِ.
          </div>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(4,1fr)",
              gap:8,
            }}
          >
            {Array.from(
              {length:activity.values.length},
              (_,i)=>(
                <div
                  key={i}
                  style={{
                    minHeight:66,
                    borderRadius:18,
                    border:`2px dashed ${border}`,
                    background:"#fff",
                    display:"grid",
                    placeItems:"center",
                    color:emerald,
                    fontWeight:950,
                    fontSize:27,
                  }}
                >
                  {picked[i]??"—"}
                </div>
              )
            )}
          </div>
        </div>

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(2,1fr)",
            gap:10,
          }}
        >
          {activity.values.map((v,i)=>(
            <button
              key={`${v}-${i}`}
              disabled={
                locked||
                solved||
                picked.includes(v)
              }
              onClick={()=>choose(v)}
              style={choiceBase}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if(activity.mode==="tenBracket"){
    return (
      <div style={{display:"grid",gap:15}}>
        <div style={panel}>
          <div
            style={{
              textAlign:"center",
              fontWeight:950,
              color:navy,
              fontSize:48,
            }}
          >
            {activity.value}
          </div>

          <div
            dir="rtl"
            style={{
              textAlign:"center",
              color:"#607487",
              fontWeight:900,
              marginTop:7,
            }}
          >
            حَدِّدِ الْعَشْرَةَ السَّابِقَةَ وَالْعَشَرَةَ الْمُوَالِيَةَ.
          </div>
        </div>

        <div
          style={{
            display:"grid",
            gap:10,
          }}
        >
          {activity.pairs.map((pair,i)=>(
            <button
              key={`${pair[0]}-${pair[1]}`}
              disabled={locked||solved}
              onClick={()=>submit(i===activity.answer)}
              style={{
                ...choiceBase,
                minHeight:82,
                gridTemplateColumns:"1fr auto 1fr",
                direction:"ltr",
              }}
            >
              <span>{pair[0]}</span>
              <span
                style={{
                  color:gold,
                  fontSize:24,
                }}
              >
                ◀ {activity.value} ▶
              </span>
              <span>{pair[1]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
