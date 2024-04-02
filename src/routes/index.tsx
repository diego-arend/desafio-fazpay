import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes/routes";
import { Suspense, lazy } from "react";

// Routes with modular import
const NotFound = lazy(() => import("../pages/public/notFound"));
const Login = lazy(() => import("../pages/public/loginPage"));
const Register = lazy(() => import("../pages/public/registerPage"));

export default function BrowserRouterViews() {
  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<>Carregando...</>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <Suspense fallback={<>Carregando...</>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<>Carregando...</>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}
