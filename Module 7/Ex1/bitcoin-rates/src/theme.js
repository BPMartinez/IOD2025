import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#ff4081", // pink
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
  },
});

export default theme;
