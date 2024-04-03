import { mock } from "./mockApi.ts";

import "./login";
import "./register";
import "./productList";
import "./productById";
import "./editProductById"

mock.onAny().passThrough();
