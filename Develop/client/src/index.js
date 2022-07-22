import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { ApolloProvider, apolloClient, InMemoryCache } from '@apollo/client';

const client = new apolloClient({
  cache: InMemoryCache,
  uri: 'http://localhost:3001/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
