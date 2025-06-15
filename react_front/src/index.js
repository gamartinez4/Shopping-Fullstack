import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const client = new ApolloClient({
  uri: 'https://localhost:4001/graphql', // Esta es la URI del servidor GraphQL
  cache: new InMemoryCache() // Aquí se configura un nuevo caché en memoria
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}> 
    <App />
  </ApolloProvider>,
);