import { mock } from "./mockApi.ts";

import './login'
import './register'
import './productList'
// import './auth/product'
// import './auth/edit-product.ts'

mock.onAny().passThrough()