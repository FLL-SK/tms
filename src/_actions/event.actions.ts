import { eventConstants } from '../_constants';
import { eventService } from '../_services';
import { alertActions } from '.';

export namespace eventActions {
    export function getById(id?: string) {
        if (!id) return;
        return (dispatch) => {
            dispatch(request());

            eventService.getEvent(id).then(
                (response) => dispatch(success(response)),
                (error) => {
                    dispatch(failure(error.toString()));
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
    }
}
