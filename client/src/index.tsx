import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import './normalize.scss';
import {Provider} from 'react-redux';
import {store} from './store/store';
import './style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>

      <HashRouter basename={process.env.REACT_APP_URI}>   
      <React.StrictMode>  
          <App /> 
       </React.StrictMode> 
      </HashRouter>
   
  </Provider>
);
