import { mock } from "./mockApi.ts";

import './login'
import './register'
// import './auth/product-list'
// import './auth/product'
// import './auth/edit-product.ts'

mock.onAny().passThrough()