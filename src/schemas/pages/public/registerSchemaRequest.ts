import { z } from "zod";

export const RegisterSchemaRequest = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  lastName: z.string().trim().min(1, "Sobrenome é obrigatório"),
  email: z
    .string()
    .trim()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z.string().trim().min(1, "Senha é obrigatória"),
  document: z.string().length(14, "CPF Inválido"),
});
