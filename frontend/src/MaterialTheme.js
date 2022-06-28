import { createTheme } from "@mui/material/styles";

export const MaterialTheme = createTheme({
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
});
