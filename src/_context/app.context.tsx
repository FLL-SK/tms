import React, { createContext, ReactNode } from 'react';
import { User } from '../_types/User';
import { userConstants } from '../_constants';
import { alertConstants } from '../_constants';

import useAsyncReducer from '../_hooks/asyncReducer.hook';

export interface AppState {
    loggedIn?: boolean;
    loggingIn?: boolean;
    user?: User;
    alert?: {
        type?: string;
        message?: string;
    };
}

export const AppContext = createContext<[AppState, React.Dispatch<any>]>([{}, (value) => {}]);

let storedUser = JSON.parse(localStorage.getItem('user') || '{}');

const initialState: AppState = storedUser ? { loggedIn: true, user: storedUser } : { loggedIn: false };

async function reducer(state = initialState, action): Promise<AppState> {
    console.log('app-reducer', action);
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
        case alertConstants.SUCCESS:
            return {
                ...state,
                alert: {
                    type: 'success',
                    message: action.message,
                },
            };
        case alertConstants.ERROR:
            return {
                ...state,
                alert: {
                    type: 'danger',
                    message: action.message,
                },
            };
        case alertConstants.CLEAR:
            return { ...state, alert: {} };
        default:
            return state;
    }
}

export type Props = {
    children: ReactNode;
};

export function AppContextProvider(props: Props) {
    const [appState, appDispatch] = useAsyncReducer(reducer, initialState);

    return <AppContext.Provider value={{ appState, appDispatch }}>{props.children}</AppContext.Provider>;
}
