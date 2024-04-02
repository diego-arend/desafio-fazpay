import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import BrowserRouterViews from "./routes";


function App() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <BrowserRouterViews />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
