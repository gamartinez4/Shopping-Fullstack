import { gql } from '@apollo/client';

const PRODUCTS_LIST_QUERY = gql`
  query PRODUCTS_LIST {
    allListOfProducts {
      id
      name
      stock
      price
      idCategories
    }
  }
`;

export default PRODUCTS_LIST_QUERY; 