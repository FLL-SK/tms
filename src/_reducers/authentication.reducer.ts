import { userConstants } from '../_constants';
import { User } from '../_types/User';

type AuthenticationState = {
    loggedIn?: boolean;
    loggingIn?: boolean;
    user?: User;
};

let storedUser = JSON.parse(localStorage.getItem('user') || '{}');

const initialState: AuthenticationState = storedUser ? { loggedIn: true, user: storedUser } : {};

export function authentication(state = initialState, action): AuthenticationState {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
