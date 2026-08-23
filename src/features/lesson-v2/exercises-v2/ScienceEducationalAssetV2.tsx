
function Graphic({
  kind,
}: {
  kind: string;
}) {
  switch (kind) {

    case "water":
    case "liquid":
      return (
        <>
          <path
            d="M50 12 C42 28 28 42 28 59 C28 75 38 86 50 86 C62 86 72 75 72 59 C72 42 58 28 50 12Z"
            fill="#42BDF5"
            stroke="#176FA6"
            strokeWidth="4"
          />
          <path
            d="M40 58 C40 49 45 43 49 38"
            fill="none"
            stroke="#DFF7FF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      );

    case "book":
    case "reading":
      return (
        <>
          <rect
            x="20"
            y="19"
            width="58"
            height="64"
            rx="8"
            fill="#278DE2"
            stroke="#15568E"
            strokeWidth="4"
          />
          <rect
            x="26"
            y="19"
            width="8"
            height="64"
            fill="#F2C94C"
          />
          <path
            d="M38 33 H67 M38 45 H67 M38 57 H60"
            stroke="#EAF6FF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      );

    case "juice":
      return (
        <>
          <path
            d="M28 24 H67 L73 80 H25Z"
            fill="#6CCF63"
            stroke="#338A3E"
            strokeWidth="4"
          />
          <rect
            x="32"
            y="40"
            width="34"
            height="27"
            rx="5"
            fill="#FFF1C5"
          />
          <circle
            cx="49"
            cy="53"
            r="9"
            fill="#F26A4B"
          />
          <path
            d="M61 22 L70 10 M70 10 H81"
            fill="none"
            stroke="#E85A3A"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      );

    case "oil":
      return (
        <>
          <rect
            x="34"
            y="12"
            width="31"
            height="14"
            rx="5"
            fill="#D99D24"
          />
          <path
            d="M29 28 H70 L74 78 Q74 86 65 86 H34 Q25 86 25 78Z"
            fill="#F7C948"
            stroke="#A86D13"
            strokeWidth="4"
          />
          <path
            d="M35 52 Q50 43 65 52 V75 H35Z"
            fill="#E4A522"
          />
        </>
      );

    case "wood":
      return (
        <>
          <path
            d="M17 35 Q20 25 33 26 H72 Q83 27 84 39 V68 Q82 78 70 79 H30 Q17 77 16 67Z"
            fill="#A96532"
            stroke="#74401E"
            strokeWidth="4"
          />
          <ellipse
            cx="72"
            cy="52"
            rx="13"
            ry="25"
            fill="#D58D4E"
            stroke="#74401E"
            strokeWidth="4"
          />
          <ellipse
            cx="72"
            cy="52"
            rx="7"
            ry="15"
            fill="none"
            stroke="#A96532"
            strokeWidth="3"
          />
        </>
      );

    case "glass":
    case "container":
    case "drink":
      return (
        <>
          <path
            d="M29 19 H71 L66 82 H34Z"
            fill="#EAF8FF"
            stroke="#5598B7"
            strokeWidth="4"
          />
          <path
            d="M34 52 H66 L63 78 H37Z"
            fill="#82D6F3"
          />
        </>
      );

    case "milk":
      return (
        <>
          <path
            d="M31 23 L41 13 H67 L74 27 V84 H27 V27Z"
            fill="#F5FBFF"
            stroke="#5A94B8"
            strokeWidth="4"
          />
          <path
            d="M31 23 H74"
            stroke="#5A94B8"
            strokeWidth="4"
          />
          <rect
            x="35"
            y="43"
            width="31"
            height="27"
            rx="5"
            fill="#7FC9ED"
          />
        </>
      );

    case "cookie":
      return (
        <>
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="#D99746"
            stroke="#9D6228"
            strokeWidth="4"
          />
          <circle cx="39" cy="38" r="4" fill="#68401F" />
          <circle cx="61" cy="34" r="4" fill="#68401F" />
          <circle cx="56" cy="57" r="5" fill="#68401F" />
          <circle cx="34" cy="62" r="4" fill="#68401F" />
        </>
      );

    case "sugar":
    case "powder":
      return (
        <>
          <path
            d="M23 50 Q50 34 77 50 V76 Q50 88 23 76Z"
            fill="#E9F5FF"
            stroke="#6895AF"
            strokeWidth="4"
          />
          <path
            d="M28 49 Q50 32 72 49 Q50 63 28 49Z"
            fill="#FFFFFF"
            stroke="#CBDCE5"
            strokeWidth="3"
          />
          <circle cx="42" cy="45" r="2.5" fill="#B9D1DD" />
          <circle cx="51" cy="41" r="2.5" fill="#B9D1DD" />
          <circle cx="59" cy="46" r="2.5" fill="#B9D1DD" />
        </>
      );

    case "pencil":
    case "writing":
      return (
        <>
          <path
            d="M20 73 L65 28 L76 39 L31 84 L16 87Z"
            fill="#F3C744"
            stroke="#A97619"
            strokeWidth="4"
          />
          <path
            d="M65 28 L74 19 L84 29 L76 39Z"
            fill="#E66A67"
          />
          <path
            d="M16 87 L20 73 L31 84Z"
            fill="#555"
          />
        </>
      );

    case "pencil":
      return (
        <>
          <path
            d="M22 74 L64 32 L76 44 L34 86 L18 88Z"
            fill="#F3C84D"
            stroke="#A87418"
            strokeWidth="4"
          />
          <path
            d="M64 32 L74 22 L86 34 L76 44Z"
            fill="#E56E74"
            stroke="#A84247"
            strokeWidth="3"
          />
          <path
            d="M18 88 L22 74 L34 86Z"
            fill="#444"
          />
        </>
      );

    case "pen":
      return (
        <>
          <path
            d="M23 72 L66 20 L78 30 L35 81Z"
            fill="#285EBE"
            stroke="#15396E"
            strokeWidth="4"
          />
          <path
            d="M35 81 L21 86 L23 72Z"
            fill="#E6E6E6"
            stroke="#555"
            strokeWidth="3"
          />
        </>
      );

    case "eraser":
      return (
        <>
          <path
            d="M22 58 L49 31 L79 57 L52 83 H31Z"
            fill="#F68AA0"
            stroke="#A74762"
            strokeWidth="4"
          />
          <path
            d="M40 40 L69 66"
            stroke="#FFE6EC"
            strokeWidth="5"
          />
        </>
      );

    case "soap":
    case "cleaning":
    case "wash":
      return (
        <>
          <rect
            x="22"
            y="45"
            width="58"
            height="35"
            rx="14"
            fill="#73D8C5"
            stroke="#2D8C7C"
            strokeWidth="4"
          />
          <circle cx="30" cy="30" r="8" fill="#DFFBFF" stroke="#62B7C0" strokeWidth="3" />
          <circle cx="51" cy="23" r="10" fill="#DFFBFF" stroke="#62B7C0" strokeWidth="3" />
          <circle cx="69" cy="34" r="7" fill="#DFFBFF" stroke="#62B7C0" strokeWidth="3" />
        </>
      );

    case "cleaner":
    case "disinfect":
      return (
        <>
          <path
            d="M40 20 H64 V32 H72 V84 H30 V38 Q30 32 36 32 H40Z"
            fill="#7DD2F2"
            stroke="#347F9D"
            strokeWidth="4"
          />
          <path
            d="M48 20 V12 H72"
            fill="none"
            stroke="#347F9D"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect
            x="39"
            y="48"
            width="25"
            height="22"
            rx="5"
            fill="#FFFFFF"
          />
        </>
      );

    case "broom":
      return (
        <>
          <path
            d="M59 15 L41 62"
            stroke="#8B5A2B"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M25 58 L52 62 L61 84 H18Z"
            fill="#E7B84B"
            stroke="#A77822"
            strokeWidth="4"
          />
        </>
      );

    case "bucket":
      return (
        <>
          <path
            d="M25 39 H75 L68 82 H32Z"
            fill="#5CB4E8"
            stroke="#2B739B"
            strokeWidth="4"
          />
          <path
            d="M33 39 Q50 13 67 39"
            fill="none"
            stroke="#666"
            strokeWidth="4"
          />
        </>
      );

    case "sponge":
      return (
        <>
          <rect
            x="20"
            y="29"
            width="60"
            height="47"
            rx="14"
            fill="#F4CF49"
            stroke="#B7941E"
            strokeWidth="4"
          />
          <circle cx="34" cy="42" r="4" fill="#D7AE29" />
          <circle cx="56" cy="52" r="5" fill="#D7AE29" />
          <circle cx="69" cy="40" r="3" fill="#D7AE29" />
        </>
      );

    case "germs":
    case "dirt":
      return (
        <>
          <circle
            cx="50"
            cy="51"
            r="25"
            fill="#7BC96F"
            stroke="#397A34"
            strokeWidth="4"
          />
          <path
            d="M50 18 V7 M50 95 V84 M18 51 H7 M93 51 H82 M27 28 L18 19 M73 28 L82 19 M27 74 L18 83 M73 74 L82 83"
            stroke="#397A34"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="41" cy="46" r="4" fill="#274C26" />
          <circle cx="59" cy="46" r="4" fill="#274C26" />
          <path
            d="M40 62 Q50 68 61 61"
            fill="none"
            stroke="#274C26"
            strokeWidth="4"
          />
        </>
      );

    case "food":
      return (
        <>
          <circle
            cx="50"
            cy="52"
            r="29"
            fill="#F3F4F6"
            stroke="#8C98A2"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="52"
            r="18"
            fill="#FFD567"
          />
          <path d="M15 25 V80 M10 25 V45 M20 25 V45" stroke="#65717B" strokeWidth="4" strokeLinecap="round" />
          <path d="M85 25 V80 Q75 59 85 44" fill="none" stroke="#65717B" strokeWidth="4" strokeLinecap="round" />
        </>
      );

    case "bread":
      return (
        <>
          <path
            d="M19 56 Q19 31 38 28 Q50 17 61 28 Q81 31 81 56 V78 H19Z"
            fill="#DCA25C"
            stroke="#965D28"
            strokeWidth="4"
          />
          <path d="M36 35 Q31 45 36 54 M52 31 Q47 42 52 51 M67 36 Q62 46 67 55"
            fill="none"
            stroke="#F4D194"
            strokeWidth="4"
          />
        </>
      );

    case "toy":
      return (
        <>
          <circle cx="50" cy="51" r="34" fill="#EF6A6A" stroke="#9A3333" strokeWidth="4" />
          <path d="M22 50 Q50 38 78 50 M50 18 Q39 51 50 84"
            fill="none"
            stroke="#F7E36B"
            strokeWidth="6"
          />
        </>
      );

    case "school":
      return (
        <>
          <rect x="25" y="30" width="50" height="50" rx="11" fill="#5B8EE8" stroke="#285AAB" strokeWidth="4" />
          <path d="M36 30 Q50 12 64 30" fill="none" stroke="#285AAB" strokeWidth="5" />
          <rect x="34" y="48" width="32" height="20" rx="5" fill="#F4C94E" />
        </>
      );

    case "adult":
    case "people":
      return (
        <>
          <circle cx="50" cy="31" r="15" fill="#F4C7A1" stroke="#9A6A49" strokeWidth="3" />
          <path d="M26 83 Q27 51 50 51 Q74 51 75 83Z" fill="#5D93D8" stroke="#2E5F9C" strokeWidth="4" />
        </>
      );

    case "warning":
      return (
        <>
          <path
            d="M50 13 L89 82 H11Z"
            fill="#FFD84D"
            stroke="#B27A00"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="M50 36 V59" stroke="#4A3A00" strokeWidth="7" strokeLinecap="round" />
          <circle cx="50" cy="70" r="4" fill="#4A3A00" />
        </>
      );

    case "safe":
      return (
        <>
          <path d="M50 11 L79 22 V47 Q78 72 50 88 Q22 72 21 47 V22Z"
            fill="#6FD08C"
            stroke="#2E7A46"
            strokeWidth="4"
          />
          <path d="M34 50 L45 62 L68 36"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );

    case "lock":
      return (
        <>
          <rect x="25" y="43" width="50" height="39" rx="8" fill="#F1C24A" stroke="#9B721C" strokeWidth="4" />
          <path d="M35 43 V32 Q35 16 50 16 Q65 16 65 32 V43"
            fill="none"
            stroke="#66717B"
            strokeWidth="7"
          />
        </>
      );

    case "prohibited":
    case "no":
      return (
        <>
          <circle cx="50" cy="50" r="35" fill="#FFF" stroke="#E34A4A" strokeWidth="8" />
          <path d="M26 26 L74 74" stroke="#E34A4A" strokeWidth="9" strokeLinecap="round" />
        </>
      );

    case "solid":
      return (
        <>
          <rect x="18" y="28" width="64" height="48" rx="5" fill="#D56F4C" stroke="#8D432D" strokeWidth="4" />
          <path d="M18 52 H82 M39 28 V52 M62 52 V76"
            stroke="#F3A287"
            strokeWidth="4"
          />
        </>
      );

    case "shape":
      return (
        <>
          <circle cx="30" cy="34" r="15" fill="#4DB6E8" />
          <rect x="54" y="20" width="28" height="28" rx="4" fill="#F0C64C" />
          <path d="M24 79 L42 52 L60 79Z" fill="#71C879" />
        </>
      );

    case "name":
      return (
        <>
          <path d="M20 28 H64 L82 50 L64 72 H20Z"
            fill="#7EB8EA"
            stroke="#356E9F"
            strokeWidth="4"
          />
          <circle cx="31" cy="50" r="5" fill="#FFFFFF" />
          <path d="M43 43 H65 M43 56 H59" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </>
      );

    case "color":
    case "art":
      return (
        <>
          <path
            d="M50 15 Q83 18 86 48 Q88 71 66 76 Q56 79 54 69 Q51 60 41 64 Q24 69 17 55 Q10 41 23 28 Q34 16 50 15Z"
            fill="#F0D36E"
            stroke="#9B7C25"
            strokeWidth="4"
          />
          <circle cx="37" cy="33" r="6" fill="#E45A55" />
          <circle cx="54" cy="28" r="6" fill="#4FA7E3" />
          <circle cx="68" cy="40" r="6" fill="#61B967" />
        </>
      );

    case "quantity":
      return (
        <>
          <text x="50" y="63" textAnchor="middle" fontSize="39" fontWeight="800" fill="#326FA5">
            123
          </text>
        </>
      );

    case "trash":
      return (
        <>
          <path d="M29 31 H72 L67 82 H34Z" fill="#8DA1AF" stroke="#50606A" strokeWidth="4" />
          <path d="M24 31 H77 M39 22 H62" stroke="#50606A" strokeWidth="6" strokeLinecap="round" />
        </>
      );

    case "open":
      return (
        <>
          <rect x="28" y="46" width="48" height="36" rx="8" fill="#F1C24A" stroke="#9B721C" strokeWidth="4" />
          <path d="M39 46 V31 Q39 17 54 17 Q68 17 69 30"
            fill="none"
            stroke="#66717B"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      );

    case "taste":
      return (
        <>
          <circle cx="50" cy="50" r="33" fill="#F4C7A1" stroke="#9A6A49" strokeWidth="4" />
          <circle cx="39" cy="42" r="4" fill="#444" />
          <circle cx="61" cy="42" r="4" fill="#444" />
          <path d="M36 59 Q50 72 64 59" fill="#E96576" stroke="#8E3543" strokeWidth="4" />
        </>
      );

    case "separate":
      return (
        <>
          <path d="M47 50 H18 M18 50 L30 38 M18 50 L30 62"
            fill="none" stroke="#327EB6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M53 50 H82 M82 50 L70 38 M82 50 L70 62"
            fill="none" stroke="#327EB6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          />
        </>
      );

    case "float":
      return (
        <>
          <path d="M14 58 Q25 52 36 58 Q47 64 58 58 Q69 52 86 58"
            fill="none" stroke="#42BDF5" strokeWidth="7"
          />
          <rect x="36" y="28" width="28" height="24" rx="5" fill="#F0C64C" stroke="#927317" strokeWidth="4" />
          <path d="M50 48 V18 M50 18 L39 29 M50 18 L61 29"
            fill="none" stroke="#2E8B57" strokeWidth="5" strokeLinecap="round"
          />
        </>
      );

    case "sink":
      return (
        <>
          <path d="M14 37 Q25 31 36 37 Q47 43 58 37 Q69 31 86 37"
            fill="none" stroke="#42BDF5" strokeWidth="7"
          />
          <rect x="36" y="59" width="28" height="24" rx="5" fill="#C96B4A" stroke="#823C27" strokeWidth="4" />
          <path d="M50 47 V69 M50 69 L39 58 M50 69 L61 58"
            fill="none" stroke="#B04444" strokeWidth="5" strokeLinecap="round"
          />
        </>
      );

    case "dissolve":
      return (
        <>
          <path d="M24 26 H76 L69 84 H31Z" fill="#DFF5FF" stroke="#4E94B6" strokeWidth="4" />
          <path d="M29 51 H71 L68 80 H32Z" fill="#72CEF1" />
          <circle cx="42" cy="57" r="4" fill="#FFFFFF" />
          <circle cx="53" cy="64" r="3" fill="#FFFFFF" opacity=".65" />
          <circle cx="60" cy="73" r="2" fill="#FFFFFF" opacity=".35" />
        </>
      );

    case "noDissolve":
      return (
        <>
          <path d="M24 26 H76 L69 84 H31Z" fill="#DFF5FF" stroke="#4E94B6" strokeWidth="4" />
          <path d="M29 51 H71 L68 80 H32Z" fill="#72CEF1" />
          <rect x="42" y="67" width="18" height="10" rx="3" fill="#8C6547" />
        </>
      );

    case "watery":
      return (
        <>
          <path
            d="M50 14 C43 28 30 42 30 58 C30 74 39 86 50 86 C61 86 70 74 70 58 C70 42 57 28 50 14Z"
            fill="#43B8F2"
            stroke="#1C6EA4"
            strokeWidth="4"
          />
          <path
            d="M23 78 Q38 70 50 78 Q62 86 77 78"
            fill="none"
            stroke="#6BD2FF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      );

    case "poured":
      return (
        <>
          <path
            d="M22 26 H54 V49 H29 Q23 49 23 43Z"
            fill="#F2C447"
            stroke="#A77512"
            strokeWidth="4"
          />
          <path
            d="M54 31 Q69 38 78 51"
            fill="none"
            stroke="#A77512"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M65 49 Q74 57 80 68"
            fill="none"
            stroke="#43B8F2"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M74 68 C71 73 71 79 77 82 C83 79 83 73 80 68 C79 66 77 63 77 63 C77 63 75 66 74 68Z"
            fill="#43B8F2"
            stroke="#1C6EA4"
            strokeWidth="3"
          />
        </>
      );

    case "position":
      return (
        <>
          <path d="M50 13 Q73 13 73 36 Q73 54 50 83 Q27 54 27 36 Q27 13 50 13Z"
            fill="#E55D5D" stroke="#963A3A" strokeWidth="4"
          />
          <circle cx="50" cy="36" r="9" fill="#FFFFFF" />
        </>
      );

    case "bell":
      return (
        <>
          <path d="M29 67 H72 Q65 59 65 42 Q65 24 50 24 Q35 24 35 42 Q35 59 29 67Z"
            fill="#F2C44E" stroke="#9B741C" strokeWidth="4"
          />
          <circle cx="50" cy="76" r="6" fill="#A8791D" />
        </>
      );

    case "group":
      return (
        <>
          <circle cx="33" cy="37" r="14" fill="#56A6E5" />
          <circle cx="67" cy="37" r="14" fill="#71C879" />
          <circle cx="50" cy="68" r="14" fill="#F1C64C" />
        </>
      );

    case "yes":
    case "check":
    case "choice":
    default:
      return (
        <>
          <circle cx="50" cy="50" r="34" fill="#E8F7ED" stroke="#47A565" strokeWidth="4" />
          <path d="M31 50 L44 64 L70 36"
            fill="none"
            stroke="#3B9B5A"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
  }
}

function OneAsset({
  kind,
  size,
}: {
  kind: string;
  size: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{
        display: "block",
        overflow: "visible",
      }}
    >
      <Graphic kind={kind} />
    </svg>
  );
}

export default function ScienceEducationalAssetV2({
  assetKey,
  size = 84,
}: {
  assetKey: string;
  size?: number;
}) {
  const keys =
    String(assetKey || "choice")
      .split("+")
      .map(value => value.trim())
      .filter(Boolean)
      .slice(0,2);

  return (
    <div
      style={{
        width: "100%",
        minHeight: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: keys.length > 1 ? 4 : 0,
      }}
    >
      {keys.map(key => (
        <OneAsset
          key={key}
          kind={key}
          size={
            keys.length > 1
              ? Math.round(size * 0.62)
              : size
          }
        />
      ))}
    </div>
  );
}
