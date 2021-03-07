import App from 'components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './theme/theme';
import { HashRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'context/user';
import { PriceContextProvider } from 'context/price';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <UserContextProvider>
      <PriceContextProvider>
        <Router>
          <App />
        </Router>
      </PriceContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);