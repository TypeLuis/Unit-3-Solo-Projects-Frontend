import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter >
      <App />
    </BrowserRouter>

=======
import {BrowserRouter} from 'react-router-dom'
import {UserProvider} from './context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
>>>>>>> f0aefa1284972ed0de1d0acceaea3f2239d1d987
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
