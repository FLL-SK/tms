import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { rgScorer } from "./rgscorer.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    rgScorer,
});

export default rootReducer;
