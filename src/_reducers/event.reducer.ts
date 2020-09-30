import { eventConstants, eventTeamConstants } from '../_constants';
import { Event } from '../_types/Event';
import { EventTeam } from '../_types/EventTeam';
import { Score } from '../_types/Score';

interface EventState {
    loading?: boolean;
    event?: Event;
    teams: { loading?: boolean; list?: EventTeam[] };
    scores: { loading?: boolean; list?: Score[] };
    round: string; //N=not started, P1, P2, P3,P-PO, Q, Q-PO, S, S-PO, F, F-PO
    error?: string;
}

const initialState = { loading: true, teams: { loading: true }, scores: { loading: true }, round: 'N' };

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
        case eventConstants.GET_SCORES_REQUESTED:
            return { ...state, scores: { loading: true } };
        case eventConstants.GET_SCORES_SUCCESS:
            return { ...state, loading: false, scores: { loading: false, list: action.score } };
        case eventConstants.GET_SCORES_FAILURE:
            return { ...state, error: action.error, scores: { loading: false } };
        case eventConstants.POST_RGSCORE_SUCCESS:
        // RGSCORE_SUCCESS result is the same as for JGSCORE SUCCES
        case eventConstants.POST_JGSCORE_SUCCESS:
            let l = state.scores.list;
            if (l) {
                let t = l.findIndex((i) => i.eventTeamId === action.score.eventTeamId);
                if (t >= 0) l.splice(t, 1, action.score);
                else l.push(action.score);
            } else l = [action.score];

            return { ...state, scores: { list: l } };

        default:
            return state;
    }
}
