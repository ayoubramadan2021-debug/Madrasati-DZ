import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type Mode =
  | "blocks"
  | "vertical"
  | "equation"
  | "missing";

type AdditionActivity = {
  title:string;
  mode:Mode;
  numbers:number[];
  expression:string;
  options:string[];
  answer:number;
};

const QUESTIONS:any[] = [
  {
    "id": "l103_ex1_q1",
    "mission": 1,
    "prompt": "إِحْسِبْ: اثْنَانِ وَأَرْبَعُونَ زَائِدَ خَمْسَةَ عَشَرَ.",
    "audioKey": "l103_ex1_q1",
    "additionActivity": {
      "title": "أُمَثِّلُ بِالْعَشَرَاتِ وَالْوَحَدَاتِ",
      "mode": "blocks",
      "numbers": [
        42,
        15
      ],
      "expression": "42 + 15 = ؟",
      "options": [
        "57",
        "67",
        "47",
        "56"
      ],
      "answer": 0
    }
  },
  {
    "id": "l103_ex1_q2",
    "mission": 1,
    "prompt": "إِحْسِبْ: أَرْبَعَةٌ وَثَلَاثُونَ زَائِدَ اثْنَانِ وَعِشْرُونَ.",
    "audioKey": "l103_ex1_q2",
    "additionActivity": {
      "title": "أُمَثِّلُ بِالْعَشَرَاتِ وَالْوَحَدَاتِ",
      "mode": "blocks",
      "numbers": [
        34,
        22
      ],
      "expression": "34 + 22 = ؟",
      "options": [
        "46",
        "56",
        "66",
        "55"
      ],
      "answer": 1
    }
  },
  {
    "id": "l103_ex1_q3",
    "mission": 1,
    "prompt": "إِحْسِبْ: وَاحِدٌ وَخَمْسُونَ زَائِدَ ثَمَانِيَةَ عَشَرَ.",
    "audioKey": "l103_ex1_q3",
    "additionActivity": {
      "title": "أُمَثِّلُ بِالْعَشَرَاتِ وَالْوَحَدَاتِ",
      "mode": "blocks",
      "numbers": [
        51,
        18
      ],
      "expression": "51 + 18 = ؟",
      "options": [
        "79",
        "59",
        "69",
        "68"
      ],
      "answer": 2
    }
  },
  {
    "id": "l103_ex1_q4",
    "mission": 1,
    "prompt": "إِحْسِبْ: سِتَّةٌ وَعِشْرُونَ زَائِدَ ثَلَاثَةَ عَشَرَ.",
    "audioKey": "l103_ex1_q4",
    "additionActivity": {
      "title": "أُمَثِّلُ بِالْعَشَرَاتِ وَالْوَحَدَاتِ",
      "mode": "blocks",
      "numbers": [
        26,
        13
      ],
      "expression": "26 + 13 = ؟",
      "options": [
        "29",
        "49",
        "38",
        "39"
      ],
      "answer": 3
    }
  },
  {
    "id": "l103_ex2_q1",
    "mission": 2,
    "prompt": "ضَعْ الْآحَادَ تَحْتَ الْآحَادِ، وَالْعَشَرَاتِ تَحْتَ الْعَشَرَاتِ، ثُمَّ إِحْسِبْ.",
    "audioKey": "l103_ex2_q1",
    "additionActivity": {
      "title": "أُنْجِزُ الْجَمْعَ عَمُودِيًّا",
      "mode": "vertical",
      "numbers": [
        66,
        23
      ],
      "expression": "66 + 23 = ؟",
      "options": [
        "89",
        "79",
        "99",
        "88"
      ],
      "answer": 0
    }
  },
  {
    "id": "l103_ex2_q2",
    "mission": 2,
    "prompt": "إِحْسِبْ عَمُودِيًّا: ثَلَاثَةٌ وَسَبْعُونَ زَائِدَ خَمْسَةَ عَشَرَ.",
    "audioKey": "l103_ex2_q2",
    "additionActivity": {
      "title": "أُنْجِزُ الْجَمْعَ عَمُودِيًّا",
      "mode": "vertical",
      "numbers": [
        73,
        15
      ],
      "expression": "73 + 15 = ؟",
      "options": [
        "78",
        "88",
        "98",
        "87"
      ],
      "answer": 1
    }
  },
  {
    "id": "l103_ex2_q3",
    "mission": 2,
    "prompt": "إِحْسِبْ عَمُودِيًّا: وَاحِدٌ وَثَلَاثُونَ زَائِدَ ثَمَانِيَةٌ.",
    "audioKey": "l103_ex2_q3",
    "additionActivity": {
      "title": "أُنْجِزُ الْجَمْعَ عَمُودِيًّا",
      "mode": "vertical",
      "numbers": [
        31,
        8
      ],
      "expression": "31 + 8 = ؟",
      "options": [
        "49",
        "38",
        "39",
        "29"
      ],
      "answer": 2
    }
  },
  {
    "id": "l103_ex2_q4",
    "mission": 2,
    "prompt": "إِحْسِبْ عَمُودِيًّا: سِتَّةٌ وَعِشْرُونَ زَائِدَ ثَلَاثَةٌ وَخَمْسُونَ.",
    "audioKey": "l103_ex2_q4",
    "additionActivity": {
      "title": "أُنْجِزُ الْجَمْعَ عَمُودِيًّا",
      "mode": "vertical",
      "numbers": [
        26,
        53
      ],
      "expression": "26 + 53 = ؟",
      "options": [
        "69",
        "89",
        "78",
        "79"
      ],
      "answer": 3
    }
  },
  {
    "id": "l103_ex3_q1",
    "mission": 3,
    "prompt": "إِحْسِبْ: أَرْبَعَةَ عَشَرَ زَائِدَ اثْنَانِ زَائِدَ وَاحِدٌ وَثَلَاثُونَ.",
    "audioKey": "l103_ex3_q1",
    "additionActivity": {
      "title": "أَضَعُ الْعَمَلِيَّةَ وَأَحْسِبُ",
      "mode": "equation",
      "numbers": [
        14,
        2,
        31
      ],
      "expression": "14 + 2 + 31 = ؟",
      "options": [
        "47",
        "57",
        "46",
        "37"
      ],
      "answer": 0
    }
  },
  {
    "id": "l103_ex3_q2",
    "mission": 3,
    "prompt": "إِحْسِبْ: خَمْسُونَ زَائِدَ تِسْعَةٌ وَعِشْرُونَ.",
    "audioKey": "l103_ex3_q2",
    "additionActivity": {
      "title": "أَضَعُ الْعَمَلِيَّةَ وَأَحْسِبُ",
      "mode": "equation",
      "numbers": [
        50,
        29
      ],
      "expression": "50 + 29 = ؟",
      "options": [
        "69",
        "79",
        "89",
        "78"
      ],
      "answer": 1
    }
  },
  {
    "id": "l103_ex3_q3",
    "mission": 3,
    "prompt": "إِحْسِبْ: وَاحِدٌ وَعِشْرُونَ زَائِدَ أَرْبَعَةٌ زَائِدَ اثْنَا عَشَرَ.",
    "audioKey": "l103_ex3_q3",
    "additionActivity": {
      "title": "أَضَعُ الْعَمَلِيَّةَ وَأَحْسِبُ",
      "mode": "equation",
      "numbers": [
        21,
        4,
        12
      ],
      "expression": "21 + 4 + 12 = ؟",
      "options": [
        "27",
        "47",
        "37",
        "36"
      ],
      "answer": 2
    }
  },
  {
    "id": "l103_ex3_q4",
    "mission": 3,
    "prompt": "إِحْسِبْ: ثَلَاثُونَ زَائِدَ سِتَّةَ عَشَرَ.",
    "audioKey": "l103_ex3_q4",
    "additionActivity": {
      "title": "أَضَعُ الْعَمَلِيَّةَ وَأَحْسِبُ",
      "mode": "equation",
      "numbers": [
        30,
        16
      ],
      "expression": "30 + 16 = ؟",
      "options": [
        "36",
        "56",
        "45",
        "46"
      ],
      "answer": 3
    }
  },
  {
    "id": "l103_ex4_q1",
    "mission": 4,
    "prompt": "أَكْمِلْ: أَرْبَعُونَ زَائِدَ اثْنَا عَشَرَ.",
    "audioKey": "l103_ex4_q1",
    "additionActivity": {
      "title": "أَكْمِلْ الْعَمَلِيَّةَ",
      "mode": "missing",
      "numbers": [
        40,
        12
      ],
      "expression": "40 + 12 = ؟",
      "options": [
        "52",
        "42",
        "62",
        "51"
      ],
      "answer": 0
    }
  },
  {
    "id": "l103_ex4_q2",
    "mission": 4,
    "prompt": "أَكْمِلْ: أَرْبَعَةٌ وَعِشْرُونَ زَائِدَ ثَلَاثَةَ عَشَرَ.",
    "audioKey": "l103_ex4_q2",
    "additionActivity": {
      "title": "أَكْمِلْ الْعَمَلِيَّةَ",
      "mode": "missing",
      "numbers": [
        24,
        13
      ],
      "expression": "24 + 13 = ؟",
      "options": [
        "27",
        "37",
        "47",
        "36"
      ],
      "answer": 1
    }
  },
  {
    "id": "l103_ex4_q3",
    "mission": 4,
    "prompt": "أَكْمِلْ: خَمْسَةٌ وَعِشْرُونَ زَائِدَ أَرْبَعَةٌ وَعِشْرُونَ.",
    "audioKey": "l103_ex4_q3",
    "additionActivity": {
      "title": "أَكْمِلْ الْعَمَلِيَّةَ",
      "mode": "missing",
      "numbers": [
        25,
        24
      ],
      "expression": "25 + 24 = ؟",
      "options": [
        "39",
        "48",
        "49",
        "59"
      ],
      "answer": 2
    }
  },
  {
    "id": "l103_ex4_q4",
    "mission": 4,
    "prompt": "أَكْمِلْ: اثْنَانِ وَثَلَاثُونَ زَائِدَ سَبْعَةَ عَشَرَ.",
    "audioKey": "l103_ex4_q4",
    "additionActivity": {
      "title": "أَكْمِلْ الْعَمَلِيَّةَ",
      "mode": "missing",
      "numbers": [
        32,
        17
      ],
      "expression": "32 + 17 = ؟",
      "options": [
        "39",
        "59",
        "48",
        "49"
      ],
      "answer": 3
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أُمَثِّلُ بِالْعَشَرَاتِ وَالْوَحَدَاتِ",
  2:"أُنْجِزُ الْجَمْعَ عَمُودِيًّا",
  3:"أَضَعُ الْعَمَلِيَّةَ وَأَحْسِبُ",
  4:"أَكْمِلْ الْعَمَلِيَّةَ",
};

const navy="#173A63";
const gold="#E9AE22";
const green="#28A96B";
const red="#D9534F";


// ============================================================
// BASE TEN VISUALS
// ============================================================

function TenRod() {
  return (
    <div
      aria-hidden="true"
      style={{
        width:24,
        height:126,
        border:`2px solid ${navy}`,
        borderRadius:7,
        overflow:"hidden",
        display:"grid",
        gridTemplateRows:"repeat(10,1fr)",
        background:"#fff",
        boxShadow:"0 3px 8px rgba(23,58,99,.10)",
      }}
    >
      {Array.from({length:10}).map((_,i)=>(
        <div
          key={i}
          style={{
            background:"#DCEBFA",
            borderBottom:
              i===9
                ? "none"
                : "1px solid rgba(23,58,99,.28)",
          }}
        />
      ))}
    </div>
  );
}

function OneCube() {
  return (
    <div
      aria-hidden="true"
      style={{
        width:24,
        height:24,
        border:`2px solid ${navy}`,
        borderRadius:5,
        background:"#FFF3C4",
        boxShadow:"0 2px 6px rgba(23,58,99,.10)",
      }}
    />
  );
}

function NumberBlocks({
  value,
}:{
  value:number;
}) {
  const tens=Math.floor(value/10);
  const ones=value%10;

  return (
    <div
      style={{
        border:"2px solid #E7EDF4",
        background:"#FBFDFF",
        borderRadius:20,
        padding:12,
        display:"grid",
        gap:10,
        minWidth:130,
      }}
    >
      <div
        style={{
          textAlign:"center",
          color:navy,
          fontSize:24,
          fontWeight:950,
        }}
      >
        {value}
      </div>

      <div
        style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"flex-end",
          gap:12,
          flexWrap:"wrap",
        }}
      >
        <div
          style={{
            display:"flex",
            alignItems:"flex-end",
            justifyContent:"center",
            gap:4,
            flexWrap:"wrap",
          }}
        >
          {Array.from({length:tens}).map((_,i)=>(
            <TenRod key={i}/>
          ))}
        </div>

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,24px)",
            gap:4,
            alignContent:"end",
          }}
        >
          {Array.from({length:ones}).map((_,i)=>(
            <OneCube key={i}/>
          ))}
        </div>
      </div>

      <div
        style={{
          display:"flex",
          justifyContent:"center",
          gap:16,
          color:navy,
          fontSize:14,
          fontWeight:900,
        }}
      >
        <span>
          {tens} عَشَرَات
        </span>

        <span>
          {ones} وَحَدَات
        </span>
      </div>
    </div>
  );
}

function BlocksVisual({
  numbers,
}:{
  numbers:number[];
}) {
  return (
    <div
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexWrap:"wrap",
        gap:12,
        direction:"ltr",
      }}
    >
      {numbers.map((value,index)=>(
        <div
          key={index}
          style={{
            display:"flex",
            alignItems:"center",
            gap:10,
          }}
        >
          {index>0 && (
            <div
              style={{
                fontSize:38,
                color:navy,
                fontWeight:950,
              }}
            >
              +
            </div>
          )}

          <NumberBlocks value={value}/>
        </div>
      ))}
    </div>
  );
}


// ============================================================
// VERTICAL ADDITION
// ============================================================

function VerticalVisual({
  numbers,
  resolvedAnswer,
}:{
  numbers:number[];
  resolvedAnswer:string|null;
}) {
  const first=numbers[0];
  const second=numbers[1];

  const aT=Math.floor(first/10);
  const aO=first%10;

  const bT=Math.floor(second/10);
  const bO=second%10;

  return (
    <div
      style={{
        width:190,
        margin:"0 auto",
        border:`3px solid ${navy}`,
        borderRadius:20,
        overflow:"hidden",
        background:"#fff",
        direction:"ltr",
        boxShadow:"0 8px 18px rgba(23,58,99,.10)",
      }}
    >
      <div
        style={{
          display:"grid",
          gridTemplateColumns:"45px 1fr 1fr",
          background:"#EFF6FC",
          borderBottom:`2px solid ${navy}`,
          color:navy,
          fontWeight:950,
          textAlign:"center",
          fontSize:20,
          padding:"7px 4px",
        }}
      >
        <span></span>
        <span>ع</span>
        <span>و</span>
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"45px 1fr 1fr",
          textAlign:"center",
          fontSize:30,
          fontWeight:950,
          color:navy,
          padding:"7px 4px",
        }}
      >
        <span></span>
        <span>{aT || ""}</span>
        <span>{aO}</span>
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"45px 1fr 1fr",
          textAlign:"center",
          fontSize:30,
          fontWeight:950,
          color:navy,
          padding:"7px 4px",
          borderBottom:`4px solid ${navy}`,
        }}
      >
        <span>+</span>
        <span>{bT || ""}</span>
        <span>{bO}</span>
      </div>

      <div
        style={{
          height:50,
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          color:"#8A9CAF",
          fontSize:24,
          fontWeight:900,
        }}
      >
        {resolvedAnswer ?? "؟"}
      </div>
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
  activity:AdditionActivity;
  resolvedAnswer:string|null;
}) {
  if(activity.mode==="blocks") {
    return (
      <BlocksVisual
        numbers={activity.numbers}
      />
    );
  }

  if(activity.mode==="vertical") {
    return (
      <VerticalVisual
        numbers={activity.numbers}
        resolvedAnswer={resolvedAnswer}
      />
    );
  }

  return (
    <div
      dir="ltr"
      style={{
        minHeight:130,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        color:navy,
        fontSize:"clamp(32px,8vw,52px)",
        fontWeight:950,
        letterSpacing:1,
      }}
    >
      {
        resolvedAnswer
          ? activity.expression.replace("؟", resolvedAnswer)
          : activity.expression
      }
    </div>
  );
}


// ============================================================
// ACTIVITY
// ============================================================

function AdditionLab({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:AdditionActivity;
  locked:boolean;
  showResult:boolean;
  onResult:(ok:boolean)=>void;
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
      ? activity.options[activity.answer]
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
          boxShadow:"0 10px 24px rgba(23,58,99,.08)",
        }}
      >
        <div
          style={{
            textAlign:"center",
            color:navy,
            fontWeight:950,
            fontSize:"clamp(18px,4.6vw,24px)",
            marginBottom:14,
          }}
        >
          {activity.title}
        </div>

        <MainVisual
          activity={activity}
          resolvedAnswer={resolvedAnswer}
        />

        {activity.mode==="vertical" && (
          <div
            style={{
              marginTop:12,
              padding:"8px 10px",
              borderRadius:14,
              background:"#FFF8DC",
              textAlign:"center",
              color:navy,
              fontWeight:900,
              lineHeight:1.7,
            }}
          >
            الْآحَادُ تَحْتَ الْآحَادِ،
            وَالْعَشَرَاتُ تَحْتَ الْعَشَرَاتِ.
          </div>
        )}
      </div>

      <div
        dir="ltr"
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(2,minmax(0,1fr))",
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
                  minHeight:88,
                  border:`3px solid ${border}`,
                  borderRadius:23,
                  background,
                  boxShadow:"0 7px 16px rgba(23,58,99,.08)",
                  color:navy,
                  fontFamily:"inherit",
                  fontSize:"clamp(25px,6vw,34px)",
                  fontWeight:950,
                  cursor:locked ? "default" : "pointer",
                }}
              >
                {option}
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
    <AdditionLab
      questionId={question.id}
      activity={question.additionActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}


export const Lesson103NoCarryAdditionExercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson103"
    audioBase="/audio/teachers/khalil/lesson_103_no_carry_addition/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تُنْجِزُ عَمَلِيَّاتِ الْجَمْعِ دُونَ احْتِفَاظٍ."
    nextPath="/lesson-v2/104"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson103NoCarryAdditionExercises;
