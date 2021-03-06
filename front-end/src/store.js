import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productSaveReducer ,productDetailsReducer, productDeleteReducer } from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import { userSigninReducer,  userRegisterReducer } from "./reducers/userReducers";
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart: {cartItems, shipping: {}, payment: {}}, userSignin: {userInfo}};

const reducer = combineReducers({
    productList: productListReducer,
    productSave: productSaveReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    cart: cartReducers,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;