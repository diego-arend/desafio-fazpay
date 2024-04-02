import { z } from "zod";

export const LoginSchemaRequest = z.object({
  email: z.string()
    .trim()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z.string()
    .trim()
    .min(1, 'Senha é obrigatória')
})