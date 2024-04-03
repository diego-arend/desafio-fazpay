import { api } from "../index.ts";
import endpoints from "../../constants/endpoints/endpoints.ts";

export default async function GetProductByIdRequest(id: string) {
  console.log("debug get request");
  return api.get(endpoints.product_list_ById.replace(":id", id));
}
