import 'bootswatch/dist/minty/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importamos el service worker
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar el service worker para convertir la app en PWA
serviceWorkerRegistration.register();

// Opcional: Si quieres medir el rendimiento, mantén esta parte
reportWebVitals();
