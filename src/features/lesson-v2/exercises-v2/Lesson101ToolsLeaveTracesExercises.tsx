import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type Option = {
  kind:"image"|"text";
  value:string;
};

type TraceActivity = {
  title:string;
  visual:string;
  options:Option[];
  answer:number;
};

const ASSETS:Record<string,string> = {
  s1:"/lessons/v2/exercise-assets/lesson101/s1.webp",
  s2:"/lessons/v2/exercise-assets/lesson101/s2.webp",
  s3:"/lessons/v2/exercise-assets/lesson101/s3.webp",
  s4:"/lessons/v2/exercise-assets/lesson101/s4.webp",
  s5:"/lessons/v2/exercise-assets/lesson101/s5.webp",
  s6:"/lessons/v2/exercise-assets/lesson101/s6.webp",
  s7:"/lessons/v2/exercise-assets/lesson101/s7.webp",
  s8:"/lessons/v2/exercise-assets/lesson101/s8.webp",
  s9:"/lessons/v2/exercise-assets/lesson101/s9.webp",
  chalk:"/lessons/v2/exercise-assets/lesson101/chalk.webp",
};

const QUESTIONS:any[] = [
  {
    "id": "l101_ex1_q1",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى قَلَمِ الرَّصَاصِ.",
    "audioKey": "l101_ex1_q1",
    "traceActivity": {
      "title": "أَتَعَرَّفُ إِلَى أَدَوَاتِ الْكِتَابَةِ",
      "visual": "s6",
      "options": [
        {
          "kind": "image",
          "value": "s1"
        },
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s3"
        },
        {
          "kind": "image",
          "value": "s4"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l101_ex1_q2",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى قَلَمِ الْحِبْرِ.",
    "audioKey": "l101_ex1_q2",
    "traceActivity": {
      "title": "أَتَعَرَّفُ إِلَى أَدَوَاتِ الْكِتَابَةِ",
      "visual": "s7",
      "options": [
        {
          "kind": "image",
          "value": "s4"
        },
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s1"
        },
        {
          "kind": "image",
          "value": "s3"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l101_ex1_q3",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى الْأَلْوَانِ الْمَائِيَّةِ.",
    "audioKey": "l101_ex1_q3",
    "traceActivity": {
      "title": "أَتَعَرَّفُ إِلَى أَدَوَاتِ الرَّسْمِ",
      "visual": "s8",
      "options": [
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s4"
        },
        {
          "kind": "image",
          "value": "s3"
        },
        {
          "kind": "image",
          "value": "s1"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l101_ex1_q4",
    "mission": 1,
    "prompt": "أَشِرْ إِلَى الْمِمْحَاةْ.",
    "audioKey": "l101_ex1_q4",
    "traceActivity": {
      "title": "أَتَعَرَّفُ إِلَى الْمِمْحَاةْ",
      "visual": "s6",
      "options": [
        {
          "kind": "image",
          "value": "s3"
        },
        {
          "kind": "image",
          "value": "s1"
        },
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s4"
        }
      ],
      "answer": 3
    }
  },
  {
    "id": "l101_ex2_q1",
    "mission": 2,
    "prompt": "أَيُّ أَدَاةٍ تَرَكَتْ هَذَا الْأَثَرَ؟",
    "audioKey": "l101_ex2_q1",
    "traceActivity": {
      "title": "أَثَرُ قَلَمِ الرَّصَاصِ",
      "visual": "s6",
      "options": [
        {
          "kind": "image",
          "value": "s1"
        },
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s3"
        },
        {
          "kind": "image",
          "value": "chalk"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l101_ex2_q2",
    "mission": 2,
    "prompt": "أَيُّ أَدَاةٍ تَرَكَتْ هَذَا الْأَثَرَ؟",
    "audioKey": "l101_ex2_q2",
    "traceActivity": {
      "title": "أَثَرُ قَلَمِ الْحِبْرِ",
      "visual": "s7",
      "options": [
        {
          "kind": "image",
          "value": "chalk"
        },
        {
          "kind": "image",
          "value": "s3"
        },
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s1"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l101_ex2_q3",
    "mission": 2,
    "prompt": "بِأَيِّ أَدَاةٍ أُنْجِزَ هَذَا الرَّسْمُ؟",
    "audioKey": "l101_ex2_q3",
    "traceActivity": {
      "title": "أَثَرُ الْأَلْوَانِ الْمَائِيَّةِ",
      "visual": "s8",
      "options": [
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s3"
        },
        {
          "kind": "image",
          "value": "chalk"
        },
        {
          "kind": "image",
          "value": "s1"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l101_ex2_q4",
    "mission": 2,
    "prompt": "أَيُّ أَدَاةٍ تَرَكَتْ هَذَا الْأَثَرَ عَلَى السَّبُّورَةِ؟",
    "audioKey": "l101_ex2_q4",
    "traceActivity": {
      "title": "أَثَرُ الطَّبَاشِيرِ",
      "visual": "s5",
      "options": [
        {
          "kind": "image",
          "value": "s1"
        },
        {
          "kind": "image",
          "value": "chalk"
        },
        {
          "kind": "image",
          "value": "s3"
        },
        {
          "kind": "image",
          "value": "s2"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l101_ex3_q1",
    "mission": 3,
    "prompt": "هَلْ يَسْهُلُ إِزَالَةُ أَثَرِ قَلَمِ الرَّصَاصِ؟",
    "audioKey": "l101_ex3_q1",
    "traceActivity": {
      "title": "أَفْهَمُ الْأَثَرَ",
      "visual": "s6",
      "options": [
        {
          "kind": "text",
          "value": "يَسْهُلُ إِزَالَتُهُ"
        },
        {
          "kind": "text",
          "value": "يَصْعُبُ إِزَالَتُهُ"
        },
        {
          "kind": "text",
          "value": "لَا يَتْرُكُ أَثَرًا"
        },
        {
          "kind": "text",
          "value": "يَخْتَفِي وَحْدَهُ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l101_ex3_q2",
    "mission": 3,
    "prompt": "هَلْ يَسْهُلُ إِزَالَةُ أَثَرِ الطَّبَاشِيرِ؟",
    "audioKey": "l101_ex3_q2",
    "traceActivity": {
      "title": "أَفْهَمُ الْأَثَرَ",
      "visual": "s5",
      "options": [
        {
          "kind": "text",
          "value": "يَصْعُبُ إِزَالَتُهُ"
        },
        {
          "kind": "text",
          "value": "لَا يَتْرُكُ أَثَرًا"
        },
        {
          "kind": "text",
          "value": "يَسْهُلُ إِزَالَتُهُ"
        },
        {
          "kind": "text",
          "value": "يَخْتَفِي وَحْدَهُ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l101_ex3_q3",
    "mission": 3,
    "prompt": "هَلْ يَسْهُلُ إِزَالَةُ أَثَرِ قَلَمِ الْحِبْرِ؟",
    "audioKey": "l101_ex3_q3",
    "traceActivity": {
      "title": "أَفْهَمُ الْأَثَرَ",
      "visual": "s7",
      "options": [
        {
          "kind": "text",
          "value": "يَسْهُلُ إِزَالَتُهُ"
        },
        {
          "kind": "text",
          "value": "لَا يَتْرُكُ أَثَرًا"
        },
        {
          "kind": "text",
          "value": "يَخْتَفِي وَحْدَهُ"
        },
        {
          "kind": "text",
          "value": "يَصْعُبُ إِزَالَتُهُ"
        }
      ],
      "answer": 3
    }
  },
  {
    "id": "l101_ex3_q4",
    "mission": 3,
    "prompt": "هَلْ يَسْهُلُ إِزَالَةُ أَثَرِ الْأَلْوَانِ الْمَائِيَّةِ؟",
    "audioKey": "l101_ex3_q4",
    "traceActivity": {
      "title": "أَفْهَمُ الْأَثَرَ",
      "visual": "s8",
      "options": [
        {
          "kind": "text",
          "value": "لَا يَتْرُكُ أَثَرًا"
        },
        {
          "kind": "text",
          "value": "يَصْعُبُ إِزَالَتُهُ"
        },
        {
          "kind": "text",
          "value": "يَسْهُلُ إِزَالَتُهُ"
        },
        {
          "kind": "text",
          "value": "يَخْتَفِي وَحْدَهُ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l101_ex4_q1",
    "mission": 4,
    "prompt": "بِمَاذَا نَمْسَحُ أَثَرَ قَلَمِ الرَّصَاصِ؟",
    "audioKey": "l101_ex4_q1",
    "traceActivity": {
      "title": "أَزِيلُ أَثَرَ قَلَمِ الرَّصَاصِ",
      "visual": "s6",
      "options": [
        {
          "kind": "image",
          "value": "s1"
        },
        {
          "kind": "image",
          "value": "s4"
        },
        {
          "kind": "image",
          "value": "s2"
        },
        {
          "kind": "image",
          "value": "s3"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l101_ex4_q2",
    "mission": 4,
    "prompt": "مَا السُّلُوكُ الْخَاطِئُ فِي الصُّورَةِ؟",
    "audioKey": "l101_ex4_q2",
    "traceActivity": {
      "title": "أَحْفَظُ مَلَابِسِي نَظِيفَةً",
      "visual": "s9",
      "options": [
        {
          "kind": "text",
          "value": "مَسْحُ الْفُرْشَاةِ فِي الْمِئْزَرِ"
        },
        {
          "kind": "text",
          "value": "غَسْلُ الْفُرْشَاةِ بِالْمَاءِ"
        },
        {
          "kind": "text",
          "value": "تَرْتِيبُ أَدَوَاتِ الرَّسْمِ"
        },
        {
          "kind": "text",
          "value": "تَنْظِيفُ مَكَانِ الْعَمَلِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l101_ex4_q3",
    "mission": 4,
    "prompt": "مَاذَا نَفْعَلُ بِالْفُرْشَاةِ بَعْدَ الرَّسْمِ؟",
    "audioKey": "l101_ex4_q3",
    "traceActivity": {
      "title": "أَعْتَنِي بِأَدَوَاتِي",
      "visual": "s9",
      "options": [
        {
          "kind": "text",
          "value": "نَغْسِلُهَا بِالْمَاءِ"
        },
        {
          "kind": "text",
          "value": "نَمْسَحُهَا فِي الْمِئْزَرِ"
        },
        {
          "kind": "text",
          "value": "نَرْمِيهَا"
        },
        {
          "kind": "text",
          "value": "نَكْسِرُهَا"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l101_ex4_q4",
    "mission": 4,
    "prompt": "كَيْفَ نُزِيلُ أَثَرَ الطَّبَاشِيرِ مِنَ السَّبُّورَةِ؟",
    "audioKey": "l101_ex4_q4",
    "traceActivity": {
      "title": "أَمْسَحُ السَّبُّورَةَ",
      "visual": "s5",
      "options": [
        {
          "kind": "text",
          "value": "نَمْسَحُ السَّبُّورَةَ"
        },
        {
          "kind": "text",
          "value": "نُمَزِّقُ السَّبُّورَةَ"
        },
        {
          "kind": "text",
          "value": "نَغْسِلُ الدَّفْتَرَ"
        },
        {
          "kind": "text",
          "value": "نَكْسِرُ الطَّبَاشِيرَ"
        }
      ],
      "answer": 0
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَتَعَرَّفُ إِلَى الْأَدَوَاتِ",
  2:"أَرْبِطُ الْأَدَاةَ بِالْأَثَرِ",
  3:"أُمَيِّزُ الْأَثَرَ السَّهْلَ وَالصَّعْبَ",
  4:"أَسْتَعْمِلُ أَدَوَاتِي بِطَرِيقَةٍ صَحِيحَةٍ",
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
  const scene = asset==="s9";

  return (
    <img
      src={ASSETS[asset]}
      alt=""
      draggable={false}
      style={{
        width:"100%",
        maxWidth:scene ? 570 : 270,
        maxHeight:scene ? 330 : 245,
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

  return (
    <span
      style={{
        fontSize:"clamp(17px,4.3vw,22px)",
        lineHeight:1.65,
        textAlign:"center",
      }}
    >
      {option.value}
    </span>
  );
}

function TraceLab({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:TraceActivity;
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
                  minHeight:174,
                  border:`3px solid ${border}`,
                  borderRadius:25,
                  background,
                  boxShadow:"0 8px 18px rgba(23,58,99,.08)",
                  color:navy,
                  fontFamily:"inherit",
                  fontWeight:950,
                  padding:11,
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  cursor:locked ? "default" : "pointer",
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
    <TraceLab
      questionId={question.id}
      activity={question.traceActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

export const Lesson101ToolsLeaveTracesExercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson101"
    audioBase="/audio/teachers/khalil/lesson_101_tools_leave_traces/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ الْأَدَوَاتِ الَّتِي تَتْرُكُ أَثَرًا وَكَيْفَ تَسْتَعْمِلُهَا بِطَرِيقَةٍ صَحِيحَةٍ."
    nextPath="/lesson-v2/102"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson101ToolsLeaveTracesExercises;
