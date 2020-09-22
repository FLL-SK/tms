import { eventConstants, userConstants } from '../_constants';
import { eventService } from '../_services';
import { alertActions } from '.';

export namespace eventActions {
    export function getById(id?: string) {
        if (!id) return;
        return (dispatch) => {
            dispatch(request());

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

        function request() {
            return { type: eventConstants.GETBYID_REQUEST };
        }
        function success(event) {
            return { type: eventConstants.GETBYID_SUCCESS, event };
        }
        function failure(error) {
            return { type: eventConstants.GETBYID_FAILURE, error };
        }
        function determineUserRoles(event) {
            return { type: userConstants.GET_EVT_ROLES, event };
        }
        function clearUserRoles() {
            return { type: userConstants.CLEAR_EVT_ROLES };
        }
    }
}
