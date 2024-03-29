import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import App from './App';

import * as serviceWorker from './serviceWorker';

import './index.scss';

const client = new ApolloClient({
  uri: 'https://todo-mongo-graphql-server.herokuapp.com/',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
serviceWorker.register();
