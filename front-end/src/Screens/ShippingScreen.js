import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {saveShipping} from "../actions/cartActions";
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveShipping({ address, city, postal, country }));
    props.history.push("/payment")
  }
    
  return (

    <div>

      <CheckoutSteps step1 step2 />

      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">

            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" onChange={(event) => setAddress(event.target.value)} />
            </li>

            <li>
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" onChange={(event) => setCity(event.target.value)} />
            </li>

            <li>
              <label htmlFor="postal">Postal Code</label>
              <input type="text" name="postal" id="postal" onChange={(event) => setPostal(event.target.value)} />
            </li>

            <li>
              <label htmlFor="country">Country</label>
              <input type="text" name="country" id="country" onChange={(event) => setCountry(event.target.value)} />
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


export default ShippingScreen;