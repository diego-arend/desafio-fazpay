import { api } from "../index.ts";
import endpoints from "../../constants/endpoints/endpoints.ts";
import { ListProductsTypeResponse } from "../../types/requests/listProductsTypeResponse.ts";

export default async function ListProductsRequest() {
  return api.get<ListProductsTypeResponse>(endpoints.product_list)
}
