import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer autoClose={5000}/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
