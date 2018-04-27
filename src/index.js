import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from '@axelor/web-client';
import getADKConnector from '@axelor/web-client-adk-module';
import App from './desktop';
import HelloWorld from './mobile/helloWorld';
import NavigationPage from './mobile/navigationPage';
import Form from './mobile/Form';
// import 'onsenui/css/onsenui.css';
// import 'onsenui/css/onsen-css-components.css';

const ADKConnector = getADKConnector({});

configure(
  // connector
  ADKConnector,
  // connect configuration
  {
    offline: true,
  },
);

ReactDOM.render(
  // <App />,
  // <HelloWorld />,
  <NavigationPage />,
  // <Form />,
document.getElementById('root'));
