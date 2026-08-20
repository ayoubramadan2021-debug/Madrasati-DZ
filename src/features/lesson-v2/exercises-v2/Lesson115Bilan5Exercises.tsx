import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type BilanMode =
  | "tens"
  | "decompose"
  | "shape"
  | "days"
  | "parity"
  | "addition";

type BilanActivity = {
  title:string;
  mode:BilanMode;
  options:string[];
  answer:number;

  tens?:number;
  ones?:number;

  number?:number;
  parts?:number[];

  a?:number;
  b?:number;
  result?:number;
};

const QUESTIONS:any[] = [
  {
    "id": "l115_ex1_q1",
    "mission": 1,
    "prompt": "خَمْسُ عَشَرَاتٍ وَثَلَاثَةُ آحَادٍ. مَا الْعَدَدُ؟",
    "audioKey": "l115_ex1_q1",
    "bilanActivity": {
      "title": "أَقْرَأُ الْعَشَرَاتِ وَالْآحَادَ",
      "mode": "tens",
      "options": [
        "53",
        "35",
        "58",
        "63"
      ],
      "answer": 0,
      "tens": 5,
      "ones": 3
    }
  },
  {
    "id": "l115_ex1_q2",
    "mission": 1,
    "prompt": "سِتُّ عَشَرَاتٍ وَخَمْسَةُ آحَادٍ. مَا الْعَدَدُ؟",
    "audioKey": "l115_ex1_q2",
    "bilanActivity": {
      "title": "أَقْرَأُ الْعَشَرَاتِ وَالْآحَادَ",
      "mode": "tens",
      "options": [
        "56",
        "65",
        "75",
        "60"
      ],
      "answer": 1,
      "tens": 6,
      "ones": 5
    }
  },
  {
    "id": "l115_ex1_q3",
    "mission": 1,
    "prompt": "سَبْعُ عَشَرَاتٍ وَاثْنَانِ مِنَ الْآحَادِ. مَا الْعَدَدُ؟",
    "audioKey": "l115_ex1_q3",
    "bilanActivity": {
      "title": "أَقْرَأُ الْعَشَرَاتِ وَالْآحَادَ",
      "mode": "tens",
      "options": [
        "27",
        "70",
        "72",
        "62"
      ],
      "answer": 2,
      "tens": 7,
      "ones": 2
    }
  },
  {
    "id": "l115_ex1_q4",
    "mission": 1,
    "prompt": "أَرْبَعُ عَشَرَاتٍ وَوَاحِدٌ مِنَ الْآحَادِ. مَا الْعَدَدُ؟",
    "audioKey": "l115_ex1_q4",
    "bilanActivity": {
      "title": "أَقْرَأُ الْعَشَرَاتِ وَالْآحَادَ",
      "mode": "tens",
      "options": [
        "14",
        "40",
        "51",
        "41"
      ],
      "answer": 3,
      "tens": 4,
      "ones": 1
    }
  },
  {
    "id": "l115_ex2_q1",
    "mission": 2,
    "prompt": "أَكْمِلْ تَفْكِيكَ الْعَدَدِ ثَلَاثَةٍ وَسَبْعِينَ.",
    "audioKey": "l115_ex2_q1",
    "bilanActivity": {
      "title": "أُفَكِّكُ الْعَدَدَ",
      "mode": "decompose",
      "options": [
        "50 + 20 + 3",
        "50 + 20 + 2",
        "40 + 20 + 3",
        "60 + 20 + 3"
      ],
      "answer": 0,
      "number": 73,
      "parts": [
        50,
        20,
        3
      ]
    }
  },
  {
    "id": "l115_ex2_q2",
    "mission": 2,
    "prompt": "أَكْمِلْ تَفْكِيكَ الْعَدَدِ ثَمَانِيَةٍ وَسِتِّينَ.",
    "audioKey": "l115_ex2_q2",
    "bilanActivity": {
      "title": "أُفَكِّكُ الْعَدَدَ",
      "mode": "decompose",
      "options": [
        "20 + 30 + 8",
        "20 + 40 + 8",
        "30 + 40 + 8",
        "20 + 40 + 6"
      ],
      "answer": 1,
      "number": 68,
      "parts": [
        20,
        40,
        8
      ]
    }
  },
  {
    "id": "l115_ex2_q3",
    "mission": 2,
    "prompt": "أَكْمِلْ تَفْكِيكَ الْعَدَدِ سَبْعَةٍ وَأَرْبَعِينَ.",
    "audioKey": "l115_ex2_q3",
    "bilanActivity": {
      "title": "أُفَكِّكُ الْعَدَدَ",
      "mode": "decompose",
      "options": [
        "10 + 20 + 7",
        "20 + 30 + 7",
        "10 + 30 + 7",
        "10 + 30 + 4"
      ],
      "answer": 2,
      "number": 47,
      "parts": [
        10,
        30,
        7
      ]
    }
  },
  {
    "id": "l115_ex2_q4",
    "mission": 2,
    "prompt": "أَكْمِلْ تَفْكِيكَ الْعَدَدِ خَمْسَةٍ وَسِتِّينَ.",
    "audioKey": "l115_ex2_q4",
    "bilanActivity": {
      "title": "أُفَكِّكُ الْعَدَدَ",
      "mode": "decompose",
      "options": [
        "30 + 20 + 5",
        "50 + 20 + 5",
        "40 + 10 + 5",
        "40 + 20 + 5"
      ],
      "answer": 3,
      "number": 65,
      "parts": [
        40,
        20,
        5
      ]
    }
  },
  {
    "id": "l115_ex3_q1",
    "mission": 3,
    "prompt": "أَيُّ شَكْلٍ لَهُ ثَلَاثَةُ أَضْلَاعٍ؟",
    "audioKey": "l115_ex3_q1",
    "bilanActivity": {
      "title": "أُمَيِّزُ الْأَشْكَالَ الْهَنْدَسِيَّةَ",
      "mode": "shape",
      "options": [
        "مُثَلَّثٌ",
        "دَائِرَةٌ",
        "مُرَبَّعٌ",
        "مُسْتَطِيلٌ"
      ],
      "answer": 0
    }
  },
  {
    "id": "l115_ex3_q2",
    "mission": 3,
    "prompt": "أَيُّ شَكْلٍ مُسْتَدِيرٌ وَلَيْسَ لَهُ أَضْلَاعٌ؟",
    "audioKey": "l115_ex3_q2",
    "bilanActivity": {
      "title": "أُمَيِّزُ الْأَشْكَالَ الْهَنْدَسِيَّةَ",
      "mode": "shape",
      "options": [
        "مُرَبَّعٌ",
        "دَائِرَةٌ",
        "مُثَلَّثٌ",
        "مُسْتَطِيلٌ"
      ],
      "answer": 1
    }
  },
  {
    "id": "l115_ex3_q3",
    "mission": 3,
    "prompt": "مَا الْيَوْمُ الَّذِي يَأْتِي بَعْدَ الثُّلَاثَاءِ؟",
    "audioKey": "l115_ex3_q3",
    "bilanActivity": {
      "title": "أُرَتِّبُ أَيَّامَ الْأُسْبُوعِ",
      "mode": "days",
      "options": [
        "الْإِثْنَيْنُ",
        "الْخَمِيسُ",
        "الْأَرْبِعَاءُ",
        "الْجُمُعَةُ"
      ],
      "answer": 2
    }
  },
  {
    "id": "l115_ex3_q4",
    "mission": 3,
    "prompt": "مَا الْيَوْمُ الثَّالِثُ فِي تَرْتِيبِ الْأُسْبُوعِ؟",
    "audioKey": "l115_ex3_q4",
    "bilanActivity": {
      "title": "أُرَتِّبُ أَيَّامَ الْأُسْبُوعِ",
      "mode": "days",
      "options": [
        "الْأَحَدُ",
        "الْإِثْنَيْنُ",
        "الْأَرْبِعَاءُ",
        "الثُّلَاثَاءُ"
      ],
      "answer": 3
    }
  },
  {
    "id": "l115_ex4_q1",
    "mission": 4,
    "prompt": "هَلِ الْعَدَدُ وَاحِدٌ وَعِشْرُونَ زَوْجِيٌّ أَمْ فَرْدِيٌّ؟",
    "audioKey": "l115_ex4_q1",
    "bilanActivity": {
      "title": "أُمَيِّزُ الزَّوْجِيَّ وَالْفَرْدِيَّ",
      "mode": "parity",
      "options": [
        "فَرْدِيٌّ",
        "زَوْجِيٌّ",
        "يُسَاوِي صِفْرًا",
        "لَا أَعْرِفُ"
      ],
      "answer": 0,
      "number": 21
    }
  },
  {
    "id": "l115_ex4_q2",
    "mission": 4,
    "prompt": "هَلِ الْعَدَدُ ثَمَانِيَةٌ وَسِتُّونَ زَوْجِيٌّ أَمْ فَرْدِيٌّ؟",
    "audioKey": "l115_ex4_q2",
    "bilanActivity": {
      "title": "أُمَيِّزُ الزَّوْجِيَّ وَالْفَرْدِيَّ",
      "mode": "parity",
      "options": [
        "فَرْدِيٌّ",
        "زَوْجِيٌّ",
        "يُسَاوِي صِفْرًا",
        "لَا أَعْرِفُ"
      ],
      "answer": 1,
      "number": 68
    }
  },
  {
    "id": "l115_ex4_q3",
    "mission": 4,
    "prompt": "إِحْسِبْ: وَاحِدٌ وَأَرْبَعُونَ زَائِدَ خَمْسَةً وَثَلَاثِينَ.",
    "audioKey": "l115_ex4_q3",
    "bilanActivity": {
      "title": "أَجْمَعُ مَجْمُوعَتَيْنِ",
      "mode": "addition",
      "options": [
        "66",
        "75",
        "76",
        "86"
      ],
      "answer": 2,
      "a": 41,
      "b": 35,
      "result": 76
    }
  },
  {
    "id": "l115_ex4_q4",
    "mission": 4,
    "prompt": "إِحْسِبْ: أَرْبَعَةٌ وَعِشْرُونَ زَائِدَ اثْنَيْنِ وَثَلَاثِينَ.",
    "audioKey": "l115_ex4_q4",
    "bilanActivity": {
      "title": "أَجْمَعُ مَجْمُوعَتَيْنِ",
      "mode": "addition",
      "options": [
        "46",
        "66",
        "54",
        "56"
      ],
      "answer": 3,
      "a": 24,
      "b": 32,
      "result": 56
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَقْرَأُ الْعَشَرَاتِ وَالْآحَادَ",
  2:"أُفَكِّكُ الْأَعْدَادَ",
  3:"أُرَاجِعُ الْأَشْكَالَ وَأَيَّامَ الْأُسْبُوعِ",
  4:"أُمَيِّزُ الزَّوْجِيَّ وَالْفَرْدِيَّ وَأَجْمَعُ",
};

const navy="#173A63";
const gold="#E9AE22";
const green="#28A96B";
const red="#D9534F";


// ============================================================
// BASE TEN
// ============================================================

function TensVisual({
  activity,
}:{
  activity:BilanActivity;
}) {
  const tens=activity.tens ?? 0;
  const ones=activity.ones ?? 0;

  return (
    <div
      dir="rtl"
      style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:12,
        width:"100%",
      }}
    >
      <div
        style={{
          border:`3px solid ${gold}`,
          borderRadius:20,
          background:"#FFF9E8",
          padding:10,
        }}
      >
        <div
          style={{
            textAlign:"center",
            color:navy,
            fontWeight:950,
            fontSize:17,
            marginBottom:10,
          }}
        >
          الْعَشَرَاتُ
        </div>

        <div
          style={{
            minHeight:105,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexWrap:"wrap",
            gap:5,
          }}
        >
          {Array.from({length:tens}).map((_,i)=>(
            <div
              key={i}
              style={{
                width:17,
                height:88,
                border:`2px solid ${navy}`,
                borderRadius:5,
                background:"#F4C84E",
                display:"grid",
                gridTemplateRows:"repeat(10,1fr)",
                overflow:"hidden",
              }}
            >
              {Array.from({length:10}).map((_,j)=>(
                <div
                  key={j}
                  style={{
                    borderBottom:
                      j<9
                        ? "1px solid rgba(23,58,99,.42)"
                        : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign:"center",
            color:navy,
            fontWeight:950,
            fontSize:25,
          }}
        >
          {tens}
        </div>
      </div>

      <div
        style={{
          border:`3px solid ${gold}`,
          borderRadius:20,
          background:"#EEF8FC",
          padding:10,
        }}
      >
        <div
          style={{
            textAlign:"center",
            color:navy,
            fontWeight:950,
            fontSize:17,
            marginBottom:10,
          }}
        >
          الْآحَادُ
        </div>

        <div
          style={{
            minHeight:105,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexWrap:"wrap",
            gap:7,
          }}
        >
          {Array.from({length:ones}).map((_,i)=>(
            <div
              key={i}
              style={{
                width:25,
                height:25,
                border:`2px solid ${navy}`,
                borderRadius:5,
                background:"#75C7E7",
              }}
            />
          ))}
        </div>

        <div
          style={{
            textAlign:"center",
            color:navy,
            fontWeight:950,
            fontSize:25,
          }}
        >
          {ones}
        </div>
      </div>
    </div>
  );
}


// ============================================================
// DECOMPOSITION
// ============================================================

function DecomposeVisual({
  activity,
  resolved,
}:{
  activity:BilanActivity;
  resolved:string|null;
}) {
  return (
    <div
      dir="ltr"
      style={{
        minHeight:160,
        display:"grid",
        placeItems:"center",
        gap:14,
      }}
    >
      <div
        style={{
          width:88,
          height:88,
          borderRadius:99,
          border:`4px solid ${gold}`,
          background:"#FFF9E8",
          color:navy,
          fontSize:34,
          fontWeight:950,
          display:"grid",
          placeItems:"center",
        }}
      >
        {activity.number}
      </div>

      <div
        style={{
          color:navy,
          fontWeight:950,
          fontSize:"clamp(24px,6vw,34px)",
        }}
      >
        {activity.number}
        {" = "}

        <span
          style={{
            color:
              resolved
                ? green
                : "#B27A00",
          }}
        >
          {resolved ?? "؟"}
        </span>
      </div>
    </div>
  );
}


// ============================================================
// SHAPE
// ============================================================

function Shape({
  name,
  size=68,
}:{
  name:string;
  size?:number;
}) {
  if(name.includes("مُثَلَّث")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        <path
          d="M50 10 L90 86 L10 86 Z"
          fill="#F4C94E"
          stroke={navy}
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if(name.includes("دَائِرَة")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="#79C8E8"
          stroke={navy}
          strokeWidth="6"
        />
      </svg>
    );
  }

  if(name.includes("مُرَبَّع")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          rx="4"
          fill="#8BCF8B"
          stroke={navy}
          strokeWidth="6"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
    >
      <rect
        x="8"
        y="25"
        width="84"
        height="50"
        rx="4"
        fill="#E9A789"
        stroke={navy}
        strokeWidth="6"
      />
    </svg>
  );
}


function ShapeVisual() {
  return (
    <div
      style={{
        minHeight:160,
        display:"grid",
        placeItems:"center",
      }}
    >
      <div
        style={{
          width:"100%",
          display:"grid",
          gridTemplateColumns:"repeat(4,minmax(0,1fr))",
          gap:7,
        }}
      >
        {[
          "مُثَلَّثٌ",
          "دَائِرَةٌ",
          "مُرَبَّعٌ",
          "مُسْتَطِيلٌ",
        ].map(name=>(
          <div
            key={name}
            style={{
              minWidth:0,
              height:95,
              border:`2px solid ${gold}`,
              borderRadius:16,
              display:"grid",
              placeItems:"center",
              background:"#fff",
            }}
          >
            <Shape
              name={name}
              size={57}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================
// DAYS
// ============================================================

const DAYS = [
  "الْأَحَدُ",
  "الْإِثْنَيْنُ",
  "الثُّلَاثَاءُ",
  "الْأَرْبِعَاءُ",
  "الْخَمِيسُ",
  "الْجُمُعَةُ",
  "السَّبْتُ",
];


function DaysVisual() {
  return (
    <div
      dir="rtl"
      style={{
        width:"100%",
        minHeight:150,
        display:"grid",
        alignContent:"center",
      }}
    >
      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(7,minmax(0,1fr))",
          gap:4,
        }}
      >
        {DAYS.map((day,index)=>(
          <div
            key={day}
            style={{
              minWidth:0,
              height:70,
              border:`2px solid ${gold}`,
              borderRadius:11,
              background:
                index%2
                  ? "#EEF8FC"
                  : "#FFF6DD",
              overflow:"hidden",
              display:"grid",
              placeItems:"center",
              padding:2,
            }}
          >
            <div
              style={{
                color:navy,
                fontWeight:950,
                fontSize:10,
                whiteSpace:"nowrap",
                transform:"scale(.78)",
              }}
            >
              {day}
            </div>

            <div
              style={{
                color:"#8A6520",
                fontSize:14,
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
// PARITY
// ============================================================

function ParityVisual({
  activity,
}:{
  activity:BilanActivity;
}) {
  const n=activity.number ?? 0;

  return (
    <div
      style={{
        minHeight:160,
        display:"grid",
        placeItems:"center",
        gap:12,
      }}
    >
      <div
        style={{
          width:108,
          height:108,
          borderRadius:99,
          border:`4px solid ${gold}`,
          background:"#FFF9E8",
          color:navy,
          fontWeight:950,
          fontSize:40,
          display:"grid",
          placeItems:"center",
        }}
      >
        {n}
      </div>

      <div
        style={{
          color:navy,
          fontSize:18,
          fontWeight:950,
        }}
      >
        زَوْجِيٌّ أَمْ فَرْدِيٌّ؟
      </div>
    </div>
  );
}


// ============================================================
// ADDITION
// ============================================================

function AdditionVisual({
  activity,
  resolved,
}:{
  activity:BilanActivity;
  resolved:string|null;
}) {
  return (
    <div
      dir="ltr"
      style={{
        minHeight:165,
        display:"grid",
        placeItems:"center",
      }}
    >
      <div
        style={{
          color:navy,
          fontWeight:950,
          fontSize:"clamp(34px,9vw,48px)",
        }}
      >
        {activity.a}
        {" + "}
        {activity.b}
        {" = "}

        <span
          style={{
            color:
              resolved
                ? green
                : "#B27A00",
          }}
        >
          {resolved ?? "؟"}
        </span>
      </div>
    </div>
  );
}


// ============================================================
// MAIN VISUAL
// ============================================================

function MainVisual({
  activity,
  resolved,
}:{
  activity:BilanActivity;
  resolved:string|null;
}) {
  switch(activity.mode) {
    case "tens":
      return (
        <TensVisual
          activity={activity}
        />
      );

    case "decompose":
      return (
        <DecomposeVisual
          activity={activity}
          resolved={resolved}
        />
      );

    case "shape":
      return <ShapeVisual/>;

    case "days":
      return <DaysVisual/>;

    case "parity":
      return (
        <ParityVisual
          activity={activity}
        />
      );

    case "addition":
      return (
        <AdditionVisual
          activity={activity}
          resolved={resolved}
        />
      );

    default:
      return (
        <div
          style={{
            minHeight:120,
            display:"grid",
            placeItems:"center",
            color:red,
            fontWeight:950,
          }}
        >
          تَمْرِينٌ غَيْرُ مَعْرُوفٍ
        </div>
      );
  }
}


// ============================================================
// ANSWER
// ============================================================

function AnswerContent({
  option,
  mode,
}:{
  option:string;
  mode:BilanMode;
}) {
  if(mode==="shape") {
    return (
      <div
        style={{
          display:"grid",
          placeItems:"center",
          gap:5,
        }}
      >
        <Shape
          name={option}
          size={64}
        />

        <div
          style={{
            fontWeight:950,
            fontSize:16,
          }}
        >
          {option}
        </div>
      </div>
    );
  }

  return (
    <div
      dir={
        mode==="decompose"
          || mode==="addition"
          ? "ltr"
          : "rtl"
      }
      style={{
        color:navy,
        fontWeight:950,
        fontSize:
          mode==="tens"
          || mode==="addition"
            ? "clamp(27px,7vw,37px)"
            : mode==="decompose"
              ? "clamp(18px,4.7vw,24px)"
              : "clamp(16px,4.2vw,21px)",
        lineHeight:1.5,
        textAlign:"center",
      }}
    >
      {option}
    </div>
  );
}


// ============================================================
// LAB — SAME SIMPLE CONTRACT AS LESSON 114
// ============================================================

function BilanLab({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:BilanActivity;
  locked:boolean;
  showResult:boolean;
  onResult:(correct:boolean)=>void;
}) {
  const [selected,setSelected] =
    useState<number|null>(null);

  useEffect(()=>{
    setSelected(null);
  },[questionId]);

  if(!activity) {
    return (
      <div
        style={{
          padding:20,
          textAlign:"center",
          color:red,
          fontWeight:950,
        }}
      >
        تَعَذَّرَ تَحْمِيلُ التَّمْرِينِ.
      </div>
    );
  }

  const choose=(index:number)=>{
    if(locked) return;

    setSelected(index);

    onResult(
      index===activity.answer
    );
  };

  const resolved =
    selected===activity.answer
      ? activity.options[activity.answer]
      : null;

  return (
    <div
      style={{
        width:"100%",
        display:"grid",
        gap:14,
      }}
    >
      <div
        style={{
          border:`3px solid ${gold}`,
          borderRadius:27,
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
            fontSize:"clamp(18px,4.6vw,23px)",
            marginBottom:12,
          }}
        >
          {activity.title}
        </div>

        <MainVisual
          activity={activity}
          resolved={resolved}
        />
      </div>

      <div
        dir="rtl"
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(2,minmax(0,1fr))",
          gap:12,
        }}
      >
        {activity.options.map((option,index)=>{
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
              key={`${questionId}-${index}`}
              type="button"
              disabled={locked}
              onClick={()=>choose(index)}
              style={{
                minHeight:
                  activity.mode==="shape"
                    ? 142
                    : 108,
                border:`3px solid ${border}`,
                borderRadius:23,
                background,
                fontFamily:"inherit",
                padding:9,
                boxShadow:"0 7px 16px rgba(23,58,99,.08)",
                cursor:
                  locked
                    ? "default"
                    : "pointer",
              }}
            >
              <AnswerContent
                option={option}
                mode={activity.mode}
              />
            </button>
          );
        })}
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
    <BilanLab
      questionId={question.id}
      activity={question.bilanActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}


// ============================================================
// LESSON
// ============================================================

export const Lesson115Bilan5Exercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson115"
    audioBase="/audio/teachers/taline/lesson_115_bilan_5/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَتْمَمْتَ تَمَارِينَ الْحَصِيلَةِ الْخَامِسَةِ بِنَجَاحٍ."
    nextPath="/lesson-v2/116"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson115Bilan5Exercises;
