import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ROUTES } from "../constants/routes/routes";
import { Suspense, lazy, useEffect } from "react";
import Layout from "../pages/private/app/layout";
import useAuth from "../context/auth/useAuth";

// Routas com importação modular
const NotFound = lazy(() => import("../pages/public/notFound"));
const Login = lazy(() => import("../pages/public/loginPage"));
const Register = lazy(() => import("../pages/public/registerPage"));
const List = lazy(() => import("../pages/private/app/list"));

export default function RouterAcl() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const isAuth = auth.isAuth;

  // Controla o acesso as rotas privadas(autenticadas). Os componentes provados são filhos do componente Outlet
  const AuthRoute = () => {
    return isAuth ? (
      <Layout>
        <Outlet />
      </Layout>
    ) : (
      <Navigate to={ROUTES.LOGIN} replace />
    );
  };

  const RoutesCheck = () => {
    return isAuth ? (
      //  Rotas Privadas
      <Routes>
        <Route element={<AuthRoute />}>
          <Route
            path={ROUTES.LIST}
            element={
              <Suspense fallback={<>Carregando...</>}>
                <List />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    ) : (
      //  Rotas Publicas
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
  };

  // Preveni que o usuário volte paga pagina de login se estiver autenticado
  useEffect(() => {
    if (isAuth && location.pathname === ROUTES.LOGIN) {
      navigate(ROUTES.LIST);
    }
  }, [location, navigate, isAuth]);

  return <RoutesCheck />;
}
