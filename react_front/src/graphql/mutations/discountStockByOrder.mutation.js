import { gql } from '@apollo/client';

const DISCOUNT_STOCK_BY_ORDER = gql`
  mutation DiscountStockByOrder($orders: [OrdersInput!]!) {
    discountStockByOrder(orders: $orders)
  }
`;

export default DISCOUNT_STOCK_BY_ORDER; 