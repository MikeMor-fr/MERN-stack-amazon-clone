import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {saveProduct, listProducts, deleteProduct} from "../actions/productActions";

function ProductsScreen(props) {

  const [id, setId] = useState('')
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [price, setPrice] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const productList = useSelector(state => state.productList)
  const { products, loading, error } = productList;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts())
    return () => {
    };
  }, [successSave, successDelete]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveProduct({ _id: id, name, price, image, brand, category, countInStock, description }));
  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id))
  }

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setDescription(product.description);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }
    
  return (

    <div className="content content-margined">

      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={ () => openModal({}) }>Create Product</button>
      </div>

      { modalVisible &&

      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">

            <li>
              <h2>Create Product</h2>
            </li>

            <li>

              { loadingSave && <div>Loading...</div> }
              { errorSave && <div>{errorSave}</div> }

            </li>          

            <li>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </li>

            <li>
              <label htmlFor="image">Image</label>
              <input type="text" name="image" id="image" value={image} onChange={(event) => setImage(event.target.value)} />
            </li>

            <li>
              <label htmlFor="brand">Brand</label>
              <input type="text" name="brand" id="brand" value={brand} onChange={(event) => setBrand(event.target.value)} />
            </li>

            <li>
              <label htmlFor="category">Category</label>
              <input type="text" name="category" id="category" value={category} onChange={(event) => setCategory(event.target.value)} />
            </li>

            <li>
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
            </li>

            <li>
              <label htmlFor="countInStock">Count In Stock</label>
              <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(event) => setCountInStock(event.target.value)} />
            </li>

            <li>
              <label htmlFor="price">Price</label>
              <input type="text" name="price" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
            </li>

            <li>
              <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
            </li>

            <li>
              <button type="button" onClick={ () => setModalVisible(false) } className="button secondary">Back</button>
            </li>

          </ul>
        </form>
      </div>
      }

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            { products.map(product => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <button className="button" onClick={ () => openModal(product) }>Edit</button>
                    {' '}
                    <button className="button" onClick={ () => deleteHandler(product) }>Delete</button>
                  </td>
                </tr>
              )
            }
            )
            }
          </tbody>
        </table>
      </div>
            
    </div>
  )
}


export default ProductsScreen;