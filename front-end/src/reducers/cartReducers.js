import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

function cartReducers(state={cartItems:[]}, action) {
    switch(action.type) {

        case CART_ADD_ITEM :

            const newItem = action.payload;
            const product = state.cartItems.find(item => item.id === newItem.id);

            if(product) {

               return { cartItems: state.cartItems.map(item => item.id === product.id ? newItem : item)}
            }

            return { cartItems: [...state.cartItems, newItem]};

        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(item => item.id !== action.payload)}

        default:
            return state;
    }

}

export {cartReducers};