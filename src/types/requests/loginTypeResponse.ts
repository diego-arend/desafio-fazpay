import { RegisterTypeRequest } from "./registerTypeRequest.ts";

export type LoginTypeResponse = {
  token: string;
  user: RegisterTypeRequest;
};
