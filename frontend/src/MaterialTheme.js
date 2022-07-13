import { createTheme } from "@mui/material/styles";

export const MaterialTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1676ba",
      light: "#1d9df9",
      dark: "#1d9df9",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#37ef97",
    },
    background: {
      default: "#0f1d2b",
      paper: "#f5f6ee",
    },
    text: {
      primary: "#000000",
    },
    onPrimary: "#f5f6ee",
  },
  typography: {
    fontFamily: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "Arial",
      "'Helvetica Neue'",
      "'Noto Sans'",
      "sans-serif",
      "'Apple Color Emoji'",
      "'Segoe UI Emoji'",
      "'Segoe UI Symbol'",
      "'Noto Color Emoji'",
    ].join(","),
  },
  breakpoints: {
    values: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        filledError: {
          backgroundColor: "#991b1b",
        },
      },
    },
  },
});
