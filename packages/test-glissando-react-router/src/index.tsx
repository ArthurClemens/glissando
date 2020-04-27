import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <div>TEST</div>
    <Route exact path="/">
      <Redirect to="/0" />
    </Route>
    <App />
  </Router>,
  rootElement,
);
