import { api } from "../index.ts";

import endpoints from "../../constants/endpoints/endpoints.ts";
import { LoginTypeRequest } from "../../types/requests/loginTypeRequests.ts";
import { LoginTypeResponse } from "../../types/requests/loginTypeResponse.ts";

export default async function LoginRequest(login: LoginTypeRequest) {
  console.log("debug LoginRequest", endpoints.login, login);
  return api.post<LoginTypeResponse>(endpoints.login, login);
}
