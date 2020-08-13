import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { useSelector } from "react-redux";

import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import CartScreen from "./Screens/CartScreen";
import SigninScreen from "./Screens/SigninScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";


function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;


  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">amazonia</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/signin">Sign In</Link> }
          </div>
        </header>

        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/products" component={ProductsScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </div>
          
        </main>

        <footer className="footer">All rights reserved</footer>
      </div>
    </Router>
    
  );
}

export default App;
