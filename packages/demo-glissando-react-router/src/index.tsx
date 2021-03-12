import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <Router>
      <Route exact path="/">
        <Redirect to="/1" />
      </Route>
      <App />
    </Router>,
    rootElement,
  );
}
