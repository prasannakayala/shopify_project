import { combineReducers, applyMiddleware, createStore } from "redux";
import { registerReducer } from "./Reducer/RegisterReducer";
import thunk from "redux-thunk";
import { loginReducer } from "./Reducer/LoginReducer";
import { productReducer } from "./Reducer/MenuReducer";
import { cartReducer } from "./Reducer/CartReducer";

const reducers= combineReducers({
    register: registerReducer, 
    login: loginReducer,
    products: productReducer,
    cartData: cartReducer,
})

// define middleware, including redux thunk for handling asynchronous actions
const middleware= [thunk]

// creating the redux store by combining reducers and applying middleware
export const store= createStore(
    reducers, 
    applyMiddleware(...middleware)
)
  