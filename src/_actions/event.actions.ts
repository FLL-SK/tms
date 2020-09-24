import { eventConstants, userConstants } from '../_constants';
import { eventService } from '../_services';
import { alertActions } from '.';

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

    export function getRanking(id?: string) {
        if (!id) return;
        return (dispatch) => {
            dispatch(requested());

            eventService.getRanking(id).then(
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
            return { type: eventConstants.GETRANKING_REQUESTED };
        }
        function success(score) {
            return { type: eventConstants.GETRANKING_SUCCESS, score };
        }
        function failure(error) {
            return { type: eventConstants.GETRANKING_FAILURE, error };
        }
    }
}
