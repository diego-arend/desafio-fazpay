import { z } from "zod";

export const editSchemaProduct = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  price: z.string().refine((value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    return Number(onlyNumbers) > 0;
  }, "Valor não permitido"),
});
