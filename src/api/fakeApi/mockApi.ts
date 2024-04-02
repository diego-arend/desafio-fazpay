import MockAdapter from "axios-mock-adapter";
import { api } from "..";

export const mock = new MockAdapter(api);
