import App from 'components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './theme/theme';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);