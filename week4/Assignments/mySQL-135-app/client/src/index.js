import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'reac-router-dom'
import UserProvider from '../context/UserProvider';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
  <UserProvider>
    <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
