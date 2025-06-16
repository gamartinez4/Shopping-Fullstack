import { useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import './styles.css';
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';  
import { useLocalStorage } from "../../hooks/UseLocalStorage";
import imagen from "../../assets/item_image.png"
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { clearUser } from '../../features/user/userSlice';
import ADD_ORDER from '../../graphql/mutations/addOrder.mutation';
import DISCOUNT_STOCK_BY_ORDER from '../../graphql/mutations/discountStockByOrder.mutation';

const OrderSummary = ({ list }) => {
  const [updateStock, { dataMut, loadingMut, errorJMut }] = useMutation(DISCOUNT_STOCK_BY_ORDER);
  const [addOrder, { dataMut2, loadingMut2, errorJMut2 }] = useMutation(ADD_ORDER);
 const [userInfoStorage, setUserInfoStorage] = useLocalStorage('user_info', null);
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const executeMutations = async () =>{
    const listConverted = list.map(e => ({idUser : userInfoStorage.id, idProducts: e.id, quantity: e.quantity}))
    await addOrder({variables: {orders: listConverted}})
    await updateStock({variables: {orders: listConverted}})
    dispatch(clearCart());
    navigate('/final')
  }

  return (
    <div className='miDivEspecial'>
      <div style={{marginLeft : 30}}>
        <div className='title'>Shopping card details</div>
        <div><b>Items: </b>{list.reduce((acc, item) => acc + item['quantity'], 0)} units</div>
        <div><b>Total: </b> {`€ ${list.reduce((acc, item) => acc + item['quantity']*item['price'], 0).toFixed(2)}`}</div>
        <button onClick={executeMutations}>Process Order</button>
      </div>
    </div>
  );
};

const ProductItemProcessing = ({ product}) => {
  
  
  return (
    <div className='row'>
      <div >
        <img src={imagen} alt={product.name} height={80}/>
      </div>
      <div >
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>Item No. {product.id}</p>
          <b><p>{product.stock} in stock</p></b>
        </div>
      </div>
    </div>
  );
};

const ProcessingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfoStorage, setUserInfoStorage] = useLocalStorage('user_info', null);
  const dispatch = useDispatch();

  const selectedItemsList = location.state.mylist;
  console.log(selectedItemsList)

  const closeSession = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    navigate('/')
    setUserInfoStorage(null)
  }

  return (
    userInfoStorage?
    <div>
    <div className="header">
        <p className="catalog-title">Hi {userInfoStorage.name} </p>
        <div className="header-options">
         <button onClick={closeSession}>
          <FiLogOut size={24} /> 
         </button>
        </div>
      </div>
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ width: '75%' }} >
        <div className='title'  My Shopping cart> My Shopping car </div>
        <div className='row'>
          <div className="products">
            <b>Products</b>
            {selectedItemsList.map((product) => (
            <div className='fixed-size-div' key={product.id}>
              <ProductItemProcessing
                product={product}
                  />
                </div>
              ))}

          </div>
          <div className="price">
            <b>Price</b>
            {selectedItemsList .map((product) => (
            <div className='fixed-size-div' key={product.id}>€{product.price}</div>
          ))}
        
          </div>
          <div className="quantity">
            <b>Quantity</b>
            {selectedItemsList.map((product) => (
            <div className='fixed-size-div' key={product.id}>{product.quantity}</div>
          ))}
          </div>
          <div className="total">
            <b>Total</b>
            {selectedItemsList.map((product) => (
            <div  className='fixed-size-div'  key={product.id}>€{(product.price * product.quantity).toFixed(2)}</div>
          ))}
          </div>
        </div>
      </div>
      
      <OrderSummary list={selectedItemsList} />
    </div>
    </div>:<p>className="No tiene Token de autorizacion"</p>
  );
};

export default ProcessingPage;