import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {

  const [qty, setQty] = useState(1);

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
    }
  }, []);

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
  }
    
  return ( loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :

    <div>
      <div className="back-to-results">
        <Link to="/">Back to results</Link>
      </div>

      <div className="details">

        <div className="details-image">
          <img src={product.image} alt="product" />
        </div>

        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price : <b>$ {product.price}</b>
            </li>
            <li>
              Description :
              <div>
                {product.description}
              </div>
            </li>
          </ul>
        </div>

        <div className="details-action">
          <ul>
            <li>
              Price : {product.price}
            </li>
            <li>
              Status : {product.countInStock > 0 ? "In Stock !" : "Out of Stock...coming soon"}
            </li>
            <li>

              Qty : 

              <select value={qty} onChange={(event) => {setQty(event.target.value)}}>

                {[...Array(product.countInStock).keys()].map(count =>

                  <option value={ count + 1 } key={ count }>{ count + 1 }</option>

                  )}

              </select>

            </li>
            <li>
              {product.countInStock > 0 ? <button className="button" onClick={handleAddToCart}>Add to Cart</button> 
                :
                <div className="button-outStock">Out of Stock, coming soon</div>         
              }
              
            </li>
          </ul>
        </div>

      </div>
    </div>
    
    
    
  )
}


export default ProductScreen;