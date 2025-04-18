import type { RootState } from "./store.ts";
import { ThemeMode } from "./app-reducer.ts";

export const selectThemeMode = (state: RootState): ThemeMode =>
  state.themeMode.themeMode;
