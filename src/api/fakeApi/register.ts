import { HttpStatusCode } from "axios";
import { mock } from "./mockApi.ts";
import endpoints from "../../constants/endpoints/endpoints.ts";
import { RegisterTypeRequest } from "../../types/requests/registerTypeRequest.ts";
import configsConstant from "../../constants/configs/configsConstant.ts";

mock.onPost(endpoints.register).reply((request) => {
  const oldData = localStorage.getItem(configsConstant.allUsers);
  const data = JSON.parse(request.data) as RegisterTypeRequest;

  if (!oldData) {
    localStorage.setItem(configsConstant.allUsers, JSON.stringify([data]));

    return [HttpStatusCode.Created];
  }

  const parsedData = JSON.parse(oldData) as Array<RegisterTypeRequest>;

  const userAlreadyExists = parsedData.some(
    (user) => user.email === data.email
  );

  if (userAlreadyExists) {
    return [HttpStatusCode.Conflict];
  }

  parsedData.push(data);

  localStorage.setItem(configsConstant.allUsers, JSON.stringify(parsedData));

  return [HttpStatusCode.Created];
});
