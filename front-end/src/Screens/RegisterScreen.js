import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {register} from "../actions/userActions";

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {
    };
  }, [userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(register(name, email, password));
  }
    
  return (

    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">

          <li>
            <h2>Create Account</h2>
          </li>

          <li>
            { loading && <div>Loading...</div> }
            { error && <div>{error}</div> }
          </li>

          <li>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={(event) => setName(event.target.value)} />
          </li>      

          <li>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
          </li>

          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(event) => setPassword(event.target.value)} />
          </li>

          <li>
            <label htmlFor="rePassword">Password Again</label>
            <input type="Password" id="rePassword" name="rePassword" onChange={(event) => setRePassword(event.target.value)} />
          </li>

          <li>
            <button type="submit" className="button primary">Register</button>
          </li>

          <li>Already have an account ?</li>
          <li>
            <Link to="/signin" className="button secondary text-center">Signin</Link>
          </li>

        </ul>
      </form>
    </div>

  )
}


export default RegisterScreen;