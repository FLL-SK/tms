import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { user } from './user.reducer';
import { alert } from './alert.reducer';
import { rgScorer } from './rgscorer.reducer';
import { app } from './app.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    user,
    alert,
    rgScorer,
    app,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
