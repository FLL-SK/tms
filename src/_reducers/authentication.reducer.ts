import { userConstants } from '../_constants';
import { User } from '../_types/User';

type AuthenticationState = {
    loggedIn?: boolean;
    loggingIn?: boolean;
    user?: User;
    sysRoles: {
        isAdmin?: boolean;
        isSuperAdmin?: boolean;
    };
    eventRoles: {
        isEventManager?: boolean;
        isEventJudge?: boolean;
        isEventReferee?: boolean;
    };
};

let storedUser = JSON.parse(localStorage.getItem('user') || '{}');

console.log('Found stored user', storedUser);

const initialState: AuthenticationState = { sysRoles: {}, eventRoles: {} };

export function auth(
    state = storedUser ? { ...initialState, loggedIn: true, user: storedUser } : initialState,
    action,
): AuthenticationState {
    switch (action.type) {
        case userConstants.GET_EVT_ROLES:
            return {
                ...state,
                eventRoles: {
                    isEventManager: action.event.managers.some((i) => i._id === state.user._id),
                    isEventJudge: action.event.judges.some((i) => i._id === state.user._id),
                    isEventReferee: action.event.referees.some((i) => i._id === state.user._id),
                },
            };
        case userConstants.CLEAR_EVT_ROLES:
            return {
                ...state,
                eventRoles: {},
            };
        case userConstants.LOGIN_REQUEST:
            return { ...initialState, loggingIn: true, user: action.user };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...initialState,
                loggedIn: true,
                user: action.user,
                sysRoles: {
                    isAdmin: action.user.isAdmin || action.user.isSuperAdmin,
                    isSuperAdmin: action.user.isSuperAdmin,
                },
            };
        case userConstants.LOGIN_FAILURE:
            return initialState;
        case userConstants.LOGOUT:
            return initialState;
        default:
            return state;
    }
}
