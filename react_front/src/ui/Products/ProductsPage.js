import React, { useState } from 'react';
import "./styles.css"
import imagen from "../../assets/item_image.png"
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';  
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { addToCart as addToCartAction, clearCart } from '../../features/cart/cartSlice';
import { clearUser } from '../../features/user/userSlice';




  const ProductItem = ({ product, onAddToCart }) => {
    
    const [quantity, setQuantity] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(product.addedToCart);
    

  
    const handleQuantityChange = (e) => {
      const value = Number(e.target.value);
      if (value > 10) {
        setQuantity(10);
      } else if (value < 0) {
        setQuantity(0);
      } else {
        setQuantity(value);
      }
    };
  
    const addToCart = () => {
      onAddToCart(product, quantity);
      setIsAddedToCart(true);
      product.quantity = quantity
      if(quantity != 0){
        product.isAddedToCart = true
      }
    };

    

    return (
      <div className={`product-card ${isAddedToCart ? 'added-to-cart' : ''}`}>
        <div className="product-image">
          <img src={imagen} alt={product.name} />
        </div>
        <div className="product-content">
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>Item No. {product.id}</p>
            <b><p>{product.stock} in stock</p></b>
          </div>
          <div className="product-order">
            <div className="product-price">€{product.price.toFixed(2)}</div>
            <div className="product-quantity">
              <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 0 || isAddedToCart}>-</button>
              <input type="number" value={quantity} onChange={handleQuantityChange} disabled={isAddedToCart} />
              <button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.stock || quantity === 10 || isAddedToCart}>+</button>
            </div>
            <button onClick={addToCart} disabled={isAddedToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  };
  

  const ProductsPage = ({productsMatrix, terminateBuy}) => {
    console.log(productsMatrix)

    const [index, setIndex] = useState(0);
    const [cart, setCart] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInfoStorage, setUserInfoStorage] = useLocalStorage('user_info', null);
    console.log('token Produces:')
    console.log(userInfoStorage)

  
    const addToCart = (productToAdd, quantity) => {
      if (productToAdd.stock < quantity) {
        alert('Not enough stock available');
        return;
      }
      const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);
      if (existingProductIndex >= 0) {
        const newCart = [...cart];
        newCart[existingProductIndex].quantity += quantity;
        setCart(newCart);
      } else {
        setCart([...cart, { ...productToAdd, quantity }]);
      }
      dispatch(addToCartAction({ product: productToAdd, quantity }));
    };

    const buyItems = () =>{
      terminateBuy(productsMatrix.flat())
    }


    const handlePrevious = () => {
      setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };
  
    const handleNext = () => {
      setIndex((prevIndex) => (prevIndex < productsMatrix.length - 1 ? prevIndex + 1 : prevIndex));
    };

    const closeSession = () => {
      dispatch(clearUser());
      dispatch(clearCart());
      setUserInfoStorage(null)
      navigate(-1)
    }
  
  
    return (
      userInfoStorage?
      <div>
        <div className="header">
          <p className="catalog-title">Hi {userInfoStorage.name} </p>
          <div className="header-options">
           <button onClick={buyItems}>Buy</button>
           <button onClick={closeSession}>
            <FiLogOut size={24} /> 
           </button>
          </div>
        </div>

        <div className="products-list">
          {productsMatrix && productsMatrix.length !== 0?productsMatrix[index].map(product => (
            <ProductItem key={product.id} product={product} onAddToCart={addToCart} />
          )):[]}
        </div>
        <div className="pagination">
        <button onClick={handlePrevious} disabled={index === 0}>Previous</button>
          <button onClick={handleNext} disabled={index === productsMatrix.length - 1}>Next</button>
        </div>
      </div>
    :<p>className="No tiene Token de autorizacion"</p>
  )
  };
  
  export default ProductsPage;