import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

import { AppSettings } from './_helpers/appSettings';

import 'bootstrap/dist/css/bootstrap.min.css';
import './_styles/textsizing.css';
import './_styles/cursor.css';

import './_locales';

// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

AppSettings.loadApiUrl();
AppSettings.loadLanguage();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
