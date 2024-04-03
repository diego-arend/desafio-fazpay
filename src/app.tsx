import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import BrowserRouterViews from "./routes";
import Providers from "./context/provider";

function App() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Providers>
        <BrowserRouter>
          <BrowserRouterViews />
        </BrowserRouter>
      </Providers>
    </ThemeProvider>
  );
}

export default App;
