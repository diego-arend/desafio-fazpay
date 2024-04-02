import { api } from "../index.ts";
import { RegisterTypeRequest } from "../../types/requests/registerTypeRequest.ts";
import endpoints from "../../constants/endpoints/endpoints.ts";

export default async function RegisterRequest(data: RegisterTypeRequest) {
  return api.post(endpoints.register, data);
}
