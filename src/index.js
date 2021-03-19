import App from 'components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './theme/theme';
import { HashRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'context/user';
import { PriceContextProvider } from 'context/price';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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