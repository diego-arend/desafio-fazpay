import { createContext } from "react";
import { AuthContextType } from "../../types/context/authTypeContext";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
