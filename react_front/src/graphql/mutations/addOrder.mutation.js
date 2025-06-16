import { gql } from '@apollo/client';

const ADD_ORDER = gql`
  mutation AddOrder($orders: [OrdersInput!]!) {
    updateOrderQuantity(orders: $orders)
  }
`;

export default ADD_ORDER; 