import { userConstants } from '../_constants';
import { User } from '../_types/User';

interface SimpleEvent {
    _id: string;
    name: string;
    startDate: Date;
}

interface UserState {
    loading?: boolean;
    user?: User;
    error?: string;
    manager: { loading?: boolean; events?: SimpleEvent[] };
    judge: { loading?: boolean; events?: SimpleEvent[] };
    referee: { loading?: boolean; events?: SimpleEvent[] };
}

const _initial = {
    loading: true,
    manager: { events: [] },
    judge: { events: [] },
    referee: { events: [] },
};

export function user(state: UserState = _initial, action): UserState {
    switch (action.type) {
        case userConstants.GETBYID_REQUEST:
            return { ...state, loading: true };
        case userConstants.GETBYID_SUCCESS:
            return { ...state, loading: false, user: action.user };
        case userConstants.GETBYID_FAILURE:
            return { ...state, error: action.error, loading: false };
        case userConstants.GET_EVTSJUDGE_REQUEST:
            return { ...state, judge: { loading: true, events: [] } };
        case userConstants.GET_EVTSREFR_REQUEST:
            return { ...state, referee: { loading: true, events: [] } };
        case userConstants.GET_EVTSMGR_REQUEST:
            return { ...state, manager: { loading: true, events: [] } };
        case userConstants.GET_EVTSJUDGE_SUCCESS:
            return {
                ...state,
                judge: {
                    events:
                        action.events &&
                        action.events.map((i) => {
                            return { ...i, startDate: i.startDate && new Date(i.startDate) };
                        }),
                },
            };
        case userConstants.GET_EVTSREFR_SUCCESS:
            return {
                ...state,
                referee: {
                    events:
                        action.events &&
                        action.events.map((i) => {
                            return { ...i, startDate: i.startDate && new Date(i.startDate) };
                        }),
                },
            };
        case userConstants.GET_EVTSMGR_SUCCESS:
            return {
                ...state,
                manager: {
                    events:
                        action.events &&
                        action.events.map((i) => {
                            return { ...i, startDate: i.startDate && new Date(i.startDate) };
                        }),
                },
            };
        default:
            return state;
    }
}
