import { PropsWithChildren, useCallback, useState } from "react";
import { AuthContextType } from "../../types/context/authTypeContext.ts";
import configsConstant from "../../constants/configs/configsConstant.ts";
import LoginRequest from "../../api/requests/loginRequest.ts";
import { LoginTypeRequest } from "../../types/requests/loginTypeRequests.ts";
import { authContext } from "./authContext.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes/routes.ts";

export default function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthContextType["auth"]>({
    isAuth: !!sessionStorage.getItem(configsConstant.token),
    user: JSON.parse(sessionStorage.getItem(configsConstant.user) ?? "null"),
  });

  const login = useCallback(
    (data: LoginTypeRequest, errorAction: () => void) => {
      LoginRequest(data)
        .then((response) => {
          setAuth({
            isAuth: true,
            user: response.data.user,
          });

          sessionStorage.setItem(configsConstant.token, response.data.token);
          sessionStorage.setItem(
            configsConstant.user,
            JSON.stringify(response.data.user)
          );
          setTimeout(() => {
            navigate(ROUTES.LIST);
          }, 200);
        })
        .catch(errorAction);
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 200);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const logout = useCallback(() => {
    setAuth({
      isAuth: false,
      user: null,
    });
    sessionStorage.removeItem(configsConstant.token);
    sessionStorage.removeItem(configsConstant.user);
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    auth,
    login,
    logout,
  } as AuthContextType;
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
