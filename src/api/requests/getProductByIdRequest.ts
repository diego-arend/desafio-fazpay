import { api } from "../index.ts";
import endpoints from "../../constants/endpoints/endpoints.ts";

export default async function GetProductByIdRequest(id: string) {
  return api.get(endpoints.product_list_ById.replace(":id", id));
}
