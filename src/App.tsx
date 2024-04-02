import { ThemeProvider } from "@emotion/react";
import LoginPage from "./pages/public/loginPage";
import { CssBaseline, createTheme } from "@mui/material";
// import RegisterPage from "./pages/public/registerPage";

function App() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <LoginPage />
      {/* <RegisterPage /> */}
    </ThemeProvider>
  );
}

export default App;
