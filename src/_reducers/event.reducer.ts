import { eventConstants, eventTeamConstants } from '../_constants';
import { Event } from '../_types/Event';
import { EventTeam } from '../_types/EventTeam';
import { Score } from '../_types/Score';

interface EventState {
    loading?: boolean;
    event?: Event;
    teams: { loading?: boolean; list?: EventTeam[] };
    ranking: { loading?: boolean; list?: Score[] };
    error?: string;
}

const initialState = { loading: true, teams: { loading: true }, ranking: { loading: true } };

export function event(state: EventState = initialState, action): EventState {
    switch (action.type) {
        case eventConstants.GETEVENT_REQUESTED:
            return { ...state, loading: true };
        case eventConstants.GETEVENT_SUCCESS:
            return { ...state, loading: false, event: action.event };
        case eventConstants.GETEVENT_FAILURE:
            return { ...state, error: action.error, loading: false };
        case eventTeamConstants.GETTEAMS_REQUEST:
            return { ...state, teams: { loading: true } };
        case eventTeamConstants.GETTEAMS_SUCCESS:
            return { ...state, teams: { loading: false, list: action.list } };
        case eventTeamConstants.GETTEAMS_FAILURE:
            return { ...state, teams: { loading: false }, error: action.error };
        case eventConstants.GETRANKING_REQUESTED:
            return { ...state, loading: true };
        case eventConstants.GETRANKING_SUCCESS:
            return { ...state, loading: false, ranking: action.score };
        case eventConstants.GETRANKING_FAILURE:
            return { ...state, error: action.error, loading: false };

        default:
            return state;
    }
}
