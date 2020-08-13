import React, { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import {addToCart, removeFromCart} from "../actions/cartActions";
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart;


  if (!shipping.address) {
    props.history.push("/shipping")
  } else if (!payment.paymentMethod) {
    props.history.push("/payment")
  }

  const itemsPrice = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {

  }

  const dispatch = useDispatch();

  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  useEffect(() => {
  }, [])

  return (

    <div>

      <CheckoutSteps step1 step2 step3 step4 />

      <div className="placeorder">
        <div className="placeorder-info">

          <div>
            <h3>Shipping</h3>
            <div>{cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postal}, {cart.shipping.country}</div>
          </div>

          <div>
            <h3>Payment</h3>
            <div>Payment Method : {cart.payment.paymentMethod}</div>
          </div>

          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? <div>Cart is Empty</div> : cartItems.map(item => 
              <li key={item.id}>

                <div className="cart-image">
                  <img src={item.image} alt="item" />
                </div>
                
                <div className="cart-name">

                  <Link to={`/product/${item.id}`}>
                    {item.name}
                  </Link>
                  
                  <div> Qty : {item.qty}</div>
                </div>

                <div className="cart-price">
                  $ {item.price}
                </div>

              </li>
              )}
            </ul>
          </div>
        </div>

        <div className="placeorder-action">

          <ul>
            
            <li>
              <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
            </li>

            <li>
              <h3>Order Summary</h3>
            </li>

            <li>
              <div>Items</div>
              <div>{itemsPrice}</div>
            </li>

            <li>
              <div>Shipping</div>
              <div>{shippingPrice}</div>
            </li>

            <li>
              <div>Tax</div>
              <div>{taxPrice}</div>
            </li>

            <li>
              <div>Order Total</div>
              <div>{totalPrice}</div>
            </li>

          </ul>

        </div>

      </div>
    
    </div>
  )
}

export default PlaceOrderScreen;