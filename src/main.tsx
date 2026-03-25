import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../styles.css';

<<<<<<< HEAD
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
=======
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
  </React.StrictMode>,
);
