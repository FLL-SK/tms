import { appConstants } from '../_constants';

interface AppState {
    apiUrl: string;
    language: string;
}

const initialState: AppState = {
    apiUrl: 'http://localhost:3000',
    language: 'sk',
};

export function app(state = initialState, action) {
    switch (action.type) {
        case appConstants.LANG_CHANGED:
            return { ...state, language: action.language };
        case appConstants.SET_API_URL:
            return { ...state, apiUrl: action.apiUrl };
        default:
            return state;
    }
}
