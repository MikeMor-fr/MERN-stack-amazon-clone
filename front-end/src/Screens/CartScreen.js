import React, { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import {addToCart, removeFromCart} from "../actions/cartActions";
import { Link } from 'react-router-dom';

function CartScreen(props) {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [])

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? <div>Cart is Empty</div> : cartItems.map(item => 
          <li>

            <div className="cart-image">
              <img src={item.image} alt="item" />
            </div>
            
            <div className="cart-name">

              <Link to={`/product/${item.id}`}>
                {item.name}
              </Link>
              
              <div> Qty :
                <select value={item.qty} onChange={(event) => dispatch(addToCart(item.id, event.target.value))}>

                  {[...Array(item.countInStock).keys()].map(count =>
                    <option value={ count + 1 } key={ count }>{ count + 1 }</option>
                  )}

                </select>
                <button className="button" type="button" onClick={() => removeFromCartHandler(item.id)}>
                  Delete
                </button>
              </div>
            </div>

            <div className="cart-price">
              $ {item.price}
            </div>

          </li>
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((total, item) => { return total + item.qty }, 0)} items ) 
          : $ {cartItems.reduce((total, item) => {return total + item.qty * item.price}, 0)}
        </h3>
        <button onClick={checkOutHandler} className="button primary full-width" disabled={cartItems.length === 0}>Proceed to Checkout</button>
      </div>
    </div>
  )
}

export default CartScreen;