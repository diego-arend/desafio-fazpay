import { HttpStatusCode } from "axios";
import endpoints from "../../constants/endpoints/endpoints.ts";
import { mock } from "./mockApi.ts";
import { ListProductsTypeResponse } from "../../types/requests/listProductsTypeResponse.ts";
import configsConstant from "../../constants/configs/configsConstant.ts";

const uri = new RegExp(endpoints.product_list_ById.replace(":id", ".*"));
mock.onGet(uri).reply((request) => {
  console.log("[GET]", request);
  const id = request.url?.split("/").pop();

  const storageProducts: ListProductsTypeResponse | null = JSON.parse(
    localStorage.getItem(configsConstant.products_list) ?? "null"
  );

  const product = storageProducts?.find((product) => product.id === Number(id));

  if (product) {
    return [HttpStatusCode.Ok, product];
  }

  return [HttpStatusCode.NotFound, { message: "Produto não encontrado" }];
});
