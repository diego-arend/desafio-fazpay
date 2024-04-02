import { PropsWithChildren, useCallback, useState } from "react";
import { LoginTypeRequest } from "../../types/requests/loginTypeRequests";
import configsConstant from "../../constants/configs/configsConstant";
import { AuthContextType } from "../../types/context/authTypeContext";
import LoginRequest from "../../api/requests/loginRequest";

export default function AuthProvider({ children }: PropsWithChildren) {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
