import { eventConstants, userConstants } from '../_constants';
import { eventService } from '../_services';
import { alertActions } from '.';

import { GameRound, JudgingCategory, JudgingDetails } from '../_types';

export namespace eventActions {
    export function loaded(event) {
        return { type: eventConstants.GETEVENT_SUCCESS, event };
    }

    export function getById(id?: string) {
        if (!id) return;
        return (dispatch) => {
            dispatch(requested());

            eventService.getEvent(id).then(
                (response) => {
                    dispatch(success(response));
                    dispatch(determineUserRoles(response));
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(clearUserRoles());
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function requested() {
            return { type: eventConstants.GETEVENT_REQUESTED };
        }
        function success(event) {
            return loaded(event);
        }
        function failure(error) {
            return { type: eventConstants.GETEVENT_FAILURE, error };
        }
    }

    export function setFields(eventId: string, fields: any) {
        return (dispatch) => {
            dispatch(requested());
            eventService.setFields(eventId, fields).then(
                (response) => {
                    dispatch(success(response));
                    dispatch(determineUserRoles(response));
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(clearUserRoles());
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function requested() {
            return { type: eventConstants.SETFIELDS_REQUESTED };
        }
        function success(event) {
            return loaded(event);
        }
        function failure(error) {
            return { type: eventConstants.SETFIELDS_FAILURE, error };
        }
    }

    export function determineUserRoles(event) {
        return { type: userConstants.GET_EVT_ROLES, event };
    }

    export function clearUserRoles() {
        return { type: userConstants.CLEAR_EVT_ROLES };
    }

    export function getScores(eventId?: string) {
        if (!eventId) return;
        return (dispatch) => {
            dispatch(requested());

            eventService.getScores(eventId).then(
                (response) => {
                    dispatch(success(response));
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function requested() {
            return { type: eventConstants.GET_SCORES_REQUESTED };
        }
        function success(score) {
            return { type: eventConstants.GET_SCORES_SUCCESS, score };
        }
        function failure(error) {
            return { type: eventConstants.GET_SCORES_FAILURE, error };
        }
    }

    export function submitGameScore(
        eventId: string,
        eventTeamId: string,
        round: GameRound,
        table: string,
        score: number,
        missionData: Object,
    ) {
        return (dispatch) => {
            dispatch(requested());

            eventService.submitGameScore(eventId, eventTeamId, round, table, score, JSON.stringify(missionData)).then(
                (teamScore) => {
                    dispatch(success(teamScore));
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function requested() {
            return { type: eventConstants.POST_RGSCORE_REQUESTED };
        }
        function success(score) {
            return { type: eventConstants.POST_RGSCORE_SUCCESS, score };
        }
        function failure(error) {
            return { type: eventConstants.POST_RGSCORE_FAILURE, error };
        }
    }

    export function submitJudgingScore(
        eventId: string,
        eventTeamId: string,
        category: JudgingCategory,
        room: string,
        score: number,
        judgingData: Object,
    ) {
        return (dispatch) => {
            dispatch(requested());

            eventService
                .submitJudgingScore(eventId, eventTeamId, category, room, score, JSON.stringify(judgingData))
                .then(
                    (teamScore) => {
                        dispatch(success(teamScore));
                    },
                    (error) => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    },
                );
        };

        function requested() {
            return { type: eventConstants.POST_JGSCORE_REQUESTED };
        }
        function success(score) {
            return { type: eventConstants.POST_JGSCORE_SUCCESS, score };
        }
        function failure(error) {
            return { type: eventConstants.POST_JGSCORE_FAILURE, error };
        }
    }
}
