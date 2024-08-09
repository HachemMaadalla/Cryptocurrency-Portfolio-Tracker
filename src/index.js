import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles
import App from './App'; // Import the App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Target div in index.html
);
