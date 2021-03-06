import { combineReducers } from 'redux';

import { auth } from './authentication.reducer';
import { registration } from './registration.reducer';
import { user } from './user.reducer';
import { alert } from './alert.reducer';
import { rgScorer } from './rgscorer.reducer';
import { event } from './event.reducer';

const rootReducer = combineReducers({
    auth,
    registration,
    user,
    alert,
    rgScorer,
    event,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
