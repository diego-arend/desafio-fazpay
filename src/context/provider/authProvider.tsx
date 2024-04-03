import { PropsWithChildren, useCallback, useState } from "react";
import { AuthContextType } from "../../types/context/authTypeContext.ts";
import configsConstant from "../../constants/configs/configsConstant.ts";
import LoginRequest from "../../api/requests/loginRequest.ts";
import { LoginTypeRequest } from "../../types/requests/loginTypeRequests.ts";
import { authContext } from "../auth/authContext.ts";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<AuthContextType["auth"]>({
    isAuth: !!sessionStorage.getItem(configsConstant.token),
    user: JSON.parse(sessionStorage.getItem(configsConstant.user) ?? "null"),
  });

  const login = useCallback(
    (data: LoginTypeRequest, errorAction: () => void) => {
      console.log("debug login", data);
      LoginRequest(data)
        .then((response) => {
          console.log("debug response provider login", response);
          setAuth({
            isAuth: true,
            user: response.data.user,
          });

          sessionStorage.setItem(configsConstant.token, response.data.token);
          sessionStorage.setItem(
            configsConstant.user,
            JSON.stringify(response.data.user)
          );
        })
        .catch(errorAction);
    },
    []
  );

  const logout = useCallback(() => {
    setAuth({
      isAuth: false,
      user: null,
    });
    sessionStorage.removeItem(configsConstant.token);
    sessionStorage.removeItem(configsConstant.user);
  }, []);

  const value = {
    auth,
    login,
    logout,
  } as AuthContextType;
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
