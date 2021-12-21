import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IntlProvider } from 'react-intl';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale='en'>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
