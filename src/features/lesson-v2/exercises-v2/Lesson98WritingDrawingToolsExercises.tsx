import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type Option = {
  kind:"image"|"text";
  value:string;
  label:string;
};

type Activity = {
  title:string;
  visual:string;
  options:Option[];
  answer:number;
};

const ASSETS:Record<string,string> = {
  s1:"/lessons/v2/exercise-assets/lesson98/s1.webp",
  s2:"/lessons/v2/exercise-assets/lesson98/s2.webp",
  s3:"/lessons/v2/exercise-assets/lesson98/s3.webp",
  s4:"/lessons/v2/exercise-assets/lesson98/s4.webp",
  s5:"/lessons/v2/exercise-assets/lesson98/s5.webp",
  s6:"/lessons/v2/exercise-assets/lesson98/s6.webp",
  s7:"/lessons/v2/exercise-assets/lesson98/s7.webp",
  s8:"/lessons/v2/exercise-assets/lesson98/s8.webp",
  s9:"/lessons/v2/exercise-assets/lesson98/s9.webp",
};

const QUESTIONS:any[] = [
  {
    "id": "l98_ex1_q1",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى الْفُرْشَاةِ.",
    "audioKey": "l98_ex1_q1",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى الْفُرْشَاةِ",
      "visual": "s8",
      "options": [
        {
          "kind": "image",
          "value": "s1",
          "label": "فُرْشَاةٌ"
        },
        {
          "kind": "image",
          "value": "s2",
          "label": "طَبَاشِيرُ"
        },
        {
          "kind": "image",
          "value": "s3",
          "label": "مِدْوَرٌ"
        },
        {
          "kind": "image",
          "value": "s4",
          "label": "خَشَبٌ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l98_ex1_q2",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى الطَّبَاشِيرِ.",
    "audioKey": "l98_ex1_q2",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى الطَّبَاشِيرِ",
      "visual": "s8",
      "options": [
        {
          "kind": "image",
          "value": "s3",
          "label": "مِدْوَرٌ"
        },
        {
          "kind": "image",
          "value": "s2",
          "label": "طَبَاشِيرُ"
        },
        {
          "kind": "image",
          "value": "s1",
          "label": "فُرْشَاةٌ"
        },
        {
          "kind": "image",
          "value": "s5",
          "label": "بِلَاسْتِيكٌ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l98_ex1_q3",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى الْمِدْوَرِ.",
    "audioKey": "l98_ex1_q3",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى الْمِدْوَرِ",
      "visual": "s8",
      "options": [
        {
          "kind": "image",
          "value": "s2",
          "label": "طَبَاشِيرُ"
        },
        {
          "kind": "image",
          "value": "s4",
          "label": "خَشَبٌ"
        },
        {
          "kind": "image",
          "value": "s3",
          "label": "مِدْوَرٌ"
        },
        {
          "kind": "image",
          "value": "s1",
          "label": "فُرْشَاةٌ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l98_ex1_q4",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى الْخَشَبِ.",
    "audioKey": "l98_ex1_q4",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى الْمَوَادِّ",
      "visual": "s8",
      "options": [
        {
          "kind": "image",
          "value": "s5",
          "label": "بِلَاسْتِيكٌ"
        },
        {
          "kind": "image",
          "value": "s7",
          "label": "كِلْسٌ"
        },
        {
          "kind": "image",
          "value": "s4",
          "label": "خَشَبٌ"
        },
        {
          "kind": "image",
          "value": "s6",
          "label": "حَدِيدٌ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l98_ex2_q1",
    "mission": 2,
    "prompt": "بِمَاذَا نُلَوِّنُ بِالطِّلَاءِ؟",
    "audioKey": "l98_ex2_q1",
    "toolsActivity": {
      "title": "أَخْتَارُ الْأَدَاةَ الْمُنَاسِبَةَ",
      "visual": "s1",
      "options": [
        {
          "kind": "text",
          "value": "الْفُرْشَاةُ",
          "label": "الْفُرْشَاةُ"
        },
        {
          "kind": "text",
          "value": "الْمِدْوَرُ",
          "label": "الْمِدْوَرُ"
        },
        {
          "kind": "text",
          "value": "الْمِسْطَرَةُ",
          "label": "الْمِسْطَرَةُ"
        },
        {
          "kind": "text",
          "value": "الْمِقَصُّ",
          "label": "الْمِقَصُّ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l98_ex2_q2",
    "mission": 2,
    "prompt": "بِمَاذَا نَرْسُمُ دَائِرَةً؟",
    "audioKey": "l98_ex2_q2",
    "toolsActivity": {
      "title": "أَرْسُمُ دَائِرَةً",
      "visual": "s3",
      "options": [
        {
          "kind": "text",
          "value": "الطَّبَاشِيرُ",
          "label": "الطَّبَاشِيرُ"
        },
        {
          "kind": "text",
          "value": "الْمِدْوَرُ",
          "label": "الْمِدْوَرُ"
        },
        {
          "kind": "text",
          "value": "الْفُرْشَاةُ",
          "label": "الْفُرْشَاةُ"
        },
        {
          "kind": "text",
          "value": "الْمِقَصُّ",
          "label": "الْمِقَصُّ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l98_ex2_q3",
    "mission": 2,
    "prompt": "بِمَاذَا نَكْتُبُ فِي الدَّفْتَرِ؟",
    "audioKey": "l98_ex2_q3",
    "toolsActivity": {
      "title": "أَكْتُبُ فِي الدَّفْتَرِ",
      "visual": "s8",
      "options": [
        {
          "kind": "text",
          "value": "الْقَلَمُ",
          "label": "الْقَلَمُ"
        },
        {
          "kind": "text",
          "value": "الْمِقَصُّ",
          "label": "الْمِقَصُّ"
        },
        {
          "kind": "text",
          "value": "الْفُرْشَاةُ",
          "label": "الْفُرْشَاةُ"
        },
        {
          "kind": "text",
          "value": "الْمِدْوَرُ",
          "label": "الْمِدْوَرُ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l98_ex2_q4",
    "mission": 2,
    "prompt": "بِمَاذَا نَرْسُمُ خَطًّا مُسْتَقِيمًا؟",
    "audioKey": "l98_ex2_q4",
    "toolsActivity": {
      "title": "أَرْسُمُ خَطًّا مُسْتَقِيمًا",
      "visual": "s8",
      "options": [
        {
          "kind": "text",
          "value": "الْفُرْشَاةُ",
          "label": "الْفُرْشَاةُ"
        },
        {
          "kind": "text",
          "value": "الطَّبَاشِيرُ",
          "label": "الطَّبَاشِيرُ"
        },
        {
          "kind": "text",
          "value": "الْمِسْطَرَةُ",
          "label": "الْمِسْطَرَةُ"
        },
        {
          "kind": "text",
          "value": "الْمِقَصُّ",
          "label": "الْمِقَصُّ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l98_ex3_q1",
    "mission": 3,
    "prompt": "مَا السُّلُوكُ الْخَطِيرُ فِي الصُّورَةِ؟",
    "audioKey": "l98_ex3_q1",
    "toolsActivity": {
      "title": "أَسْتَعْمِلُ الْأَدَوَاتِ بِأَمَانٍ",
      "visual": "s9",
      "options": [
        {
          "kind": "text",
          "value": "وَضْعُ الْقَلَمِ فِي الْفَمِ",
          "label": "وَضْعُ الْقَلَمِ فِي الْفَمِ"
        },
        {
          "kind": "text",
          "value": "الْكِتَابَةُ فِي الدَّفْتَرِ",
          "label": "الْكِتَابَةُ فِي الدَّفْتَرِ"
        },
        {
          "kind": "text",
          "value": "تَرْتِيبُ الْأَدَوَاتِ",
          "label": "تَرْتِيبُ الْأَدَوَاتِ"
        },
        {
          "kind": "text",
          "value": "الرَّسْمُ عَلَى الْوَرَقِ",
          "label": "الرَّسْمُ عَلَى الْوَرَقِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l98_ex3_q2",
    "mission": 3,
    "prompt": "مَاذَا نَقُولُ لِلطِّفْلَةِ فِي الصُّورَةِ؟",
    "audioKey": "l98_ex3_q2",
    "toolsActivity": {
      "title": "أَتَصَرَّفُ بِأَمَانٍ",
      "visual": "s9",
      "options": [
        {
          "kind": "text",
          "value": "ضَعِي الْقَلَمَ فِي فَمِكِ",
          "label": "ضَعِي الْقَلَمَ فِي فَمِكِ"
        },
        {
          "kind": "text",
          "value": "أَخْرِجِي الْقَلَمَ مِنْ فَمِكِ",
          "label": "أَخْرِجِي الْقَلَمَ مِنْ فَمِكِ"
        },
        {
          "kind": "text",
          "value": "اكْسِرِي الْقَلَمَ",
          "label": "اكْسِرِي الْقَلَمَ"
        },
        {
          "kind": "text",
          "value": "ارْمِي الْقَلَمَ",
          "label": "ارْمِي الْقَلَمَ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l98_ex3_q3",
    "mission": 3,
    "prompt": "مَاذَا نَفْعَلُ بِالْأَدَوَاتِ بَعْدَ الْعَمَلِ؟",
    "audioKey": "l98_ex3_q3",
    "toolsActivity": {
      "title": "أُرَتِّبُ أَدَوَاتِي",
      "visual": "s8",
      "options": [
        {
          "kind": "text",
          "value": "نَرْمِيهَا",
          "label": "نَرْمِيهَا"
        },
        {
          "kind": "text",
          "value": "نَكْسِرُهَا",
          "label": "نَكْسِرُهَا"
        },
        {
          "kind": "text",
          "value": "نُرَتِّبُهَا",
          "label": "نُرَتِّبُهَا"
        },
        {
          "kind": "text",
          "value": "نَتْرُكُهَا عَلَى الْأَرْضِ",
          "label": "نَتْرُكُهَا عَلَى الْأَرْضِ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l98_ex3_q4",
    "mission": 3,
    "prompt": "كَيْفَ نَسْتَعْمِلُ أَدَوَاتِ الْكِتَابَةِ وَالرَّسْمِ؟",
    "audioKey": "l98_ex3_q4",
    "toolsActivity": {
      "title": "أَسْتَعْمِلُ أَدَوَاتِي بِحَذَرٍ",
      "visual": "s8",
      "options": [
        {
          "kind": "text",
          "value": "بِحَذَرٍ",
          "label": "بِحَذَرٍ"
        },
        {
          "kind": "text",
          "value": "بِاللَّعِبِ",
          "label": "بِاللَّعِبِ"
        },
        {
          "kind": "text",
          "value": "بِالرَّمْيِ",
          "label": "بِالرَّمْيِ"
        },
        {
          "kind": "text",
          "value": "بِالْعُنْفِ",
          "label": "بِالْعُنْفِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l98_ex4_q1",
    "mission": 4,
    "prompt": "مِنْ أَيِّ مَادَّةٍ صُنِعَ مِقْبَضُ الْفُرْشَاةِ؟",
    "audioKey": "l98_ex4_q1",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى مَادَّةِ الصُّنْعِ",
      "visual": "s1",
      "options": [
        {
          "kind": "image",
          "value": "s4",
          "label": "خَشَبٌ"
        },
        {
          "kind": "image",
          "value": "s6",
          "label": "حَدِيدٌ"
        },
        {
          "kind": "image",
          "value": "s5",
          "label": "بِلَاسْتِيكٌ"
        },
        {
          "kind": "image",
          "value": "s7",
          "label": "كِلْسٌ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l98_ex4_q2",
    "mission": 4,
    "prompt": "مَا مَادَّةُ صُنْعِ سَاقَيِ الْمِدْوَرِ؟",
    "audioKey": "l98_ex4_q2",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى مَادَّةِ الصُّنْعِ",
      "visual": "s3",
      "options": [
        {
          "kind": "image",
          "value": "s4",
          "label": "خَشَبٌ"
        },
        {
          "kind": "image",
          "value": "s6",
          "label": "حَدِيدٌ"
        },
        {
          "kind": "image",
          "value": "s5",
          "label": "بِلَاسْتِيكٌ"
        },
        {
          "kind": "image",
          "value": "s7",
          "label": "كِلْسٌ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l98_ex4_q3",
    "mission": 4,
    "prompt": "مِنْ أَيِّ مَادَّةٍ يُصْنَعُ الطَّبَاشِيرُ؟",
    "audioKey": "l98_ex4_q3",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى مَادَّةِ الصُّنْعِ",
      "visual": "s2",
      "options": [
        {
          "kind": "image",
          "value": "s4",
          "label": "خَشَبٌ"
        },
        {
          "kind": "image",
          "value": "s6",
          "label": "حَدِيدٌ"
        },
        {
          "kind": "image",
          "value": "s5",
          "label": "بِلَاسْتِيكٌ"
        },
        {
          "kind": "image",
          "value": "s7",
          "label": "كِلْسٌ"
        }
      ],
      "answer": 3
    }
  },
  {
    "id": "l98_ex4_q4",
    "mission": 4,
    "prompt": "مِنْ أَيِّ مَادَّةٍ صُنِعَ هَذَا الْكُرْسِيُّ؟",
    "audioKey": "l98_ex4_q4",
    "toolsActivity": {
      "title": "أَتَعَرَّفُ إِلَى الْبِلَاسْتِيكِ",
      "visual": "s5",
      "options": [
        {
          "kind": "image",
          "value": "s4",
          "label": "خَشَبٌ"
        },
        {
          "kind": "image",
          "value": "s6",
          "label": "حَدِيدٌ"
        },
        {
          "kind": "image",
          "value": "s5",
          "label": "بِلَاسْتِيكٌ"
        },
        {
          "kind": "image",
          "value": "s7",
          "label": "كِلْسٌ"
        }
      ],
      "answer": 2
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَتَعَرَّفُ إِلَى الْأَدَوَاتِ وَالْمَوَادِّ",
  2:"أَخْتَارُ الْأَدَاةَ الْمُنَاسِبَةَ",
  3:"أَسْتَعْمِلُ أَدَوَاتِي بِأَمَانٍ",
  4:"أَتَعَرَّفُ إِلَى مَادَّةِ الصُّنْعِ",
};

const navy="#173A63";
const gold="#E9AE22";
const green="#28A96B";
const red="#D9534F";

function Hero({
  asset,
}:{
  asset:string;
}) {
  const scene =
    asset==="s8" ||
    asset==="s9";

  return (
    <img
      src={ASSETS[asset]}
      alt=""
      draggable={false}
      style={{
        width:"100%",
        maxWidth:scene ? 560 : 240,
        maxHeight:scene ? 330 : 230,
        height:"auto",
        objectFit:"contain",
        display:"block",
        margin:"0 auto",
        borderRadius:22,
      }}
    />
  );
}

function OptionView({
  option,
}:{
  option:Option;
}) {
  if(option.kind==="image") {
    return (
      <>
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
      </>
    );
  }

  return (
    <span
      style={{
        fontSize:"clamp(17px,4.3vw,22px)",
        lineHeight:1.65,
      }}
    >
      {option.label}
    </span>
  );
}

function ToolsActivity({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:Activity;
  locked:boolean;
  showResult:boolean;
  onResult:(ok:boolean)=>void;
}) {
  const [selected,setSelected] =
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
            marginBottom:12,
          }}
        >
          {activity.title}
        </div>

        <Hero asset={activity.visual}/>
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(2,minmax(0,1fr))",
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
                  minHeight:178,
                  border:`3px solid ${border}`,
                  borderRadius:25,
                  background,
                  boxShadow:"0 8px 18px rgba(23,58,99,.08)",
                  color:navy,
                  fontFamily:"inherit",
                  fontWeight:950,
                  padding:11,
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"center",
                  gap:8,
                }}
              >
                <OptionView option={option}/>
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
    <ToolsActivity
      questionId={question.id}
      activity={question.toolsActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

export const Lesson98WritingDrawingToolsExercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson98"
    audioBase="/audio/teachers/khalil/lesson_98_writing_drawing_tools/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تَتَعَرَّفُ إِلَى أَدَوَاتِ الْكِتَابَةِ وَالرَّسْمِ وَتَسْتَعْمِلُهَا بِحَذَرٍ."
    nextPath="/lesson-v2/99"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson98WritingDrawingToolsExercises;
