import { useQuery, gql, useMutation} from '@apollo/client';
import { useEffect } from "react";
import { useLocalStorage } from '../hooks/UseLocalStorage';
import { useNavigate } from 'react-router-dom';

const PRODUCTS_LIST_QUERY = gql`
  query PRODUCTS_LIST{
    allListOfProducts{
        id
        name
        stock
        price
        idCategories
      }
  }
`;



const useProductsViewModel = () => {
  const { loading, error, data } = useQuery(PRODUCTS_LIST_QUERY);
  const navigate = useNavigate()

  const terminateBuy = async (list) =>{
    const listOrder = list.filter(item => item.isAddedToCart)//.map(e => ({idUser : userInfoStorage.id, idProducts: e.id, quantity: e.quantity}))

    navigate('/processing',{ state: { mylist: listOrder } })

  }
 
  const mappingItems = (product) =>{
    return {
      ...product,
      isAddedToCart: false,
      quantity: 0
    }
  }

  const productsList = data
    ? data.allListOfProducts.map(mappingItems)
    : [];


  

  function chunkArray(array, chunkSize) {
      let result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    }
    

  return { productsMatrix: chunkArray(productsList,5), terminateBuy: terminateBuy};
};

export default useProductsViewModel;
