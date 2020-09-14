import { eventConstants, eventTeamConstants } from '../_constants';
import { Event } from '../_types/Event';
import { EventTeam } from '../_types/EventTeam';

interface EventState {
    loading?: boolean;
    event?: Event;
    teams: { loading?: boolean; list?: EventTeam[] };
    error?: string;
}

export function event(state: EventState = { loading: true, teams: { loading: true } }, action): EventState {
    switch (action.type) {
        case eventConstants.GETBYID_REQUEST:
            return { ...state, loading: true };
        case eventConstants.GETBYID_SUCCESS:
            return { ...state, loading: false, event: action.event };
        case eventConstants.GETBYID_FAILURE:
            return { ...state, error: action.error, loading: false };
        case eventTeamConstants.GETTEAMS_REQUEST:
            return { ...state, teams: { loading: true } };
        case eventTeamConstants.GETTEAMS_SUCCESS:
            return { ...state, teams: { loading: false, list: action.list } };
        case eventTeamConstants.GETTEAMS_FAILURE:
            return { ...state, teams: { loading: false }, error: action.error };
        default:
            return state;
    }
}
