import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type WeekMode =
  | "week"
  | "rank"
  | "sequence"
  | "timeline";

type WeekActivity = {
  title:string;
  mode:WeekMode;
  options:string[];
  answer:number;

  day?:string;
  sequence?:string[];

  yesterday?:string;
  today?:string;
  tomorrow?:string;
  blank?:"yesterday"|"tomorrow";
};

const QUESTIONS:any[] = [
  {
    "id": "l108_ex1_q1",
    "mission": 1,
    "prompt": "كَمْ عَدَدُ أَيَّامِ الْأُسْبُوعِ؟",
    "audioKey": "l108_ex1_q1",
    "weekActivity": {
      "title": "أَيَّامُ الْأُسْبُوعِ",
      "mode": "week",
      "options": [
        "7",
        "6",
        "5",
        "8"
      ],
      "answer": 0
    }
  },
  {
    "id": "l108_ex1_q2",
    "mission": 1,
    "prompt": "مَا الْيَوْمُ الْأَوَّلُ فِي الْأُسْبُوعِ؟",
    "audioKey": "l108_ex1_q2",
    "weekActivity": {
      "title": "الْيَوْمُ الْأَوَّلُ",
      "mode": "week",
      "options": [
        "الْأَحَدُ",
        "الْإِثْنَيْنُ",
        "الثُّلَاثَاءُ",
        "السَّبْتُ"
      ],
      "answer": 0
    }
  },
  {
    "id": "l108_ex1_q3",
    "mission": 1,
    "prompt": "مَا الْيَوْمُ الثَّالِثُ فِي الْأُسْبُوعِ؟",
    "audioKey": "l108_ex1_q3",
    "weekActivity": {
      "title": "الْيَوْمُ الثَّالِثُ",
      "mode": "week",
      "options": [
        "الْإِثْنَيْنُ",
        "الثُّلَاثَاءُ",
        "الْأَرْبِعَاءُ",
        "الْخَمِيسُ"
      ],
      "answer": 1
    }
  },
  {
    "id": "l108_ex1_q4",
    "mission": 1,
    "prompt": "مَا الْيَوْمُ السَّابِعُ فِي الْأُسْبُوعِ؟",
    "audioKey": "l108_ex1_q4",
    "weekActivity": {
      "title": "الْيَوْمُ السَّابِعُ",
      "mode": "week",
      "options": [
        "الْجُمُعَةُ",
        "الْخَمِيسُ",
        "السَّبْتُ",
        "الْأَحَدُ"
      ],
      "answer": 2
    }
  },
  {
    "id": "l108_ex2_q1",
    "mission": 2,
    "prompt": "مَا رُتْبَةُ يَوْمِ الْأَحَدِ؟",
    "audioKey": "l108_ex2_q1",
    "weekActivity": {
      "title": "أَرْبِطُ الْيَوْمَ بِرُتْبَتِهِ",
      "mode": "rank",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "answer": 0,
      "day": "الْأَحَدُ"
    }
  },
  {
    "id": "l108_ex2_q2",
    "mission": 2,
    "prompt": "مَا رُتْبَةُ يَوْمِ الْإِثْنَيْنِ؟",
    "audioKey": "l108_ex2_q2",
    "weekActivity": {
      "title": "أَرْبِطُ الْيَوْمَ بِرُتْبَتِهِ",
      "mode": "rank",
      "options": [
        "3",
        "2",
        "1",
        "4"
      ],
      "answer": 1,
      "day": "الْإِثْنَيْنُ"
    }
  },
  {
    "id": "l108_ex2_q3",
    "mission": 2,
    "prompt": "مَا رُتْبَةُ يَوْمِ الْأَرْبِعَاءِ؟",
    "audioKey": "l108_ex2_q3",
    "weekActivity": {
      "title": "أَرْبِطُ الْيَوْمَ بِرُتْبَتِهِ",
      "mode": "rank",
      "options": [
        "3",
        "5",
        "4",
        "6"
      ],
      "answer": 2,
      "day": "الْأَرْبِعَاءُ"
    }
  },
  {
    "id": "l108_ex2_q4",
    "mission": 2,
    "prompt": "مَا رُتْبَةُ يَوْمِ الْجُمُعَةِ؟",
    "audioKey": "l108_ex2_q4",
    "weekActivity": {
      "title": "أَرْبِطُ الْيَوْمَ بِرُتْبَتِهِ",
      "mode": "rank",
      "options": [
        "5",
        "7",
        "4",
        "6"
      ],
      "answer": 3,
      "day": "الْجُمُعَةُ"
    }
  },
  {
    "id": "l108_ex3_q1",
    "mission": 3,
    "prompt": "أَكْمِلْ: الْأَحَدُ، الْإِثْنَيْنُ، ثُمَّ مَاذَا؟",
    "audioKey": "l108_ex3_q1",
    "weekActivity": {
      "title": "أُكْمِلُ تَرْتِيبَ الْأَيَّامِ",
      "mode": "sequence",
      "options": [
        "الثُّلَاثَاءُ",
        "الْأَرْبِعَاءُ",
        "الْجُمُعَةُ",
        "السَّبْتُ"
      ],
      "answer": 0,
      "sequence": [
        "الْأَحَدُ",
        "الْإِثْنَيْنُ",
        "؟"
      ]
    }
  },
  {
    "id": "l108_ex3_q2",
    "mission": 3,
    "prompt": "أَكْمِلْ: الثُّلَاثَاءُ، الْأَرْبِعَاءُ، ثُمَّ مَاذَا؟",
    "audioKey": "l108_ex3_q2",
    "weekActivity": {
      "title": "أُكْمِلُ تَرْتِيبَ الْأَيَّامِ",
      "mode": "sequence",
      "options": [
        "الْجُمُعَةُ",
        "الْخَمِيسُ",
        "السَّبْتُ",
        "الْإِثْنَيْنُ"
      ],
      "answer": 1,
      "sequence": [
        "الثُّلَاثَاءُ",
        "الْأَرْبِعَاءُ",
        "؟"
      ]
    }
  },
  {
    "id": "l108_ex3_q3",
    "mission": 3,
    "prompt": "أَكْمِلْ: الْخَمِيسُ، الْجُمُعَةُ، ثُمَّ مَاذَا؟",
    "audioKey": "l108_ex3_q3",
    "weekActivity": {
      "title": "أُكْمِلُ تَرْتِيبَ الْأَيَّامِ",
      "mode": "sequence",
      "options": [
        "الْأَحَدُ",
        "الْأَرْبِعَاءُ",
        "السَّبْتُ",
        "الْإِثْنَيْنُ"
      ],
      "answer": 2,
      "sequence": [
        "الْخَمِيسُ",
        "الْجُمُعَةُ",
        "؟"
      ]
    }
  },
  {
    "id": "l108_ex3_q4",
    "mission": 3,
    "prompt": "أَكْمِلْ: السَّبْتُ، ثُمَّ مَاذَا؟",
    "audioKey": "l108_ex3_q4",
    "weekActivity": {
      "title": "تَتَكَرَّرُ أَيَّامُ الْأُسْبُوعِ",
      "mode": "sequence",
      "options": [
        "الْجُمُعَةُ",
        "الْإِثْنَيْنُ",
        "الثُّلَاثَاءُ",
        "الْأَحَدُ"
      ],
      "answer": 3,
      "sequence": [
        "السَّبْتُ",
        "؟"
      ]
    }
  },
  {
    "id": "l108_ex4_q1",
    "mission": 4,
    "prompt": "إِذَا كَانَ الْيَوْمُ الْإِثْنَيْنَ، فَمَا الْأَمْسُ؟",
    "audioKey": "l108_ex4_q1",
    "weekActivity": {
      "title": "الْأَمْسُ وَالْيَوْمُ وَالْغَدُ",
      "mode": "timeline",
      "options": [
        "الْأَحَدُ",
        "الثُّلَاثَاءُ",
        "السَّبْتُ",
        "الْأَرْبِعَاءُ"
      ],
      "answer": 0,
      "yesterday": "؟",
      "today": "الْإِثْنَيْنُ",
      "tomorrow": "الثُّلَاثَاءُ",
      "blank": "yesterday"
    }
  },
  {
    "id": "l108_ex4_q2",
    "mission": 4,
    "prompt": "إِذَا كَانَ الْيَوْمُ الْإِثْنَيْنَ، فَمَا الْغَدُ؟",
    "audioKey": "l108_ex4_q2",
    "weekActivity": {
      "title": "الْأَمْسُ وَالْيَوْمُ وَالْغَدُ",
      "mode": "timeline",
      "options": [
        "الْأَحَدُ",
        "الثُّلَاثَاءُ",
        "الْأَرْبِعَاءُ",
        "السَّبْتُ"
      ],
      "answer": 1,
      "yesterday": "الْأَحَدُ",
      "today": "الْإِثْنَيْنُ",
      "tomorrow": "؟",
      "blank": "tomorrow"
    }
  },
  {
    "id": "l108_ex4_q3",
    "mission": 4,
    "prompt": "إِذَا كَانَ الْيَوْمُ الْخَمِيسَ، فَمَا الْأَمْسُ؟",
    "audioKey": "l108_ex4_q3",
    "weekActivity": {
      "title": "الْأَمْسُ وَالْيَوْمُ وَالْغَدُ",
      "mode": "timeline",
      "options": [
        "الثُّلَاثَاءُ",
        "الْجُمُعَةُ",
        "الْأَرْبِعَاءُ",
        "الْأَحَدُ"
      ],
      "answer": 2,
      "yesterday": "؟",
      "today": "الْخَمِيسُ",
      "tomorrow": "الْجُمُعَةُ",
      "blank": "yesterday"
    }
  },
  {
    "id": "l108_ex4_q4",
    "mission": 4,
    "prompt": "إِذَا كَانَ الْيَوْمُ الْجُمُعَةَ، فَمَا الْغَدُ؟",
    "audioKey": "l108_ex4_q4",
    "weekActivity": {
      "title": "الْأَمْسُ وَالْيَوْمُ وَالْغَدُ",
      "mode": "timeline",
      "options": [
        "الْخَمِيسُ",
        "الْأَحَدُ",
        "الثُّلَاثَاءُ",
        "السَّبْتُ"
      ],
      "answer": 3,
      "yesterday": "الْخَمِيسُ",
      "today": "الْجُمُعَةُ",
      "tomorrow": "؟",
      "blank": "tomorrow"
    }
  }
];

const DAYS = [
  "الْأَحَدُ",
  "الْإِثْنَيْنُ",
  "الثُّلَاثَاءُ",
  "الْأَرْبِعَاءُ",
  "الْخَمِيسُ",
  "الْجُمُعَةُ",
  "السَّبْتُ",
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَتَعَرَّفُ إِلَى أَيَّامِ الْأُسْبُوعِ",
  2:"أَرْبِطُ الْيَوْمَ بِرُتْبَتِهِ",
  3:"أُكْمِلُ تَرْتِيبَ أَيَّامِ الْأُسْبُوعِ",
  4:"أُمَيِّزُ الْأَمْسَ وَالْيَوْمَ وَالْغَدَ",
};

const navy="#173A63";
const gold="#E9AE22";
const green="#28A96B";
const red="#D9534F";

const dayBackgrounds = [
  "#FFF4D8",
  "#E8F6EE",
  "#F3E9FF",
  "#E7F3FF",
  "#FFF0E7",
  "#EAF7F7",
  "#F8ECF2",
];


// ============================================================
// DAY CARD
// ============================================================

function DayCard({
  text,
  index,
  emphasized=false,
}:{
  text:string;
  index?:number;
  emphasized?:boolean;
}) {
  const bg =
    typeof index==="number"
      ? dayBackgrounds[
          index % dayBackgrounds.length
        ]
      : "#fff";

  const isQuestion=text==="؟";

  return (
    <div
      style={{
        minWidth:94,
        minHeight:76,
        border:
          `3px solid ${
            emphasized
              ? green
              : gold
          }`,
        borderRadius:20,
        background:
          isQuestion
            ? "#FFF8DD"
            : bg,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        padding:"8px 7px",
        color:
          isQuestion
            ? "#B27A00"
            : navy,
        fontWeight:950,
        fontSize:
          isQuestion
            ? 32
            : "clamp(15px,4vw,19px)",
        lineHeight:1.5,
        boxShadow:
          "0 6px 14px rgba(23,58,99,.08)",
      }}
    >
      {text}
    </div>
  );
}


// ============================================================
// COMPACT WEEK STRIP — EX1
// ============================================================

function WeekTrain() {
  return (
    <div
      dir="rtl"
      style={{
        width:"100%",
        display:"grid",
        gap:12,
        padding:"4px 0",
      }}
    >
      <div
        style={{
          textAlign:"center",
          color:navy,
          fontWeight:950,
          fontSize:"clamp(17px,4.3vw,21px)",
        }}
      >
        أَيَّامُ الْأُسْبُوعِ
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(7,minmax(0,1fr))",
          gap:5,
          width:"100%",
        }}
      >
        {DAYS.map((day,index)=>(
          <div
            key={day}
            style={{
              minWidth:0,
              height:66,
              border:`2px solid ${gold}`,
              borderRadius:13,
              background:dayBackgrounds[index],
              display:"grid",
              alignContent:"center",
              justifyItems:"center",
              padding:"4px 2px",
              boxShadow:"0 4px 10px rgba(23,58,99,.06)",
              overflow:"hidden",
            }}
          >
            <div
              style={{
                color:navy,
                fontSize:12,
                fontWeight:950,
                lineHeight:1.25,
                textAlign:"center",
                whiteSpace:"nowrap",
                transform:"scale(.82)",
                transformOrigin:"center",
              }}
            >
              {day}
            </div>

            <div
              style={{
                color:"#8A6520",
                fontSize:13,
                fontWeight:950,
              }}
            >
              {index+1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================
// EX1 ANSWER ICON
// ============================================================

function WeekAnswerIcon({
  value,
  index,
}:{
  value:string;
  index:number;
}) {
  const numeric=/^[0-9]+$/.test(value);

  const dayIndex=DAYS.indexOf(value);

  const bg=
    dayIndex>=0
      ? dayBackgrounds[dayIndex]
      : dayBackgrounds[index % dayBackgrounds.length];

  return (
    <div
      style={{
        width:118,
        height:118,
        border:`3px solid ${navy}`,
        borderRadius:23,
        overflow:"hidden",
        background:bg,
        display:"grid",
        gridTemplateRows:"28px 1fr",
        boxShadow:"0 6px 14px rgba(23,58,99,.10)",
      }}
    >
      <div
        style={{
          background:navy,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          gap:12,
        }}
      >
        <span
          style={{
            width:8,
            height:8,
            borderRadius:99,
            background:"#fff",
          }}
        />

        <span
          style={{
            width:8,
            height:8,
            borderRadius:99,
            background:"#fff",
          }}
        />
      </div>

      <div
        style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          textAlign:"center",
          padding:6,
          color:navy,
          fontWeight:950,
          lineHeight:1.35,
          fontSize:
            numeric
              ? 38
              : "clamp(14px,3.8vw,18px)",
        }}
      >
        {value}
      </div>
    </div>
  );
}


// ============================================================
// RANK
// ============================================================

function RankVisual({
  day,
}:{
  day:string;
}) {
  const index=DAYS.indexOf(day);

  return (
    <div
      style={{
        minHeight:160,
        display:"grid",
        placeItems:"center",
        gap:14,
      }}
    >
      <DayCard
        text={day}
        index={index>=0 ? index : 0}
      />

      <div
        style={{
          color:navy,
          fontWeight:950,
          fontSize:22,
        }}
      >
        رُتْبَتُهُ = ؟
      </div>
    </div>
  );
}


// ============================================================
// SEQUENCE
// ============================================================

function SequenceVisual({
  sequence,
  resolvedAnswer,
}:{
  sequence:string[];
  resolvedAnswer:string|null;
}) {
  return (
    <div
      dir="rtl"
      style={{
        minHeight:145,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexWrap:"wrap",
        gap:9,
      }}
    >
      {sequence.map((item,index)=>{
        const value =
          item==="؟" && resolvedAnswer
            ? resolvedAnswer
            : item;

        const dayIndex =
          DAYS.indexOf(value);

        return (
          <div
            key={index}
            style={{
              display:"flex",
              alignItems:"center",
              gap:9,
            }}
          >
            <DayCard
              text={value}
              index={
                dayIndex>=0
                  ? dayIndex
                  : undefined
              }
              emphasized={
                item==="؟"
                && Boolean(resolvedAnswer)
              }
            />

            {index<sequence.length-1 && (
              <span
                style={{
                  color:gold,
                  fontSize:30,
                  fontWeight:950,
                }}
              >
                ←
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}


// ============================================================
// YESTERDAY / TODAY / TOMORROW
// ============================================================

function TimelineColumn({
  label,
  value,
  resolvedAnswer,
  isBlank,
}:{
  label:string;
  value:string;
  resolvedAnswer:string|null;
  isBlank:boolean;
}) {
  const shown =
    isBlank && resolvedAnswer
      ? resolvedAnswer
      : value;

  const index=DAYS.indexOf(shown);

  return (
    <div
      style={{
        display:"grid",
        gap:8,
        minWidth:100,
      }}
    >
      <div
        style={{
          textAlign:"center",
          color:navy,
          fontWeight:950,
          fontSize:17,
        }}
      >
        {label}
      </div>

      <DayCard
        text={shown}
        index={
          index>=0
            ? index
            : undefined
        }
        emphasized={
          isBlank
          && Boolean(resolvedAnswer)
        }
      />
    </div>
  );
}


function TimelineVisual({
  activity,
  resolvedAnswer,
}:{
  activity:WeekActivity;
  resolvedAnswer:string|null;
}) {
  return (
    <div
      dir="rtl"
      style={{
        minHeight:175,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexWrap:"wrap",
        gap:9,
      }}
    >
      <TimelineColumn
        label="الْأَمْسُ"
        value={activity.yesterday ?? ""}
        resolvedAnswer={resolvedAnswer}
        isBlank={
          activity.blank==="yesterday"
        }
      />

      <div
        style={{
          color:gold,
          fontWeight:950,
          fontSize:30,
        }}
      >
        ←
      </div>

      <TimelineColumn
        label="الْيَوْمُ"
        value={activity.today ?? ""}
        resolvedAnswer={null}
        isBlank={false}
      />

      <div
        style={{
          color:gold,
          fontWeight:950,
          fontSize:30,
        }}
      >
        ←
      </div>

      <TimelineColumn
        label="الْغَدُ"
        value={activity.tomorrow ?? ""}
        resolvedAnswer={resolvedAnswer}
        isBlank={
          activity.blank==="tomorrow"
        }
      />
    </div>
  );
}


// ============================================================
// MAIN VISUAL
// ============================================================

function MainVisual({
  activity,
  resolvedAnswer,
}:{
  activity:WeekActivity;
  resolvedAnswer:string|null;
}) {
  if(activity.mode==="week") {
    return <WeekTrain/>;
  }

  if(activity.mode==="rank") {
    return (
      <RankVisual
        day={activity.day ?? ""}
      />
    );
  }

  if(activity.mode==="sequence") {
    return (
      <SequenceVisual
        sequence={
          activity.sequence ?? []
        }
        resolvedAnswer={resolvedAnswer}
      />
    );
  }

  return (
    <TimelineVisual
      activity={activity}
      resolvedAnswer={resolvedAnswer}
    />
  );
}


// ============================================================
// ACTIVITY
// ============================================================

function WeekLab({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:WeekActivity;
  locked:boolean;
  showResult:boolean;
  onResult:(correct:boolean)=>void;
}) {
  const [selected,setSelected]=
    useState<number|null>(null);

  useEffect(()=>{
    setSelected(null);
  },[questionId]);

  const pick=(index:number)=>{
    if(locked) return;

    setSelected(index);

    onResult(
      index===activity.answer
    );
  };

  const resolvedAnswer =
    selected===activity.answer
      ? activity.options[
          activity.answer
        ]
      : null;

  return (
    <div
      style={{
        width:"100%",
        display:"grid",
        gap:15,
      }}
    >
      <div
        style={{
          border:`3px solid ${gold}`,
          borderRadius:28,
          background:"#fff",
          padding:14,
          boxShadow:
            "0 10px 24px rgba(23,58,99,.08)",
        }}
      >
        <div
          style={{
            textAlign:"center",
            color:navy,
            fontWeight:950,
            fontSize:
              "clamp(18px,4.6vw,24px)",
            marginBottom:14,
          }}
        >
          {activity.title}
        </div>

        <MainVisual
          activity={activity}
          resolvedAnswer={resolvedAnswer}
        />
      </div>

      <div
        dir="rtl"
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap:13,
        }}
      >
        {activity.options.map(
          (option,index)=>{
            const chosen=
              selected===index;

            const correct=
              index===activity.answer;

            let border=gold;
            let background="#fff";

            if(showResult && chosen) {
              border=
                correct
                  ? green
                  : red;

              background=
                correct
                  ? "#EFFAF4"
                  : "#FFF1F0";
            }

            if(showResult && correct) {
              border=green;
            }

            return (
              <button
                key={index}
                type="button"
                disabled={locked}
                onClick={()=>pick(index)}
                style={{
                  minHeight:
                    activity.mode==="week"
                      ? 154
                      : 96,
                  border:
                    `3px solid ${border}`,
                  borderRadius:23,
                  background,
                  boxShadow:
                    "0 7px 16px rgba(23,58,99,.08)",
                  color:navy,
                  fontFamily:"inherit",
                  fontSize:
                    activity.mode==="rank"
                      ? "clamp(25px,6vw,34px)"
                      : "clamp(17px,4.4vw,22px)",
                  fontWeight:950,
                  lineHeight:1.6,
                  padding:10,
                  cursor:
                    locked
                      ? "default"
                      : "pointer",
                }}
              >
                {
                  activity.mode==="week"
                    ? (
                      <WeekAnswerIcon
                        value={option}
                        index={index}
                      />
                    )
                    : option
                }
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}


function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}:any) {
  return (
    <WeekLab
      questionId={question.id}
      activity={question.weekActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}


export const Lesson108DaysOfWeekExercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson108"
    audioBase="/audio/teachers/khalil/lesson_108_days_of_week/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ أَيَّامَ الْأُسْبُوعِ وَتَرْتِيبَهَا وَالْأَمْسَ وَالْيَوْمَ وَالْغَدَ."
    nextPath="/lesson-v2/109"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson108DaysOfWeekExercises;
