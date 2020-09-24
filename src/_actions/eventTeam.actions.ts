import { eventTeamConstants } from '../_constants';
import { eventService } from '../_services';
import { alertActions } from '.';

export namespace eventTeamActions {
    export function getTeams(id?: string) {
        if (!id) return;
        return (dispatch) => {
            dispatch(request());

            eventService.getTeams(id).then(
                (response) => dispatch(success(response)),
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function request() {
            return { type: eventTeamConstants.GETTEAMS_REQUEST };
        }
        function success(data) {
            return { type: eventTeamConstants.GETTEAMS_SUCCESS, list: data };
        }
        function failure(error) {
            return { type: eventTeamConstants.GETTEAMS_FAILURE, error };
        }
    }
}
