import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* Styles */
import './index.css';
import GlobalStyle from './GlobalStyle';

/* Router Setup */
import { BrowserRouter } from 'react-router-dom';

/* Redux Setting */
import { Provider } from 'react-redux';
import store from './redux/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store = { store }>
      <BrowserRouter>
        <GlobalStyle/>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);


