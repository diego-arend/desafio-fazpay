import { HttpStatusCode } from "axios";
import { mock } from "./mockApi.ts";
import { ListProductsTypeResponse } from "../../types/requests/listProductsTypeResponse.ts";
import endpoints from "../../constants/endpoints/endpoints.ts";
import configsConstant from "../../constants/configs/configsConstant.ts";

const productList: ListProductsTypeResponse = Array.from(
  { length: 20 },
  (_, id) => ({
    name: `Product ${id + 1}`,
    price: 100 + id * 10,
    id: id + 1,
  })
);

mock.onGet(endpoints.product_list).reply(() => {
  const storeProducts: ListProductsTypeResponse | null = JSON.parse(
    localStorage.getItem(configsConstant.products_list) ?? "null"
  );

  if (storeProducts) {
    return [HttpStatusCode.Ok, storeProducts];
  }

  localStorage.setItem(
    configsConstant.products_list,
    JSON.stringify(productList)
  );

  return [HttpStatusCode.Ok, productList];
});
