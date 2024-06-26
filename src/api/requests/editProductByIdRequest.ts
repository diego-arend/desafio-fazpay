import { api } from "../../api";
import endpoints from "../../constants/endpoints/endpoints";
import { ProductEntity } from "../../types/entites/productEntity";

export default function EditProductByIdRequest(product: ProductEntity) {
  return api.put(
    endpoints.product_list_ById.replace(":id", product.id.toString()),
    product
  );
}
