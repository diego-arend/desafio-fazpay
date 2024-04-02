import { LoginTypeRequest } from "../requests/loginTypeRequests";
import { RegisterTypeRequest } from "../requests/registerTypeRequest";


export type AuthContextType = {
  auth: {
    isAuth: boolean;
    user: RegisterTypeRequest | null;
  };
  login: (data: LoginTypeRequest, errorAction: () => void) => void;
  logout: () => void;
}