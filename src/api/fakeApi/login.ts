import { HttpStatusCode } from "axios";

import { mock } from "./mockApi.ts";
import endpoints from "../../constants/endpoints/endpoints.ts";
import { LoginTypeRequest } from "../../types/requests/loginTypeRequests.ts";
import { RegisterTypeRequest } from "../../types/requests/registerTypeRequest.ts";
import configsConstant from "../../constants/configs/configsConstant.ts";

mock.onPost(endpoints.login).reply((request) => {
  const data = JSON.parse(request.data) as LoginTypeRequest;
  const allStorageUsers = localStorage.getItem(configsConstant.allUsers);
  const users = allStorageUsers ? JSON.parse(allStorageUsers) : [];
  const user = users.find(
    (user: RegisterTypeRequest) =>
      user.email === data.email && user.password === data.password
  );

  if (!user) {
    return [HttpStatusCode.Unauthorized];
  }

  return [
    HttpStatusCode.Ok,
    {
      token: "token",
      user,
    },
  ];
});
