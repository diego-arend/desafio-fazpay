import { createContext } from "react";
import { AuthContextType } from "../../types/context/authTypeContext.ts";


export const authContext = createContext<AuthContextType>({} as AuthContextType);