import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@axelor/web-client';
import App from './app';

const store = createStore();

export default (props = {}) => (
  <Provider store={store}>
    <App />
  </Provider>
);
