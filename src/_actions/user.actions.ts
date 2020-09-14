import { userConstants } from '../_constants';
import { userService } from '../_services';
import { eventService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export namespace userActions {
    export function login(username, password) {
        return (dispatch) => {
            dispatch(request({ username }));

            userService.login(username, password).then(
                (user) => {
                    dispatch(success(user));
                    history.push('/');
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function request(user) {
            return { type: userConstants.LOGIN_REQUEST, user };
        }
        function success(user) {
            return { type: userConstants.LOGIN_SUCCESS, user };
        }
        function failure(error) {
            return { type: userConstants.LOGIN_FAILURE, error };
        }
    }

    export function logout() {
        userService.logout();
        return { type: userConstants.LOGOUT };
    }

    export function register(user) {
        return (dispatch) => {
            dispatch(request(user));

            userService.register(user).then(
                (user) => {
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function request(user) {
            return { type: userConstants.REGISTER_REQUEST, user };
        }
        function success(user) {
            return { type: userConstants.REGISTER_SUCCESS, user };
        }
        function failure(error) {
            return { type: userConstants.REGISTER_FAILURE, error };
        }
    }

    export function getById(id?: string) {
        if (!id) return;
        return (dispatch) => {
            dispatch(request());

            userService.getById(id).then(
                (response) => dispatch(success(response)),
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function request() {
            return { type: userConstants.GETBYID_REQUEST };
        }
        function success(user) {
            return { type: userConstants.GETBYID_SUCCESS, user };
        }
        function failure(error) {
            return { type: userConstants.GETBYID_FAILURE, error };
        }
    }

    export function getManagerEvents(userId: string) {
        return (dispatch) => {
            dispatch(request());

            eventService.getManagerEvents(userId).then(
                (response) => dispatch(success(response)),
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function request() {
            return { type: userConstants.GET_EVTSMGR_REQUEST };
        }
        function success(events) {
            return { type: userConstants.GET_EVTSMGR_SUCCESS, events };
        }
        function failure(error) {
            return { type: userConstants.GET_EVTSMGR_FAILURE, error };
        }
    }

    export function getJudgeEvents(userId: string) {
        return (dispatch) => {
            dispatch(request());

            eventService.getJudgeEvents(userId).then(
                (response) => dispatch(success(response)),
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function request() {
            return { type: userConstants.GET_EVTSJUDGE_REQUEST };
        }
        function success(events) {
            return { type: userConstants.GET_EVTSJUDGE_SUCCESS, events };
        }
        function failure(error) {
            return { type: userConstants.GET_EVTSJUDGE_FAILURE, error };
        }
    }

    export function getRefereeEvents(userId: string) {
        return (dispatch) => {
            dispatch(request());

            eventService.getRefereeEvents(userId).then(
                (response) => dispatch(success(response)),
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
        };

        function request() {
            return { type: userConstants.GET_EVTSREFR_REQUEST };
        }
        function success(events) {
            return { type: userConstants.GET_EVTSREFR_SUCCESS, events };
        }
        function failure(error) {
            return { type: userConstants.GET_EVTSREFR_FAILURE, error };
        }
    }
}
