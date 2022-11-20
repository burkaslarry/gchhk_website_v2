import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#A714BF",
    },
    secondary: {
      light: "#A714BF",
      main: "#A714BF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    success: {
      main: "#2e7d32",
    },
    themeWhite: {
      main: "#ffffff",
    },
  },
});
