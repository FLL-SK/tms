import { userConstants } from '../_constants';

type RegistrationState = {
    registering?: boolean;
};

export function registration(state: RegistrationState = {}, action): RegistrationState {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state;
    }
}
