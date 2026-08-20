import { useEffect, useState } from "react";
import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";

type AnswerOption = {
  icon:string;
  label:string;
};

type SchoolMode =
  | "prices"
  | "geometry"
  | "count"
  | "safety"
  | "cleanliness";

type SchoolActivity = {
  title:string;
  mode:SchoolMode;
  options:AnswerOption[];
  answer:number;
};

const QUESTIONS:any[] = [
  {
    "id": "l114_ex1_q1",
    "mission": 1,
    "prompt": "مَا سِعْرُ مَسْحُوقِ الصَّابُونِ؟",
    "audioKey": "l114_ex1_q1",
    "schoolActivity": {
      "title": "أَقْرَأُ الْأَسْعَارَ",
      "mode": "prices",
      "options": [
        {
          "icon": "دج",
          "label": "45"
        },
        {
          "icon": "دج",
          "label": "27"
        },
        {
          "icon": "دج",
          "label": "35"
        },
        {
          "icon": "دج",
          "label": "54"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l114_ex1_q2",
    "mission": 1,
    "prompt": "مَا سِعْرُ مَاءِ جَافِيلَ؟",
    "audioKey": "l114_ex1_q2",
    "schoolActivity": {
      "title": "أَقْرَأُ الْأَسْعَارَ",
      "mode": "prices",
      "options": [
        {
          "icon": "دج",
          "label": "45"
        },
        {
          "icon": "دج",
          "label": "72"
        },
        {
          "icon": "دج",
          "label": "27"
        },
        {
          "icon": "دج",
          "label": "37"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l114_ex1_q3",
    "mission": 1,
    "prompt": "أَيُّ الْمَادَّتَيْنِ أَغْلَى ثَمَنًا؟",
    "audioKey": "l114_ex1_q3",
    "schoolActivity": {
      "title": "أُقَارِنُ الْأَسْعَارَ",
      "mode": "prices",
      "options": [
        {
          "icon": "🧼",
          "label": "مَسْحُوقُ الصَّابُونِ"
        },
        {
          "icon": "🧴",
          "label": "مَاءُ جَافِيلَ"
        },
        {
          "icon": "📏",
          "label": "الْمِسْطَرَةُ"
        },
        {
          "icon": "🗑️",
          "label": "سَلَّةُ الْمُهْمَلَاتِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l114_ex1_q4",
    "mission": 1,
    "prompt": "أَيُّ الْمَادَّتَيْنِ أَرْخَصُ ثَمَنًا؟",
    "audioKey": "l114_ex1_q4",
    "schoolActivity": {
      "title": "أُقَارِنُ الْأَسْعَارَ",
      "mode": "prices",
      "options": [
        {
          "icon": "🧼",
          "label": "مَسْحُوقُ الصَّابُونِ"
        },
        {
          "icon": "📏",
          "label": "الْمِسْطَرَةُ"
        },
        {
          "icon": "🗑️",
          "label": "سَلَّةُ الْمُهْمَلَاتِ"
        },
        {
          "icon": "🧴",
          "label": "مَاءُ جَافِيلَ"
        }
      ],
      "answer": 3
    }
  },
  {
    "id": "l114_ex2_q1",
    "mission": 2,
    "prompt": "مَا الْأَدَاةُ الَّتِي أَسْتَعْمِلُهَا لِرَسْمِ خُطُوطٍ مُسْتَقِيمَةٍ؟",
    "audioKey": "l114_ex2_q1",
    "schoolActivity": {
      "title": "أَسْتَعْمِلُ الْمِسْطَرَةَ",
      "mode": "geometry",
      "options": [
        {
          "icon": "📏",
          "label": "الْمِسْطَرَةُ"
        },
        {
          "icon": "✏️",
          "label": "الْقَلَمُ"
        },
        {
          "icon": "🖌️",
          "label": "الْفُرْشَاةُ"
        },
        {
          "icon": "✂️",
          "label": "الْمِقَصُّ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l114_ex2_q2",
    "mission": 2,
    "prompt": "مَا الشَّكْلُ الْمَوْجُودُ فَوْقَ الْمُسْتَطِيلِ؟",
    "audioKey": "l114_ex2_q2",
    "schoolActivity": {
      "title": "أَتَعَرَّفُ إِلَى الشَّكْلِ",
      "mode": "geometry",
      "options": [
        {
          "icon": "○",
          "label": "دَائِرَةٌ"
        },
        {
          "icon": "△",
          "label": "مُثَلَّثٌ"
        },
        {
          "icon": "□",
          "label": "مُرَبَّعٌ"
        },
        {
          "icon": "▭",
          "label": "مُسْتَطِيلٌ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l114_ex2_q3",
    "mission": 2,
    "prompt": "مَا الشَّكْلُ الْمَوْجُودُ أَسْفَلَ الْمُثَلَّثِ؟",
    "audioKey": "l114_ex2_q3",
    "schoolActivity": {
      "title": "أَتَعَرَّفُ إِلَى الشَّكْلِ",
      "mode": "geometry",
      "options": [
        {
          "icon": "○",
          "label": "دَائِرَةٌ"
        },
        {
          "icon": "□",
          "label": "مُرَبَّعٌ"
        },
        {
          "icon": "▭",
          "label": "مُسْتَطِيلٌ"
        },
        {
          "icon": "△",
          "label": "مُثَلَّثٌ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l114_ex2_q4",
    "mission": 2,
    "prompt": "كَيْفَ تَكُونُ الْخُطُوطُ الَّتِي أَرْسُمُهَا بِالْمِسْطَرَةِ؟",
    "audioKey": "l114_ex2_q4",
    "schoolActivity": {
      "title": "خُطُوطٌ بِالْمِسْطَرَةِ",
      "mode": "geometry",
      "options": [
        {
          "icon": "〰",
          "label": "مُنْحَنِيَةٌ"
        },
        {
          "icon": "〽",
          "label": "مُتَعَرِّجَةٌ"
        },
        {
          "icon": "○",
          "label": "دَائِرِيَّةٌ"
        },
        {
          "icon": "━",
          "label": "مُسْتَقِيمَةٌ"
        }
      ],
      "answer": 3
    }
  },
  {
    "id": "l114_ex3_q1",
    "mission": 3,
    "prompt": "كَمْ مِمْسَحَةً تَظْهَرُ؟",
    "audioKey": "l114_ex3_q1",
    "schoolActivity": {
      "title": "أَعُدُّ الْمَمْسَحَاتِ",
      "mode": "count",
      "options": [
        {
          "icon": "1",
          "label": "وَاحِدَةٌ"
        },
        {
          "icon": "2",
          "label": "اثْنَتَانِ"
        },
        {
          "icon": "3",
          "label": "ثَلَاثٌ"
        },
        {
          "icon": "4",
          "label": "أَرْبَعٌ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l114_ex3_q2",
    "mission": 3,
    "prompt": "أَيُّ مَجْمُوعَةٍ لَا يَجِبُ أَنْ تَكُونَ فِي مُتَنَاوَلِ الْأَطْفَالِ؟",
    "audioKey": "l114_ex3_q2",
    "schoolActivity": {
      "title": "أَحْذَرُ الْمَوَادَّ الْخَطِرَةَ",
      "mode": "safety",
      "options": [
        {
          "icon": "📚",
          "label": "كُتُبٌ وَأَقْلَامٌ"
        },
        {
          "icon": "⚽",
          "label": "أَلْعَابٌ"
        },
        {
          "icon": "💊",
          "label": "دَوَاءٌ وَمِحْقَنَةٌ وَثِقَابٌ وَمُنَظِّفٌ"
        },
        {
          "icon": "📒",
          "label": "دَفْتَرٌ وَمِسْطَرَةٌ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l114_ex3_q3",
    "mission": 3,
    "prompt": "هَلْ أَلْمَسُ الدَّوَاءَ دُونَ شَخْصٍ بَالِغٍ؟",
    "audioKey": "l114_ex3_q3",
    "schoolActivity": {
      "title": "أَتَصَرَّفُ بِأَمَانٍ",
      "mode": "safety",
      "options": [
        {
          "icon": "✓",
          "label": "نَعَمْ"
        },
        {
          "icon": "✗",
          "label": "لَا"
        },
        {
          "icon": "?",
          "label": "أَحْيَانًا"
        },
        {
          "icon": "✓",
          "label": "دَائِمًا"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l114_ex3_q4",
    "mission": 3,
    "prompt": "مَاذَا أَفْعَلُ مَعَ مَوَادِّ التَّنْظِيفِ الْقَوِيَّةِ؟",
    "audioKey": "l114_ex3_q4",
    "schoolActivity": {
      "title": "أَتَصَرَّفُ بِأَمَانٍ",
      "mode": "safety",
      "options": [
        {
          "icon": "🧴",
          "label": "أَسْتَعْمِلُهَا وَحْدِي"
        },
        {
          "icon": "🧸",
          "label": "أَلْعَبُ بِهَا"
        },
        {
          "icon": "✋",
          "label": "لَا أَلْمَسُهَا دُونَ شَخْصٍ بَالِغٍ"
        },
        {
          "icon": "🥤",
          "label": "أَضَعُهَا مَعَ الشَّرَابِ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l114_ex4_q1",
    "mission": 4,
    "prompt": "أَيْنَ أَضَعُ الْأَوْرَاقَ بَعْدَ جَمْعِهَا؟",
    "audioKey": "l114_ex4_q1",
    "schoolActivity": {
      "title": "أُحَافِظُ عَلَى نَظَافَةِ مَدْرَسَتِي",
      "mode": "cleanliness",
      "options": [
        {
          "icon": "🗑️",
          "label": "فِي سَلَّةِ الْمُهْمَلَاتِ"
        },
        {
          "icon": "🪑",
          "label": "فَوْقَ الْكُرْسِيِّ"
        },
        {
          "icon": "🚪",
          "label": "عِنْدَ الْبَابِ"
        },
        {
          "icon": "⬇️",
          "label": "عَلَى الْأَرْضِ"
        }
      ],
      "answer": 0
    }
  },
  {
    "id": "l114_ex4_q2",
    "mission": 4,
    "prompt": "أَيُّ سُلُوكٍ يُحَافِظُ عَلَى نَظَافَةِ الْقِسْمِ؟",
    "audioKey": "l114_ex4_q2",
    "schoolActivity": {
      "title": "السُّلُوكُ الصَّحِيحُ",
      "mode": "cleanliness",
      "options": [
        {
          "icon": "📄",
          "label": "أَرْمِي الْوَرَقَ عَلَى الْأَرْضِ"
        },
        {
          "icon": "🗑️",
          "label": "أَجْمَعُ الْأَوْرَاقَ وَأَضَعُهَا فِي السَّلَّةِ"
        },
        {
          "icon": "🖍️",
          "label": "أَكْتُبُ عَلَى الْجِدَارِ"
        },
        {
          "icon": "👟",
          "label": "أَتْرُكُ الْأَوْسَاخَ"
        }
      ],
      "answer": 1
    }
  },
  {
    "id": "l114_ex4_q3",
    "mission": 4,
    "prompt": "مَاذَا أَفْعَلُ بَعْدَ التَّنْظِيفِ؟",
    "audioKey": "l114_ex4_q3",
    "schoolActivity": {
      "title": "النَّظَافَةُ وَالصِّحَّةُ",
      "mode": "cleanliness",
      "options": [
        {
          "icon": "👐",
          "label": "أَتْرُكُ يَدَيَّ مُتَّسِخَتَيْنِ"
        },
        {
          "icon": "📄",
          "label": "أَرْمِي الْأَوْرَاقَ"
        },
        {
          "icon": "🧼",
          "label": "أَغْسِلُ يَدَيَّ"
        },
        {
          "icon": "🧴",
          "label": "أَلْعَبُ بِالْمُنَظِّفِ"
        }
      ],
      "answer": 2
    }
  },
  {
    "id": "l114_ex4_q4",
    "mission": 4,
    "prompt": "أَيُّ سُلُوكٍ غَيْرُ صَحِيحٍ؟",
    "audioKey": "l114_ex4_q4",
    "schoolActivity": {
      "title": "أُمَيِّزُ السُّلُوكَ غَيْرَ الصَّحِيحِ",
      "mode": "cleanliness",
      "options": [
        {
          "icon": "🗑️",
          "label": "أَضَعُ النُّفَايَاتِ فِي السَّلَّةِ"
        },
        {
          "icon": "🧼",
          "label": "أَغْسِلُ يَدَيَّ"
        },
        {
          "icon": "🤝",
          "label": "أُسَاعِدُ فِي تَنْظِيفِ الْقِسْمِ"
        },
        {
          "icon": "📄",
          "label": "أَرْمِي الْأَوْرَاقَ عَلَى الْأَرْضِ"
        }
      ],
      "answer": 3
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَقْرَأُ أَسْعَارَ مَوَادِّ التَّنْظِيفِ",
  2:"أَسْتَعْمِلُ الْمِسْطَرَةَ وَأَتَعَرَّفُ إِلَى الشَّكْلِ",
  3:"أَعُدُّ وَأَتَصَرَّفُ بِأَمَانٍ",
  4:"أُحَافِظُ عَلَى نَظَافَةِ مَدْرَسَتِي",
};

const navy="#173A63";
const gold="#E9AE22";
const green="#28A96B";
const red="#D9534F";

const ASSET_BASE =
  "/lessons/v2/exercise-assets/lesson114";

const A=(name:string)=>
  `${ASSET_BASE}/${name}`;


function AssetImage({
  name,
  alt="",
  size=90,
  contain=true,
}:{
  name:string;
  alt?:string;
  size?:number;
  contain?:boolean;
}) {
  return (
    <img
      src={A(name)}
      alt={alt}
      draggable={false}
      style={{
        width:size,
        height:size,
        objectFit:
          contain
            ? "contain"
            : "cover",
        borderRadius:18,
        display:"block",
        userSelect:"none",
      }}
    />
  );
}


function optionAsset(
  option:AnswerOption
):string|null {
  const label=option.label;

  // ==========================================================
  // PRICES
  // ==========================================================

  if(label.includes("مَسْحُوقُ الصَّابُونِ"))
    return "soap-powder.webp";

  if(label.includes("مَاءُ جَافِيلَ"))
    return "bleach.webp";


  // ==========================================================
  // GEOMETRY
  // ==========================================================

  if(label==="الْمِسْطَرَةُ")
    return "ruler.webp";

  if(label==="الْقَلَمُ")
    return "pencil.webp";

  if(label==="مُثَلَّثٌ")
    return "triangle.webp";

  if(label==="مُسْتَطِيلٌ")
    return "rectangle.webp";

  if(label==="مُرَبَّعٌ")
    return "square.webp";

  if(label==="دَائِرَةٌ")
    return "circle.webp";


  // ==========================================================
  // SAFE / DANGEROUS MATERIALS
  // ==========================================================

  if(label.includes("دَوَاءٌ وَمِحْقَنَةٌ"))
    return "warning-danger.webp";

  if(label.includes("كُتُبٌ وَأَقْلَامٌ"))
    return "book.webp";

  if(label==="أَلْعَابٌ")
    return "toy.webp";

  if(label.includes("دَفْتَرٌ وَمِسْطَرَةٌ"))
    return "notebook.webp";

  if(label.includes("أَسْتَعْمِلُهَا وَحْدِي"))
    return "strong-cleaner.webp";

  if(label==="أَلْعَبُ بِهَا")
    return "toy.webp";

  if(label.includes("لَا أَلْمَسُهَا دُونَ شَخْصٍ بَالِغٍ"))
    return "warning-adult-supervision.webp";

  if(label.includes("أَضَعُهَا مَعَ الشَّرَابِ"))
    return "warning-danger.webp";


  // ==========================================================
  // CLEANLINESS
  // ==========================================================

  if(label.includes("فِي سَلَّةِ الْمُهْمَلَاتِ"))
    return "trash-correct.webp";

  if(label.includes("عَلَى الْأَرْضِ"))
    return "littering-wrong.webp";

  if(label.includes("أَجْمَعُ الْأَوْرَاقَ"))
    return "clean-class.webp";

  if(label.includes("أَكْتُبُ عَلَى الْجِدَارِ"))
    return "writing-wall-wrong.webp";

  if(label.includes("أَتْرُكُ الْأَوْسَاخَ"))
    return "dirty-room.webp";

  if(label==="أَغْسِلُ يَدَيَّ")
    return "wash-hands.webp";

  if(label.includes("أَتْرُكُ يَدَيَّ"))
    return "warning-wash-hands.webp";

  if(label.includes("أَلْعَبُ بِالْمُنَظِّفِ"))
    return "warning-no-touch.webp";

  if(label.includes("أُسَاعِدُ فِي تَنْظِيفِ الْقِسْمِ"))
    return "clean-class.webp";

  if(label.includes("أَضَعُ النُّفَايَاتِ فِي السَّلَّةِ"))
    return "trash-correct.webp";


  return null;
}



// ============================================================
// PRICE TABLE — REAL ASSETS
// ============================================================

function PriceVisual() {
  return (
    <div
      dir="rtl"
      style={{
        width:"100%",
        maxWidth:440,
        margin:"0 auto",
        display:"grid",
        gap:10,
      }}
    >
      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap:10,
        }}
      >
        <div
          style={{
            border:`3px solid ${gold}`,
            borderRadius:22,
            background:"#fff",
            padding:9,
            display:"grid",
            placeItems:"center",
            gap:5,
          }}
        >
          <AssetImage
            name="soap-powder.webp"
            alt="مسحوق الصابون"
            size={104}
          />

          <div
            style={{
              color:navy,
              fontWeight:950,
              fontSize:15,
              textAlign:"center",
            }}
          >
            مَسْحُوقُ الصَّابُونِ
          </div>

          <div
            dir="ltr"
            style={{
              color:green,
              fontWeight:950,
              fontSize:27,
            }}
          >
            45 دج
          </div>
        </div>

        <div
          style={{
            border:`3px solid ${gold}`,
            borderRadius:22,
            background:"#fff",
            padding:9,
            display:"grid",
            placeItems:"center",
            gap:5,
          }}
        >
          <AssetImage
            name="bleach.webp"
            alt="ماء جافيل"
            size={104}
          />

          <div
            style={{
              color:navy,
              fontWeight:950,
              fontSize:15,
              textAlign:"center",
            }}
          >
            مَاءُ جَافِيلَ
          </div>

          <div
            dir="ltr"
            style={{
              color:green,
              fontWeight:950,
              fontSize:27,
            }}
          >
            27 دج
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// GEOMETRY VISUAL — REAL ASSETS
// ============================================================

function GeometryVisual() {
  return (
    <div
      style={{
        width:"100%",
        display:"grid",
        gap:10,
      }}
    >
      <div
        style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          gap:14,
        }}
      >
        <div
          style={{
            border:`3px solid ${gold}`,
            borderRadius:20,
            padding:7,
            background:"#fff",
          }}
        >
          <AssetImage
            name="ruler.webp"
            alt="المسطرة"
            size={92}
          />
        </div>

        <div
          style={{
            border:`3px solid ${gold}`,
            borderRadius:20,
            padding:7,
            background:"#fff",
          }}
        >
          <AssetImage
            name="house-shape.webp"
            alt="شكل البيت"
            size={118}
          />
        </div>
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(4,minmax(0,1fr))",
          gap:6,
        }}
      >
        {[
          ["triangle.webp","مُثَلَّثٌ"],
          ["rectangle.webp","مُسْتَطِيلٌ"],
          ["square.webp","مُرَبَّعٌ"],
          ["circle.webp","دَائِرَةٌ"],
        ].map(([name,label])=>(
          <div
            key={name}
            style={{
              minWidth:0,
              border:`2px solid ${gold}`,
              borderRadius:15,
              background:"#fff",
              padding:4,
              display:"grid",
              placeItems:"center",
            }}
          >
            <AssetImage
              name={name}
              alt={label}
              size={60}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// COUNT — REAL MOPS
// ============================================================

function CountVisual() {
  return (
    <div
      style={{
        minHeight:170,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:24,
      }}
    >
      <div
        style={{
          border:`3px solid ${gold}`,
          borderRadius:22,
          padding:5,
          background:"#fff",
        }}
      >
        <AssetImage
          name="mop.webp"
          alt="ممسحة"
          size={118}
        />
      </div>

      <div
        style={{
          border:`3px solid ${gold}`,
          borderRadius:22,
          padding:5,
          background:"#fff",
        }}
      >
        <AssetImage
          name="mop.webp"
          alt="ممسحة"
          size={118}
        />
      </div>
    </div>
  );
}

// ============================================================
// SAFETY — REAL ASSETS + WARNING SIGNS
// ============================================================

function SafetyVisual() {
  return (
    <div
      style={{
        width:"100%",
        display:"grid",
        gap:10,
      }}
    >
      <div
        style={{
          textAlign:"center",
          color:red,
          fontWeight:950,
          fontSize:17,
        }}
      >
        مَوَادٌّ لَا تَكُونُ فِي مُتَنَاوَلِ الْأَطْفَالِ
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(4,minmax(0,1fr))",
          gap:6,
        }}
      >
        {[
          ["medicine.webp","دواء"],
          ["syringe.webp","محقنة"],
          ["matches.webp","أعواد الثقاب"],
          ["strong-cleaner.webp","منظف قوي"],
        ].map(([name,label])=>(
          <div
            key={name}
            style={{
              minWidth:0,
              border:`2px solid ${red}`,
              borderRadius:15,
              padding:3,
              background:"#FFF7F6",
              display:"grid",
              placeItems:"center",
            }}
          >
            <AssetImage
              name={name}
              alt={label}
              size={67}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(5,minmax(0,1fr))",
          gap:4,
        }}
      >
        {[
          "warning-no-touch.webp",
          "warning-children.webp",
          "warning-danger.webp",
          "warning-adult-supervision.webp",
          "warning-wash-hands.webp",
        ].map(name=>(
          <div
            key={name}
            style={{
              minWidth:0,
              display:"grid",
              placeItems:"center",
            }}
          >
            <AssetImage
              name={name}
              size={56}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CLEANLINESS — REAL SCHOOL SCENES
// ============================================================

function CleanlinessVisual() {
  return (
    <div
      style={{
        width:"100%",
        display:"grid",
        gap:9,
      }}
    >
      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap:8,
        }}
      >
        <div
          style={{
            border:`3px solid ${green}`,
            borderRadius:18,
            padding:4,
            background:"#EFFAF4",
            overflow:"hidden",
          }}
        >
          <AssetImage
            name="clean-room.webp"
            alt="قسم نظيف"
            size={138}
            contain={false}
          />
        </div>

        <div
          style={{
            border:`3px solid ${red}`,
            borderRadius:18,
            padding:4,
            background:"#FFF3F2",
            overflow:"hidden",
          }}
        >
          <AssetImage
            name="dirty-room.webp"
            alt="قسم متسخ"
            size={138}
            contain={false}
          />
        </div>
      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(5,minmax(0,1fr))",
          gap:4,
        }}
      >
        {[
          "trash-correct.webp",
          "clean-class.webp",
          "wash-hands.webp",
          "littering-wrong.webp",
          "writing-wall-wrong.webp",
        ].map(name=>(
          <div
            key={name}
            style={{
              minWidth:0,
              display:"grid",
              placeItems:"center",
              border:`2px solid ${gold}`,
              borderRadius:13,
              padding:2,
              background:"#fff",
            }}
          >
            <AssetImage
              name={name}
              size={57}
              contain={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN VISUAL
// ============================================================

function MainVisual({
  activity,
}:{
  activity:SchoolActivity;
}) {
  if(activity.mode==="prices") {
    return <PriceVisual/>;
  }

  if(activity.mode==="geometry") {
    return <GeometryVisual/>;
  }

  if(activity.mode==="count") {
    return <CountVisual/>;
  }

  if(activity.mode==="safety") {
    return <SafetyVisual/>;
  }

  return <CleanlinessVisual/>;
}


// ============================================================
// ANSWER CARD — REAL ASSET, NO EMOJI
// ============================================================

function AnswerIcon({
  option,
}:{
  option:AnswerOption;
}) {
  const asset =
    optionAsset(option);

  const numeric =
    /^[0-9]+$/.test(option.label);

  const isYes =
    option.label==="نَعَمْ"
    || option.label==="دَائِمًا";

  const isNo =
    option.label==="لَا";

  return (
    <div
      style={{
        width:"100%",
        minHeight:118,
        display:"grid",
        alignContent:"center",
        justifyItems:"center",
        gap:6,
      }}
    >
      {asset ? (
        <div
          style={{
            width:96,
            height:96,
            display:"grid",
            placeItems:"center",
            borderRadius:18,
            overflow:"hidden",
            background:"#fff",
          }}
        >
          <AssetImage
            name={asset}
            alt={option.label}
            size={92}
            contain={true}
          />
        </div>
      ) : numeric ? (
        <div
          style={{
            width:82,
            height:82,
            borderRadius:22,
            border:`3px solid ${navy}`,
            background:"#F4F8FC",
            color:navy,
            display:"grid",
            placeItems:"center",
            fontWeight:950,
            fontSize:38,
          }}
        >
          {option.label}
        </div>
      ) : isYes ? (
        <div
          style={{
            width:72,
            height:72,
            borderRadius:99,
            background:"#EFFAF4",
            border:`4px solid ${green}`,
            color:green,
            display:"grid",
            placeItems:"center",
            fontWeight:950,
            fontSize:38,
          }}
        >
          ✓
        </div>
      ) : isNo ? (
        <div
          style={{
            width:72,
            height:72,
            borderRadius:99,
            background:"#FFF1F0",
            border:`4px solid ${red}`,
            color:red,
            display:"grid",
            placeItems:"center",
            fontWeight:950,
            fontSize:35,
          }}
        >
          ✕
        </div>
      ) : (
        <div
          style={{
            minWidth:78,
            height:68,
            padding:"0 10px",
            borderRadius:18,
            background:"#F4F8FC",
            border:`3px solid ${navy}`,
            color:navy,
            display:"grid",
            placeItems:"center",
            fontWeight:950,
            fontSize:26,
          }}
        >
          {
            option.icon==="?"
              ? "؟"
              : option.icon
          }
        </div>
      )}

      <div
        style={{
          color:navy,
          fontWeight:950,
          fontSize:
            numeric
              ? 20
              : "clamp(13px,3.4vw,17px)",
          lineHeight:1.4,
          textAlign:"center",
          padding:"0 4px",
        }}
      >
        {option.label}
      </div>
    </div>
  );
}

// ============================================================
// LAB
// ============================================================

function SchoolLab({
  questionId,
  activity,
  locked,
  showResult,
  onResult,
}:{
  questionId:string;
  activity:SchoolActivity;
  locked:boolean;
  showResult:boolean;
  onResult:(correct:boolean)=>void;
}) {
  const [selected,setSelected] =
    useState<number|null>(null);

  useEffect(()=>{
    setSelected(null);
  },[questionId]);

  const pick=(index:number)=>{
    if(locked) return;

    setSelected(index);
    onResult(index===activity.answer);
  };

  const correct =
    selected===activity.answer;

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
          borderRadius:28,
          background:"#fff",
          padding:14,
          boxShadow:
            "0 10px 24px rgba(23,58,99,.08)",
        }}
      >
        <div
          style={{
            color:navy,
            fontWeight:950,
            textAlign:"center",
            fontSize:"clamp(18px,4.6vw,23px)",
            marginBottom:10,
          }}
        >
          {activity.title}
        </div>

        <MainVisual
          activity={activity}
        />

        {correct && (
          <div
            style={{
              marginTop:10,
              padding:"8px 12px",
              borderRadius:16,
              background:"#EFFAF4",
              color:green,
              fontWeight:950,
              textAlign:"center",
              fontSize:17,
            }}
          >
            ✓ إِجَابَةٌ صَحِيحَةٌ
          </div>
        )}
      </div>

      <div
        dir="rtl"
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap:12,
        }}
      >
        {activity.options.map(
          (option,index)=>{
            const chosen =
              selected===index;

            const isCorrect =
              index===activity.answer;

            let border=gold;
            let background="#fff";

            if(showResult && chosen) {
              border =
                isCorrect
                  ? green
                  : red;

              background =
                isCorrect
                  ? "#EFFAF4"
                  : "#FFF1F0";
            }

            if(showResult && isCorrect) {
              border=green;
            }

            return (
              <button
                key={index}
                type="button"
                disabled={locked}
                onClick={()=>pick(index)}
                style={{
                  minHeight:145,
                  border:`3px solid ${border}`,
                  borderRadius:23,
                  background,
                  boxShadow:
                    "0 7px 16px rgba(23,58,99,.08)",
                  fontFamily:"inherit",
                  padding:7,
                  cursor:
                    locked
                      ? "default"
                      : "pointer",
                }}
              >
                <AnswerIcon
                  option={option}
                />
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
    <SchoolLab
      questionId={question.id}
      activity={question.schoolActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}


export const Lesson114SchoolCleanlinessExercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson114"
    audioBase="/audio/teachers/khalil/lesson_114_school_cleanliness/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تُوَظِّفُ مَعَارِفَكَ وَتُحَافِظُ عَلَى نَظَافَةِ مَدْرَسَتِكَ وَسَلَامَتِكَ."
    nextPath="/lesson-v2/115"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson114SchoolCleanlinessExercises;
