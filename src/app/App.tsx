import "./App.css";
import { selectThemeMode } from "@/app/app-slice";
import { ErrorSnackbar, Header } from "@/common/components";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { Routing } from "@/common/routing";
import { getTheme } from "@/common/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { initializeAppTC } from "@/features/auth/model/auth-slice.ts";
import { CircularProgress } from "@mui/material";
import styles from "./App.module.css";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  const theme = getTheme(themeMode);

  useEffect(() => {
    dispatch(initializeAppTC()).finally(() => {
      setIsInitialized(true);
    });
  }, []);

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  );
};
