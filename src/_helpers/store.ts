// @ts-nocheck

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../_reducers';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
