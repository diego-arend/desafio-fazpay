import { HttpStatusCode } from "axios";
import { mock } from "./mockApi";
import endpoints from "../../constants/endpoints/endpoints";
import configsConstant from "../../constants/configs/configsConstant";
import { ListProductsTypeResponse } from "../../types/requests/listProductsTypeResponse";

const uri = new RegExp( endpoints.product_list_ById.replace(":id", ".*"));
mock.onPut(uri).reply((request) => {
  const id = request.url?.split("/").pop();
  const data = JSON.parse(request.data);

  const storeProducts: ListProductsTypeResponse | null = JSON.parse(
    localStorage.getItem(configsConstant.products_list) ?? "null"
  );

  const product = storeProducts?.find((product) => product.id === Number(id));

  if (product) {
    Object.assign(product, data);
    const productCollection = storeProducts?.map((product) => {
      if (product.id === Number(id)) {
        return data;
      }
      return product;
    });

    localStorage.setItem(
      configsConstant.products_list,
      JSON.stringify(productCollection)
    );
    return [HttpStatusCode.Accepted];
  }

  return [
    HttpStatusCode.NotFound,
    { message: "Não foi psossível alterar o produto" },
  ];
});
