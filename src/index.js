import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './bootstrap.min (1).css'
import Context from './statecontext/Context';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
    <BrowserRouter>

      <App />
    </BrowserRouter>
    </Context>
  
  </React.StrictMode>
);


