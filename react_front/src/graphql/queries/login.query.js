import { gql } from '@apollo/client';

const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      idUser
    }
  }
`;

export default LOGIN_QUERY; 