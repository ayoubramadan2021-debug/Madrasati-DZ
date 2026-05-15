const themes = {
  light: {
    name: "Duolingo Light",
    bg: "#ffffff",
    surface: "#ffffff",
    surface2: "#f7f7f7",
    border: "#e5e5e5",
    text: "#3c3c3c",
    muted: "#777777",

    primary: "#58cc02",
    secondary: "#46a302",
    accent: "#ddf4ff",

    navBg: "#ffffff",
    headerBg: "#ffffff",
    headerText: "#3c3c3c",

    blue: "#1cb0f6",
    green: "#58cc02",
    red: "#ff4b4b",
    yellow: "#ffc800",
    purple: "#ce82ff",
    pink: "#ff86d0",

    icon: "#1cb0f6",
    buttonText: "#ffffff",

    cardShadow: "0 4px 0 #e5e5e5",
  },

  blue: {
    name: "Duolingo Night",
    bg: "#0b1220",
    surface: "#111827",
    surface2: "#1f2937",
    border: "#374151",
    text: "#ffffff",
    muted: "#9ca3af",

    primary: "#58cc02",
    secondary: "#46a302",
    accent: "#1e3a5f",

    navBg: "#111827",
    headerBg: "#0b1220",
    headerText: "#ffffff",

    blue: "#1cb0f6",
    green: "#58cc02",
    red: "#ff4b4b",
    yellow: "#ffc800",
    purple: "#ce82ff",
    pink: "#ff86d0",

    icon: "#ffffff",
    buttonText: "#ffffff",

    cardShadow: "0 4px 0 #000000",
  },

  dark: {
    name: "Dark",
    bg: "#0b1220",
    surface: "#111827",
    surface2: "#1f2937",
    border: "#374151",
    text: "#ffffff",
    muted: "#9ca3af",
    primary: "#58cc02",
    secondary: "#46a302",
    accent: "#1f2937",
    navBg: "#111827",
    headerBg: "#0b1220",
    headerText: "#ffffff",
    icon: "#ffffff",
    buttonText: "#ffffff",
    cardShadow: "0 4px 0 #000000",
  },
};

const common = {
  radius: {
    small: "12px",
    medium: "18px",
    large: "24px",
    full: "999px",
  },
  shadow: {
    card: "0 4px 0 #e5e5e5",
    hero: "0 6px 0 rgba(0,0,0,0.12)",
    button: "0 5px 0 rgba(0,0,0,0.18)",
  },
};

export { themes, common };
