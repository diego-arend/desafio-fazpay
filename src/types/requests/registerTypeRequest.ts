import { z } from "zod";
import { RegisterSchemaRequest } from "../../schemas/pages/public/registerSchemaRequest.ts";

export type RegisterTypeRequest = z.infer<typeof RegisterSchemaRequest>;