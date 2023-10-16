/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";
import reportWebVitals from './reportWebVitals';
import { store } from './store/Store';
import App from './App';
import './data';

const token = localStorage.getItem("TOKEN");
const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000",
  headers: {
    "keep-alive": "true",
    Authorization: token ? `Bearer ${token}` : ""
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: uploadLink
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();