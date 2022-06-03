import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* */
// import { Provider } from 'react-redux';
// import store from './redux/configStore'

/* Styles */
import './index.css';
import GlobalStyle from './GlobalStyle';

/* Router Setup */
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <GlobalStyle/>
      <App />
    </BrowserRouter>
  </>
);


