import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {

  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/placeorder")
  }
    
  return (

    <div>

      <CheckoutSteps step1 step2 step3 />

      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">

            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input type="radio" name="payment" id="payment" value="paypal" onChange={(event) => setPaymentMethod(event.target.value)} />
                <label htmlFor="payment">Paypal</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">Continue</button>
            </li>

          </ul>
        </form>
      </div>

    </div>
  )
}


export default PaymentScreen;