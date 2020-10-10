import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppStateProvider from './state';
import AirQualityApp from './components/AirQualityApp';
import 'tachyons';
import './index.css';

ReactDOM.render(
  <AppStateProvider>
    <AirQualityApp />
  </AppStateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
