import { z } from "zod";
import { editSchemaProduct } from "../../schemas/pages/private/editSchemaProduct";


export type EditProductEntityType = z.infer<typeof editSchemaProduct>;