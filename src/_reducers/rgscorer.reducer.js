import { rgsConstants } from "../_constants";

const initialState = {
    submitting: false,
    programId: "FLL2020",
    team: {
        name: "test team",
        coachName: "test coach",
        coachPhone: "123/123456",
    },
    score: 0,
    scoreDetails: {},
    error: null,
};

export function rgScorer(state = initialState, action) {
    switch (action.type) {
        case rgsConstants.SUBMIT_REQUEST:
            return { ...state, submitting: true };
        case rgsConstants.SUBMIT_SUCCESS:
            return state;
        case rgsConstants.SUBMIT_FAILURE:
            return { ...state, error: action.error };
        default:
            return state;
    }
}
