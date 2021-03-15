import App from 'components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './theme/theme';
import { HashRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'context/user';
import { PriceContextProvider } from 'context/price';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import SubgraphProvider from 'api/aavegotchi-subgraph/aavegotchi-subgraph';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <UserContextProvider>
      <PriceContextProvider>
        <SubgraphProvider>
          <Router>
            <App />
          </Router>
        </SubgraphProvider>
      </PriceContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);