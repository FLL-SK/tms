import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './_helpers';
import { App } from './App';

import { AppSettings } from './_helpers/appSettings';

import './_styles/textsizing.css';
import './_styles/cursor.css';
import './_styles/style.css';

import './_locales';

AppSettings.loadApiUrl();
AppSettings.loadLanguage();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
