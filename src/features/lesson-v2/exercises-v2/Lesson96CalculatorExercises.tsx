import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type CalculatorOption = {
  kind:"image"|"key"|"screen"|"text";
  value:string;
  label:string;
};

type CalculatorActivity = {
  title:string;
  visual:{
    kind:"image"|"key"|"screen"|"sequence";
    value:any;
  };
  options:CalculatorOption[];
  answer:number;
  forbiddenKeys?:string[];
  correctScreenValue?:string;
};

const ASSETS:Record<string,string> = {
  s1:"/lessons/v2/lesson96-calculator/s1.png",
  s2:"/lessons/v2/lesson96-calculator/s2.png",
  s3:"/lessons/v2/lesson96-calculator/s3.png",
  s4:"/lessons/v2/lesson96-calculator/s4.png",
  s5:"/lessons/v2/lesson96-calculator/s5.png",
  s6:"/lessons/v2/lesson96-calculator/s6.png",
  s7:"/lessons/v2/lesson96-calculator/s7.png",
};

const QUESTIONS:any[] = [
  {
    "id": "l96_ex1_q1",
    "mission": 1,
    "prompt": "أَيْنَ تَظْهَرُ الْأَرْقَامُ فِي الْحَاسِبَةِ؟",
    "audioKey": "l96_ex1_q1",
    "calculatorActivity": {
      "title": "أَتَعَرَّفُ إِلَى أَجْزَاءِ الْحَاسِبَةِ",
      "visual": {
        "kind": "image",
        "value": "s1"
      },
      "options": [
        {
          "kind": "image",
          "value": "s2",
          "label": "الشَّاشَةُ"
        },
        {
          "kind": "image",
          "value": "s3",
          "label": "لَوْحَةُ الْأَرْقَامِ"
        },
        {
          "kind": "image",
          "value": "s5",
          "label": "زِرُّ التَّشْغِيلِ"
        },
        {
          "kind": "image",
          "value": "s4",
          "label": "مَفَاتِيحُ الْعَمَلِيَّاتِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex1_q2",
    "mission": 1,
    "prompt": "أَيْنَ أَجِدُ الْأَرْقَامَ مِنْ صِفْرٍ إِلَى تِسْعَةٍ؟",
    "audioKey": "l96_ex1_q2",
    "calculatorActivity": {
      "title": "أَبْحَثُ عَنْ لَوْحَةِ الْأَرْقَامِ",
      "visual": {
        "kind": "image",
        "value": "s1"
      },
      "options": [
        {
          "kind": "image",
          "value": "s4",
          "label": "الْعَمَلِيَّاتُ"
        },
        {
          "kind": "image",
          "value": "s3",
          "label": "الْأَرْقَامُ"
        },
        {
          "kind": "image",
          "value": "s7",
          "label": "CE"
        },
        {
          "kind": "image",
          "value": "s2",
          "label": "الشَّاشَةُ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l96_ex1_q3",
    "mission": 1,
    "prompt": "أَيُّ مِفْتَاحٍ يَبْدَأُ تَشْغِيلَ الْحَاسِبَةِ؟",
    "audioKey": "l96_ex1_q3",
    "calculatorActivity": {
      "title": "أَبْدَأُ تَشْغِيلَ الْحَاسِبَةِ",
      "visual": {
        "kind": "image",
        "value": "s1"
      },
      "options": [
        {
          "kind": "image",
          "value": "s5",
          "label": "ON/C"
        },
        {
          "kind": "image",
          "value": "s6",
          "label": "OFF"
        },
        {
          "kind": "image",
          "value": "s7",
          "label": "CE"
        },
        {
          "kind": "key",
          "value": "=",
          "label": "="
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex1_q4",
    "mission": 1,
    "prompt": "أَيْنَ أَجِدُ رُمُوزَ الْعَمَلِيَّاتِ الْأَرْبَعِ؟",
    "audioKey": "l96_ex1_q4",
    "calculatorActivity": {
      "title": "الْجَمْعُ وَالطَّرْحُ وَالضَّرْبُ وَالْقِسْمَةُ",
      "visual": {
        "kind": "image",
        "value": "s1"
      },
      "options": [
        {
          "kind": "image",
          "value": "s3",
          "label": "الْأَرْقَامُ"
        },
        {
          "kind": "image",
          "value": "s2",
          "label": "الشَّاشَةُ"
        },
        {
          "kind": "image",
          "value": "s4",
          "label": "الْعَمَلِيَّاتُ"
        },
        {
          "kind": "image",
          "value": "s5",
          "label": "ON/C"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l96_ex2_q1",
    "mission": 2,
    "prompt": "بَعْدَ الضَّغْطِ عَلَى ON/C، مَاذَا يَظْهَرُ عَلَى الشَّاشَةِ؟",
    "audioKey": "l96_ex2_q1",
    "calculatorActivity": {
      "title": "أُشَغِّلُ الْحَاسِبَةَ",
      "visual": {
        "kind": "key",
        "value": "ON/C"
      },
      "options": [
        {
          "kind": "screen",
          "value": "0",
          "label": "0"
        },
        {
          "kind": "screen",
          "value": "6",
          "label": "6"
        },
        {
          "kind": "screen",
          "value": "65",
          "label": "65"
        },
        {
          "kind": "screen",
          "value": "",
          "label": ""
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex2_q2",
    "mission": 2,
    "prompt": "بَعْدَ تَشْغِيلِ الْحَاسِبَةِ، أَضْغَطُ عَلَى 6. مَاذَا يَظْهَرُ؟",
    "audioKey": "l96_ex2_q2",
    "calculatorActivity": {
      "title": "أَضْغَطُ عَلَى الرَّقْمِ 6",
      "visual": {
        "kind": "key",
        "value": "6"
      },
      "options": [
        {
          "kind": "screen",
          "value": "5",
          "label": "5"
        },
        {
          "kind": "screen",
          "value": "6",
          "label": "6"
        },
        {
          "kind": "screen",
          "value": "65",
          "label": "65"
        },
        {
          "kind": "screen",
          "value": "0",
          "label": "0"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l96_ex2_q3",
    "mission": 2,
    "prompt": "ظَهَرَ الرَّقْمُ 6، ثُمَّ ضَغَطْتُ عَلَى 5. مَاذَا تَعْرِضُ الشَّاشَةُ؟",
    "audioKey": "l96_ex2_q3",
    "calculatorActivity": {
      "title": "أُكَوِّنُ الْعَدَدَ 65",
      "visual": {
        "kind": "sequence",
        "value": [
          "6",
          "5"
        ]
      },
      "options": [
        {
          "kind": "screen",
          "value": "65",
          "label": "65"
        },
        {
          "kind": "screen",
          "value": "56",
          "label": "56"
        },
        {
          "kind": "screen",
          "value": "6",
          "label": "6"
        },
        {
          "kind": "screen",
          "value": "5",
          "label": "5"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex2_q4",
    "mission": 2,
    "prompt": "تَعْرِضُ الشَّاشَةُ 65. أَضْغَطُ عَلَى CE. مَاذَا يَظْهَرُ؟",
    "audioKey": "l96_ex2_q4",
    "calculatorActivity": {
      "title": "أَمْسَحُ مَا عَلَى الشَّاشَةِ",
      "visual": {
        "kind": "sequence",
        "value": [
          "65",
          "CE"
        ]
      },
      "options": [
        {
          "kind": "screen",
          "value": "0",
          "label": "0"
        },
        {
          "kind": "screen",
          "value": "65",
          "label": "65"
        },
        {
          "kind": "screen",
          "value": "5",
          "label": "5"
        },
        {
          "kind": "screen",
          "value": "6",
          "label": "6"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex3_q1",
    "mission": 3,
    "prompt": "مَا وَظِيفَةُ مِفْتَاحِ ON/C؟",
    "audioKey": "l96_ex3_q1",
    "calculatorActivity": {
      "title": "ON/C",
      "visual": {
        "kind": "image",
        "value": "s5"
      },
      "options": [
        {
          "kind": "text",
          "value": "بَدْءُ التَّشْغِيلِ",
          "label": "بَدْءُ التَّشْغِيلِ"
        },
        {
          "kind": "text",
          "value": "إِيقَافُ التَّشْغِيلِ",
          "label": "إِيقَافُ التَّشْغِيلِ"
        },
        {
          "kind": "text",
          "value": "مَسْحُ الشَّاشَةِ",
          "label": "مَسْحُ الشَّاشَةِ"
        },
        {
          "kind": "text",
          "value": "إِظْهَارُ النَّتِيجَةِ",
          "label": "إِظْهَارُ النَّتِيجَةِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex3_q2",
    "mission": 3,
    "prompt": "مَا وَظِيفَةُ مِفْتَاحِ OFF؟",
    "audioKey": "l96_ex3_q2",
    "calculatorActivity": {
      "title": "OFF",
      "visual": {
        "kind": "image",
        "value": "s6"
      },
      "options": [
        {
          "kind": "text",
          "value": "إِظْهَارُ النَّتِيجَةِ",
          "label": "إِظْهَارُ النَّتِيجَةِ"
        },
        {
          "kind": "text",
          "value": "بَدْءُ التَّشْغِيلِ",
          "label": "بَدْءُ التَّشْغِيلِ"
        },
        {
          "kind": "text",
          "value": "إِيقَافُ التَّشْغِيلِ",
          "label": "إِيقَافُ التَّشْغِيلِ"
        },
        {
          "kind": "text",
          "value": "كِتَابَةُ الْأَرْقَامِ",
          "label": "كِتَابَةُ الْأَرْقَامِ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l96_ex3_q3",
    "mission": 3,
    "prompt": "مَا وَظِيفَةُ مِفْتَاحِ CE؟",
    "audioKey": "l96_ex3_q3",
    "calculatorActivity": {
      "title": "CE",
      "visual": {
        "kind": "image",
        "value": "s7"
      },
      "options": [
        {
          "kind": "text",
          "value": "مَسْحُ مَا عَلَى الشَّاشَةِ",
          "label": "مَسْحُ مَا عَلَى الشَّاشَةِ"
        },
        {
          "kind": "text",
          "value": "إِيقَافُ الْحَاسِبَةِ",
          "label": "إِيقَافُ الْحَاسِبَةِ"
        },
        {
          "kind": "text",
          "value": "الضَّرْبُ",
          "label": "الضَّرْبُ"
        },
        {
          "kind": "text",
          "value": "إِظْهَارُ النَّتِيجَةِ",
          "label": "إِظْهَارُ النَّتِيجَةِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex3_q4",
    "mission": 3,
    "prompt": "مَا وَظِيفَةُ مِفْتَاحِ الْمُسَاوَاةِ؟",
    "audioKey": "l96_ex3_q4",
    "calculatorActivity": {
      "title": "=",
      "visual": {
        "kind": "key",
        "value": "="
      },
      "options": [
        {
          "kind": "text",
          "value": "مَسْحُ الشَّاشَةِ",
          "label": "مَسْحُ الشَّاشَةِ"
        },
        {
          "kind": "text",
          "value": "نِهَايَةُ الْحِسَابِ وَإِظْهَارُ النَّتِيجَةِ",
          "label": "نِهَايَةُ الْحِسَابِ وَإِظْهَارُ النَّتِيجَةِ"
        },
        {
          "kind": "text",
          "value": "إِيقَافُ التَّشْغِيلِ",
          "label": "إِيقَافُ التَّشْغِيلِ"
        },
        {
          "kind": "text",
          "value": "كِتَابَةُ الرَّقْمِ صِفْرٍ",
          "label": "كِتَابَةُ الرَّقْمِ صِفْرٍ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l96_ex4_q1",
    "mission": 4,
    "prompt": "مَا أَوَّلُ مِفْتَاحٍ أَضْغَطُ عَلَيْهِ لِاسْتِعْمَالِ الْحَاسِبَةِ؟",
    "audioKey": "l96_ex4_q1",
    "calculatorActivity": {
      "title": "أَبْدَأُ بِالتَّشْغِيلِ",
      "visual": {
        "kind": "image",
        "value": "s1"
      },
      "options": [
        {
          "kind": "key",
          "value": "ON/C",
          "label": "ON/C"
        },
        {
          "kind": "key",
          "value": "OFF",
          "label": "OFF"
        },
        {
          "kind": "key",
          "value": "CE",
          "label": "CE"
        },
        {
          "kind": "key",
          "value": "=",
          "label": "="
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex4_q2",
    "mission": 4,
    "prompt": "أُرِيدُ كِتَابَةَ الْعَدَدِ 25. أَيَّ رَقْمٍ أَضْغَطُ أَوَّلًا؟",
    "audioKey": "l96_ex4_q2",
    "calculatorActivity": {
      "title": "أَكْتُبُ الْعَدَدَ 25",
      "visual": {
        "kind": "screen",
        "value": "25"
      },
      "options": [
        {
          "kind": "key",
          "value": "5",
          "label": "5"
        },
        {
          "kind": "key",
          "value": "2",
          "label": "2"
        },
        {
          "kind": "key",
          "value": "0",
          "label": "0"
        },
        {
          "kind": "key",
          "value": "CE",
          "label": "CE"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l96_ex4_q3",
    "mission": 4,
    "prompt": "ضَغَطْتُ عَلَى 2. أَيَّ رَقْمٍ أَضْغَطُ بَعْدَهُ لِيَظْهَرَ 25؟",
    "audioKey": "l96_ex4_q3",
    "calculatorActivity": {
      "title": "أُكْمِلُ الْعَدَدَ 25",
      "visual": {
        "kind": "screen",
        "value": "2"
      },
      "options": [
        {
          "kind": "key",
          "value": "5",
          "label": "5"
        },
        {
          "kind": "key",
          "value": "2",
          "label": "2"
        },
        {
          "kind": "key",
          "value": "0",
          "label": "0"
        },
        {
          "kind": "key",
          "value": "=",
          "label": "="
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l96_ex4_q4",
    "mission": 4,
    "prompt": "أُرِيدُ مَسْحَ مَا عَلَى الشَّاشَةِ. أَيُّ مِفْتَاحٍ أَضْغَطُ؟",
    "audioKey": "l96_ex4_q4",
    "calculatorActivity": {
      "title": "أَمْسَحُ الشَّاشَةَ",
      "visual": {
        "kind": "screen",
        "value": "65"
      },
      "options": [
        {
          "kind": "key",
          "value": "OFF",
          "label": "OFF"
        },
        {
          "kind": "key",
          "value": "=",
          "label": "="
        },
        {
          "kind": "key",
          "value": "ON/C",
          "label": "ON/C"
        },
        {
          "kind": "key",
          "value": "CE",
          "label": "CE"
        }
      ],
      "answer": 3
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَتَعَرَّفُ إِلَى أَجْزَاءِ الْحَاسِبَةِ",
  2:"أَضْغَطُ وَأُلاحِظُ الشَّاشَةَ",
  3:"أَعْرِفُ وَظِيفَةَ الْمِفْتَاحِ",
  4:"أَسْتَعْمِلُ الْحَاسِبَةَ بِالتَّرْتِيبِ",
};

const navy="#173A63";
const gold="#E9AE22";
const cream="#FFF9EC";
const green="#28A96B";
const red="#D9534F";

function CalculatorKey({
  value,
  small=false,
}:{
  value:string;
  small?:boolean;
}) {
  const special=value==="ON/C";
  const equal=value==="=";

  return (
    <div
      style={{
        minWidth:small?72:108,
        height:small?64:88,
        borderRadius:18,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:"0 14px",
        background:special
          ? "linear-gradient(180deg,#7d6bc0,#514095)"
          : equal
          ? "linear-gradient(180deg,#ff6a20,#df460d)"
          : "linear-gradient(180deg,#555,#252525)",
        color:"#fff",
        border:"4px solid #191919",
        boxShadow:"0 8px 14px rgba(0,0,0,.20)",
        fontWeight:950,
        fontSize:small?24:30,
        direction:"ltr",
      }}
    >
      {value}
    </div>
  );
}

function LCD({
  value,
}:{
  value:string;
}) {
  return (
    <div
      style={{
        minWidth:210,
        maxWidth:"100%",
        height:95,
        borderRadius:18,
        border:"8px solid #202020",
        background:"#d8e3c7",
        boxShadow:"inset 0 4px 12px rgba(0,0,0,.20)",
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-end",
        padding:"0 20px",
        fontFamily:"monospace",
        fontSize:44,
        fontWeight:900,
        color:"#111",
        direction:"ltr",
      }}
    >
      {value || " "}
    </div>
  );
}

function Visual({
  visual,
}:{
  visual:CalculatorActivity["visual"];
}) {
  if(visual.kind==="image") {
    return (
      <img
        src={ASSETS[String(visual.value)]}
        alt=""
        draggable={false}
        style={{
          width:"100%",
          maxWidth:300,
          maxHeight:290,
          objectFit:"contain",
          display:"block",
          margin:"0 auto",
        }}
      />
    );
  }

  if(visual.kind==="key") {
    return (
      <div style={{display:"flex",justifyContent:"center"}}>
        <CalculatorKey value={String(visual.value)}/>
      </div>
    );
  }

  if(visual.kind==="screen") {
    return (
      <div style={{display:"flex",justifyContent:"center"}}>
        <LCD value={String(visual.value)}/>
      </div>
    );
  }

  if(visual.kind==="sequence") {
    const values=Array.isArray(visual.value)
      ? visual.value
      : [];

    return (
      <div
        style={{
          display:"flex",
          flexWrap:"wrap",
          alignItems:"center",
          justifyContent:"center",
          gap:12,
        }}
      >
        {values.map((v:any,i:number)=>(
          <div
            key={i}
            style={{
              display:"flex",
              alignItems:"center",
              gap:10,
            }}
          >
            {String(v).match(/^\d+$/) && String(v).length>1
              ? <LCD value={String(v)}/>
              : <CalculatorKey value={String(v)} small/>
            }

            {i<values.length-1 && (
              <span
                style={{
                  fontSize:34,
                  fontWeight:950,
                  color:gold,
                }}
              >
                ←
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function OptionVisual({
  option,
}:{
  option:CalculatorOption;
}) {
  if(option.kind==="image") {
    return (
      <img
        src={ASSETS[option.value]}
        alt=""
        draggable={false}
        style={{
          width:118,
          height:118,
          objectFit:"contain",
          display:"block",
          margin:"0 auto",
        }}
      />
    );
  }

  if(option.kind==="key") {
    return (
      <div style={{display:"flex",justifyContent:"center"}}>
        <CalculatorKey value={option.value} small/>
      </div>
    );
  }

  if(option.kind==="screen") {
    return (
      <div
        style={{
          transform:"scale(.80)",
          transformOrigin:"center",
          display:"flex",
          justifyContent:"center",
        }}
      >
        <LCD value={option.value}/>
      </div>
    );
  }

  return null;
}

export function CalculatorLab({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:CalculatorActivity;
  locked:boolean;
  showResult:boolean;
  onResult:(correct:boolean)=>void;
}) {
  const [selected,setSelected]=useState<number|null>(null);

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

  return (
    <div
      style={{
        width:"100%",
        display:"grid",
        gap:18,
      }}
    >
      <div
        style={{
          border:`3px solid ${gold}`,
          borderRadius:28,
          background:"#fff",
          padding:16,
          boxShadow:"0 10px 24px rgba(23,58,99,.09)",
        }}
      >
        <div
          style={{
            textAlign:"center",
            fontSize:"clamp(18px,4.7vw,24px)",
            fontWeight:950,
            color:navy,
            marginBottom:15,
          }}
        >
          {activity.title}
        </div>

        {activity.forbiddenKeys?.length ? (
          <div
            style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexWrap:"wrap",
              gap:9,
              marginBottom:14,
            }}
          >
            <span
              style={{
                color:"#B43A35",
                fontWeight:950,
                fontSize:16,
              }}
            >
              لَا أَسْتَعْمِلُ:
            </span>

            {activity.forbiddenKeys.map((key)=>(
              <div
                key={key}
                style={{
                  position:"relative",
                  display:"inline-flex",
                }}
              >
                <CalculatorKey
                  value={key}
                  small
                />

                <span
                  aria-hidden="true"
                  style={{
                    position:"absolute",
                    inset:"50% auto auto 50%",
                    width:52,
                    height:4,
                    borderRadius:99,
                    background:"#D9534F",
                    transform:
                      "translate(-50%,-50%) rotate(-42deg)",
                    pointerEvents:"none",
                  }}
                />
              </div>
            ))}
          </div>
        ) : null}

        <Visual visual={activity.visual}/>

        {
          selected===activity.answer
          && activity.correctScreenValue
          ? (
            <div
              style={{
                marginTop:14,
                display:"grid",
                justifyItems:"center",
                gap:7,
              }}
            >
              <div
                style={{
                  color:green,
                  fontWeight:950,
                  fontSize:17,
                }}
              >
                النَّتِيجَةُ الصَّحِيحَةُ
              </div>

              <LCD
                value={activity.correctScreenValue}
              />
            </div>
          )
          : null
        }
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(2,minmax(0,1fr))",
          gap:14,
        }}
      >
        {activity.options.map((option,index)=>{
          const chosen=selected===index;
          const correct=index===activity.answer;

          let border=gold;
          let background="#fff";

          if(showResult && chosen) {
            border=correct?green:red;
            background=correct
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
                minHeight:170,
                border:`3px solid ${border}`,
                borderRadius:26,
                background,
                boxShadow:"0 8px 18px rgba(23,58,99,.08)",
                color:navy,
                fontFamily:"inherit",
                fontWeight:950,
                fontSize:"clamp(16px,4.2vw,21px)",
                padding:12,
                cursor:locked?"default":"pointer",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                gap:9,
              }}
            >
              <OptionVisual option={option}/>

              <span>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function renderActivity(ctx:any) {
  const {
    question,
    locked,
    showResult,
    submitResult,
  }=ctx;

  return (
    <CalculatorLab
      questionId={question.id}
      activity={question.calculatorActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

export const Lesson96CalculatorExercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson96"
    audioBase="/audio/teachers/khalil/lesson_96_calculator_1/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تَتَعَرَّفُ إِلَى مَفَاتِيحِ الْحَاسِبَةِ وَتَسْتَعْمِلُهَا بِالتَّرْتِيبِ."
    nextPath="/lesson-v2/97"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);
