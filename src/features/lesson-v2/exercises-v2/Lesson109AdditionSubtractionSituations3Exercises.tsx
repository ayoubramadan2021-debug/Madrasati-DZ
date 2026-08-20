import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type ProblemMode =
  | "change"
  | "operation"
  | "calculate"
  | "table";

type ProblemActivity = {
  title:string;
  mode:ProblemMode;
  statement:string;
  options:string[];
  answer:number;

  before?:number;
  change?:number;
  changeType?:"add"|"subtract";
  operation?:string;
  result?:number;
};

const QUESTIONS:any[] = [
  {
    "id": "l109_ex1_q1",
    "mission": 1,
    "prompt": "كَانَ هُنَاكَ ثَلَاثٌ وَأَرْبَعُونَ صُورَةً، ثُمَّ أُضِيفَتْ خَمْسَ عَشْرَةَ صُورَةً. هَلِ الْعَدَدُ زَادَ أَمْ نَقَصَ؟",
    "audioKey": "l109_ex1_q1",
    "problemActivity": {
      "title": "أَفْهَمُ مَا حَدَثَ",
      "mode": "change",
      "statement": "43 صُورَةً، ثُمَّ أُضِيفَتْ 15 صُورَةً.",
      "options": [
        "زَادَ",
        "نَقَصَ",
        "لَمْ يَتَغَيَّرْ",
        "لَا أَعْرِفُ"
      ],
      "answer": 0,
      "before": 43,
      "change": 15,
      "changeType": "add",
      "operation": null,
      "result": null
    }
  },
  {
    "id": "l109_ex1_q2",
    "mission": 1,
    "prompt": "كَانَ عَلَى الشَّجَرَةِ تِسْعَةٌ وَخَمْسُونَ عُصْفُورًا، فَطَارَ مِنْهَا سَبْعَةُ عَصَافِيرَ. هَلِ الْعَدَدُ زَادَ أَمْ نَقَصَ؟",
    "audioKey": "l109_ex1_q2",
    "problemActivity": {
      "title": "أَفْهَمُ مَا حَدَثَ",
      "mode": "change",
      "statement": "59 عُصْفُورًا، ثُمَّ طَارَ 7 عَصَافِيرَ.",
      "options": [
        "زَادَ",
        "لَمْ يَتَغَيَّرْ",
        "نَقَصَ",
        "لَا أَعْرِفُ"
      ],
      "answer": 2,
      "before": 59,
      "change": 7,
      "changeType": "subtract",
      "operation": null,
      "result": null
    }
  },
  {
    "id": "l109_ex1_q3",
    "mission": 1,
    "prompt": "كَانَ فِي الصُّنْدُوقِ اثْنَانِ وَثَلَاثُونَ كُرَةً، ثُمَّ أُضِيفَتْ سِتَّةَ عَشَرَ كُرَةً. هَلِ الْعَدَدُ زَادَ أَمْ نَقَصَ؟",
    "audioKey": "l109_ex1_q3",
    "problemActivity": {
      "title": "أَفْهَمُ مَا حَدَثَ",
      "mode": "change",
      "statement": "32 كُرَةً، ثُمَّ أُضِيفَتْ 16 كُرَةً.",
      "options": [
        "نَقَصَ",
        "زَادَ",
        "لَمْ يَتَغَيَّرْ",
        "لَا أَعْرِفُ"
      ],
      "answer": 1,
      "before": 32,
      "change": 16,
      "changeType": "add",
      "operation": null,
      "result": null
    }
  },
  {
    "id": "l109_ex1_q4",
    "mission": 1,
    "prompt": "كَانَ فِي الْعُلْبَةِ ثَمَانِيَةٌ وَأَرْبَعُونَ قَلَمًا، أُخِذَ مِنْهَا سِتَّةُ أَقْلَامٍ. هَلِ الْعَدَدُ زَادَ أَمْ نَقَصَ؟",
    "audioKey": "l109_ex1_q4",
    "problemActivity": {
      "title": "أَفْهَمُ مَا حَدَثَ",
      "mode": "change",
      "statement": "48 قَلَمًا، ثُمَّ أُخِذَ مِنْهَا 6 أَقْلَامٍ.",
      "options": [
        "زَادَ",
        "لَمْ يَتَغَيَّرْ",
        "لَا أَعْرِفُ",
        "نَقَصَ"
      ],
      "answer": 3,
      "before": 48,
      "change": 6,
      "changeType": "subtract",
      "operation": null,
      "result": null
    }
  },
  {
    "id": "l109_ex2_q1",
    "mission": 2,
    "prompt": "أُضِيفَتْ خَمْسَ عَشْرَةَ صُورَةً إِلَى ثَلَاثٍ وَأَرْبَعِينَ صُورَةً. أَيَّ عَمَلِيَّةٍ أَسْتَعْمِلُ؟",
    "audioKey": "l109_ex2_q1",
    "problemActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ",
      "mode": "operation",
      "statement": "الْعَدَدُ زَادَ.",
      "options": [
        "43 + 15",
        "43 − 15",
        "15 − 43",
        "43 + 5"
      ],
      "answer": 0,
      "before": 43,
      "change": 15,
      "changeType": "add",
      "operation": "43 + 15",
      "result": 58
    }
  },
  {
    "id": "l109_ex2_q2",
    "mission": 2,
    "prompt": "كَانَ هُنَاكَ تِسْعَةٌ وَخَمْسُونَ عُصْفُورًا، فَطَارَ سَبْعَةٌ مِنْهَا. أَيَّ عَمَلِيَّةٍ أَسْتَعْمِلُ؟",
    "audioKey": "l109_ex2_q2",
    "problemActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ",
      "mode": "operation",
      "statement": "الْعَدَدُ نَقَصَ.",
      "options": [
        "59 + 7",
        "7 − 59",
        "59 − 7",
        "59 − 5"
      ],
      "answer": 2,
      "before": 59,
      "change": 7,
      "changeType": "subtract",
      "operation": "59 − 7",
      "result": 52
    }
  },
  {
    "id": "l109_ex2_q3",
    "mission": 2,
    "prompt": "أُضِيفَتْ سِتَّةَ عَشَرَ كُرَةً إِلَى اثْنَتَيْنِ وَثَلَاثِينَ كُرَةً. أَيَّ عَمَلِيَّةٍ أَسْتَعْمِلُ؟",
    "audioKey": "l109_ex2_q3",
    "problemActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ",
      "mode": "operation",
      "statement": "الْعَدَدُ زَادَ.",
      "options": [
        "32 − 16",
        "32 + 16",
        "16 − 32",
        "32 + 6"
      ],
      "answer": 1,
      "before": 32,
      "change": 16,
      "changeType": "add",
      "operation": "32 + 16",
      "result": 48
    }
  },
  {
    "id": "l109_ex2_q4",
    "mission": 2,
    "prompt": "كَانَ هُنَاكَ ثَمَانِيَةٌ وَأَرْبَعُونَ قَلَمًا، وَأُخِذَ مِنْهَا سِتَّةُ أَقْلَامٍ. أَيَّ عَمَلِيَّةٍ أَسْتَعْمِلُ؟",
    "audioKey": "l109_ex2_q4",
    "problemActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ",
      "mode": "operation",
      "statement": "الْعَدَدُ نَقَصَ.",
      "options": [
        "48 + 6",
        "6 − 48",
        "48 − 8",
        "48 − 6"
      ],
      "answer": 3,
      "before": 48,
      "change": 6,
      "changeType": "subtract",
      "operation": "48 − 6",
      "result": 42
    }
  },
  {
    "id": "l109_ex3_q1",
    "mission": 3,
    "prompt": "إِحْسِبْ: ثَلَاثَةٌ وَأَرْبَعُونَ زَائِدَ خَمْسَةَ عَشَرَ.",
    "audioKey": "l109_ex3_q1",
    "problemActivity": {
      "title": "إِحْسِبْ النَّتِيجَةَ",
      "mode": "calculate",
      "statement": "43 + 15 = ؟",
      "options": [
        "58",
        "48",
        "68",
        "57"
      ],
      "answer": 0,
      "before": null,
      "change": null,
      "changeType": null,
      "operation": "43 + 15",
      "result": 58
    }
  },
  {
    "id": "l109_ex3_q2",
    "mission": 3,
    "prompt": "إِحْسِبْ: تِسْعَةٌ وَخَمْسُونَ نَاقِصُ سَبْعَةٍ.",
    "audioKey": "l109_ex3_q2",
    "problemActivity": {
      "title": "إِحْسِبْ النَّتِيجَةَ",
      "mode": "calculate",
      "statement": "59 − 7 = ؟",
      "options": [
        "62",
        "52",
        "51",
        "53"
      ],
      "answer": 1,
      "before": null,
      "change": null,
      "changeType": null,
      "operation": "59 − 7",
      "result": 52
    }
  },
  {
    "id": "l109_ex3_q3",
    "mission": 3,
    "prompt": "إِحْسِبْ: اثْنَانِ وَثَلَاثُونَ زَائِدَ سِتَّةَ عَشَرَ.",
    "audioKey": "l109_ex3_q3",
    "problemActivity": {
      "title": "إِحْسِبْ النَّتِيجَةَ",
      "mode": "calculate",
      "statement": "32 + 16 = ؟",
      "options": [
        "38",
        "58",
        "48",
        "47"
      ],
      "answer": 2,
      "before": null,
      "change": null,
      "changeType": null,
      "operation": "32 + 16",
      "result": 48
    }
  },
  {
    "id": "l109_ex3_q4",
    "mission": 3,
    "prompt": "إِحْسِبْ: ثَمَانِيَةٌ وَأَرْبَعُونَ نَاقِصُ سِتَّةٍ.",
    "audioKey": "l109_ex3_q4",
    "problemActivity": {
      "title": "إِحْسِبْ النَّتِيجَةَ",
      "mode": "calculate",
      "statement": "48 − 6 = ؟",
      "options": [
        "52",
        "41",
        "38",
        "42"
      ],
      "answer": 3,
      "before": null,
      "change": null,
      "changeType": null,
      "operation": "48 − 6",
      "result": 42
    }
  },
  {
    "id": "l109_ex4_q1",
    "mission": 4,
    "prompt": "أَكْمِلْ: كَانَ هُنَاكَ ثَلَاثٌ وَأَرْبَعُونَ صُورَةً، وَأُضِيفَتْ خَمْسَ عَشْرَةَ صُورَةً. كَمْ أَصْبَحَ عَدَدُ الصُّوَرِ؟",
    "audioKey": "l109_ex4_q1",
    "problemActivity": {
      "title": "قَبْلَ، مَا حَدَثَ، الْآنَ",
      "mode": "table",
      "statement": "43 + 15 = ؟",
      "options": [
        "58",
        "48",
        "57",
        "68"
      ],
      "answer": 0,
      "before": 43,
      "change": 15,
      "changeType": "add",
      "operation": "43 + 15",
      "result": 58
    }
  },
  {
    "id": "l109_ex4_q2",
    "mission": 4,
    "prompt": "أَكْمِلْ: كَانَ عَلَى الشَّجَرَةِ تِسْعَةٌ وَخَمْسُونَ عُصْفُورًا، وَطَارَ سَبْعَةٌ. كَمْ بَقِيَ؟",
    "audioKey": "l109_ex4_q2",
    "problemActivity": {
      "title": "قَبْلَ، مَا حَدَثَ، الْآنَ",
      "mode": "table",
      "statement": "59 − 7 = ؟",
      "options": [
        "62",
        "52",
        "51",
        "53"
      ],
      "answer": 1,
      "before": 59,
      "change": 7,
      "changeType": "subtract",
      "operation": "59 − 7",
      "result": 52
    }
  },
  {
    "id": "l109_ex4_q3",
    "mission": 4,
    "prompt": "أَكْمِلْ: كَانَ فِي الصُّنْدُوقِ اثْنَانِ وَثَلَاثُونَ كُرَةً، وَأُضِيفَتْ سِتَّةَ عَشَرَ كُرَةً. كَمْ أَصْبَحَ عَدَدُ الْكُرَاتِ؟",
    "audioKey": "l109_ex4_q3",
    "problemActivity": {
      "title": "قَبْلَ، مَا حَدَثَ، الْآنَ",
      "mode": "table",
      "statement": "32 + 16 = ؟",
      "options": [
        "38",
        "58",
        "48",
        "47"
      ],
      "answer": 2,
      "before": 32,
      "change": 16,
      "changeType": "add",
      "operation": "32 + 16",
      "result": 48
    }
  },
  {
    "id": "l109_ex4_q4",
    "mission": 4,
    "prompt": "أَكْمِلْ: كَانَ فِي الْعُلْبَةِ ثَمَانِيَةٌ وَأَرْبَعُونَ قَلَمًا، وَأُخِذَ مِنْهَا سِتَّةُ أَقْلَامٍ. كَمْ بَقِيَ؟",
    "audioKey": "l109_ex4_q4",
    "problemActivity": {
      "title": "قَبْلَ، مَا حَدَثَ، الْآنَ",
      "mode": "table",
      "statement": "48 − 6 = ؟",
      "options": [
        "52",
        "41",
        "38",
        "42"
      ],
      "answer": 3,
      "before": 48,
      "change": 6,
      "changeType": "subtract",
      "operation": "48 − 6",
      "result": 42
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَفْهَمُ مَا حَدَثَ",
  2:"أَخْتَارُ الْعَمَلِيَّةَ",
  3:"إِحْسِبْ النَّتِيجَةَ",
  4:"أَحُلُّ الْمُشْكِلَةَ",
};

const navy="#173A63";
const gold="#E9AE22";
const green="#28A96B";
const red="#D9534F";


// ============================================================
// CHANGE VISUAL
// ============================================================

function ChangeVisual({
  activity,
}:{
  activity:ProblemActivity;
}) {
  const add =
    activity.changeType==="add";

  return (
    <div
      style={{
        display:"grid",
        gap:15,
      }}
    >
      <div
        dir="rtl"
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(3,minmax(0,1fr))",
          gap:9,
          alignItems:"stretch",
        }}
      >
        <div
          style={{
            border:`3px solid ${gold}`,
            borderRadius:20,
            padding:10,
            background:"#FFF9E8",
            textAlign:"center",
          }}
        >
          <div
            style={{
              color:"#8A6520",
              fontWeight:950,
              fontSize:15,
              marginBottom:6,
            }}
          >
            قَبْلَ
          </div>

          <div
            style={{
              color:navy,
              fontWeight:950,
              fontSize:32,
            }}
          >
            {activity.before}
          </div>
        </div>

        <div
          style={{
            border:
              `3px solid ${
                add
                  ? green
                  : red
              }`,
            borderRadius:20,
            padding:10,
            background:
              add
                ? "#EFFAF4"
                : "#FFF2F1",
            textAlign:"center",
          }}
        >
          <div
            style={{
              color:
                add
                  ? green
                  : red,
              fontWeight:950,
              fontSize:15,
              marginBottom:6,
            }}
          >
            مَا حَدَثَ
          </div>

          <div
            dir="ltr"
            style={{
              color:navy,
              fontWeight:950,
              fontSize:28,
            }}
          >
            {add ? "+" : "−"}
            {activity.change}
          </div>
        </div>

        <div
          style={{
            border:`3px solid ${gold}`,
            borderRadius:20,
            padding:10,
            background:"#fff",
            textAlign:"center",
          }}
        >
          <div
            style={{
              color:"#8A6520",
              fontWeight:950,
              fontSize:15,
              marginBottom:6,
            }}
          >
            الْآنَ
          </div>

          <div
            style={{
              color:navy,
              fontWeight:950,
              fontSize:32,
            }}
          >
            ؟
          </div>
        </div>
      </div>

      <div
        style={{
          color:navy,
          fontWeight:900,
          fontSize:"clamp(16px,4.2vw,20px)",
          textAlign:"center",
          lineHeight:1.7,
        }}
      >
        {activity.statement}
      </div>
    </div>
  );
}


// ============================================================
// OPERATION VISUAL
// ============================================================

function OperationVisual({
  activity,
}:{
  activity:ProblemActivity;
}) {
  const add =
    activity.changeType==="add";

  return (
    <div
      style={{
        minHeight:150,
        display:"grid",
        placeItems:"center",
        gap:13,
      }}
    >
      <div
        style={{
          width:94,
          height:94,
          borderRadius:99,
          border:
            `4px solid ${
              add
                ? green
                : red
            }`,
          background:
            add
              ? "#EFFAF4"
              : "#FFF2F1",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          color:
            add
              ? green
              : red,
          fontWeight:950,
          fontSize:52,
        }}
      >
        {add ? "+" : "−"}
      </div>

      <div
        style={{
          color:navy,
          fontWeight:950,
          fontSize:20,
          textAlign:"center",
        }}
      >
        {activity.statement}
      </div>
    </div>
  );
}


// ============================================================
// CALCULATION VISUAL
// ============================================================

function CalculationVisual({
  activity,
  resolvedAnswer,
}:{
  activity:ProblemActivity;
  resolvedAnswer:string|null;
}) {
  const shown =
    resolvedAnswer
      ? activity.statement.replace(
          "؟",
          resolvedAnswer,
        )
      : activity.statement;

  return (
    <div
      dir="ltr"
      style={{
        minHeight:150,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color:navy,
        fontWeight:950,
        fontSize:"clamp(34px,9vw,54px)",
        textAlign:"center",
      }}
    >
      {shown}
    </div>
  );
}


// ============================================================
// TABLE VISUAL
// ============================================================

function ProblemTable({
  activity,
  resolvedAnswer,
}:{
  activity:ProblemActivity;
  resolvedAnswer:string|null;
}) {
  const add =
    activity.changeType==="add";

  return (
    <div
      style={{
        display:"grid",
        gap:14,
      }}
    >
      <div
        dir="rtl"
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(3,minmax(0,1fr))",
          border:`3px solid ${navy}`,
          borderRadius:22,
          overflow:"hidden",
          background:"#fff",
        }}
      >
        {[
          ["قَبْلَ", String(activity.before ?? "")],
          [
            "مَا حَدَثَ",
            `${add ? "+" : "−"} ${activity.change ?? ""}`,
          ],
          [
            "الْآنَ",
            resolvedAnswer ?? "؟",
          ],
        ].map(
          ([label,value],index)=>(
            <div
              key={label}
              style={{
                minWidth:0,
                borderLeft:
                  index<2
                    ? `2px solid ${navy}`
                    : "none",
              }}
            >
              <div
                style={{
                  background:
                    index===1
                      ? (
                          add
                            ? "#EAF8F0"
                            : "#FFF0EF"
                        )
                      : "#EFF5FB",
                  padding:"8px 4px",
                  textAlign:"center",
                  color:navy,
                  fontWeight:950,
                  fontSize:14,
                  borderBottom:
                    `2px solid ${navy}`,
                }}
              >
                {label}
              </div>

              <div
                dir="ltr"
                style={{
                  minHeight:72,
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  padding:8,
                  color:
                    index===2
                    && resolvedAnswer
                      ? green
                      : navy,
                  fontWeight:950,
                  fontSize:28,
                }}
              >
                {value}
              </div>
            </div>
          )
        )}
      </div>

      <div
        dir="ltr"
        style={{
          color:navy,
          fontWeight:950,
          fontSize:28,
          textAlign:"center",
        }}
      >
        {
          resolvedAnswer
            ? activity.statement.replace(
                "؟",
                resolvedAnswer,
              )
            : activity.statement
        }
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
  activity:ProblemActivity;
  resolvedAnswer:string|null;
}) {
  if(activity.mode==="change") {
    return (
      <ChangeVisual
        activity={activity}
      />
    );
  }

  if(activity.mode==="operation") {
    return (
      <OperationVisual
        activity={activity}
      />
    );
  }

  if(activity.mode==="calculate") {
    return (
      <CalculationVisual
        activity={activity}
        resolvedAnswer={resolvedAnswer}
      />
    );
  }

  return (
    <ProblemTable
      activity={activity}
      resolvedAnswer={resolvedAnswer}
    />
  );
}


// ============================================================
// ACTIVITY
// ============================================================

function ProblemLab({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:ProblemActivity;
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
            const chosen =
              selected===index;

            const correct =
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
                  minHeight:98,
                  border:
                    `3px solid ${border}`,
                  borderRadius:23,
                  background,
                  boxShadow:
                    "0 7px 16px rgba(23,58,99,.08)",
                  color:navy,
                  fontFamily:"inherit",
                  fontSize:
                    activity.mode==="operation"
                    || activity.mode==="calculate"
                    || activity.mode==="table"
                      ? "clamp(24px,6vw,34px)"
                      : "clamp(18px,4.6vw,23px)",
                  fontWeight:950,
                  lineHeight:1.55,
                  padding:10,
                  cursor:
                    locked
                      ? "default"
                      : "pointer",
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
    <ProblemLab
      questionId={question.id}
      activity={question.problemActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}


export const Lesson109AdditionSubtractionSituations3Exercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson109"
    audioBase="/audio/teachers/taline/lesson_109_addition_subtraction_situations_3/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تَفْهَمُ الْمُشْكِلَةَ وَتَخْتَارُ الْجَمْعَ أَوِ الطَّرْحَ وَتُجِيبُ عَنِ السُّؤَالِ."
    nextPath="/lesson-v2/110"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson109AdditionSubtractionSituations3Exercises;
