import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import RouterAcl from "./routes";
import Providers from "./context/auth";

function App() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Providers>
          <RouterAcl />
        </Providers>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
