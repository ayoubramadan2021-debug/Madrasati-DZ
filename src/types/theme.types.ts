import { themes } from "../theme";

export type ThemeName = keyof typeof themes;
export type AppTheme = (typeof themes)[ThemeName];
