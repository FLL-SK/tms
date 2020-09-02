import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

import { apiService } from './_services';

import { AppContextProvider } from './_context/app.context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './_styles/textsizing.css';
import './_styles/cursor.css';

import './_locales';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
localStorage.setItem('user', JSON.stringify({ user: { username: 'test' } }));

apiService.setUrl('http://localhost:3000');

render(
    <Provider store={store}>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </Provider>,
    document.getElementById('app'),
);
