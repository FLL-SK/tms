import { userConstants } from '../_constants';

type UsersState = {
    loading?: boolean;
    items?: Array<{ _id: string; username: string; deleting?: boolean; deleteError?: string }>;
    error?: string;
};

export function users(state: UsersState = {}, action): UsersState {
    switch (action.type) {
        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items:
                    state.items &&
                    state.items.map((user) => (user._id === action.id ? { ...user, deleting: true } : user)),
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items && state.items.filter((user) => user._id !== action.id),
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items:
                    state.items &&
                    state.items.map((user) => {
                        if (user._id === action.id) {
                            // make copy of user without 'deleting:true' property
                            const { deleting, ...userCopy } = user;
                            // return copy of user with 'deleteError:[error]' property
                            return { ...userCopy, deleteError: action.error };
                        }

                        return user;
                    }),
            };
        default:
            return state;
    }
}
