import { z } from "zod";
import { LoginSchemaRequest } from "../../schemas/pages/public/loginSchemaRequest";


export type LoginRequestType = z.infer<typeof LoginSchemaRequest>;