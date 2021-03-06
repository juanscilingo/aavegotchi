import App from 'components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './theme/theme';
import { HashRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'context/user';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);