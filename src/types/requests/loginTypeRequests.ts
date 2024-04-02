import { z } from "zod";
import { LoginSchemaRequest } from "../../schemas/pages/public/loginSchemaRequest";


export type LoginTypeRequest = z.infer<typeof LoginSchemaRequest>;