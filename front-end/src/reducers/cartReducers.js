import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

function cartReducers(state={ cartItems: [], shipping: {}, payment: {} }, action) {
  switch(action.type) {

    case CART_ADD_ITEM :

      const newItem = action.payload;
      const product = state.cartItems.find(item => item.id === newItem.id);

      if(product) {

          return { cartItems: state.cartItems.map(item => item.id === product.id ? newItem : item)}
      }

      return { cartItems: [...state.cartItems, newItem]};

    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter(item => item.id !== action.payload)};
    
    case CART_SAVE_SHIPPING:
      return {...state, shipping: action.payload};
    
    case CART_SAVE_PAYMENT:
      return {...state, payment: action.payload};

    default:
      return state;
  }
}

export {cartReducers};