import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import Providers from "../context/auth";

// Provider de test que retorna todos os Providers gerais da aplicação, incluindo a memorização de rotas através do "wrapper: BrowserRouter"
const GeneralRenderContexts = (children: ReactNode, { route = "/" } = {}) => {
  const defaultTheme = createTheme();
  window.history.pushState({}, "Test page", route);

  const ui = (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Providers>{children}</Providers>
    </ThemeProvider>
  );

  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

export default GeneralRenderContexts;
