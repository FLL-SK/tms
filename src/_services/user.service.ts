import { authHeader } from '../_helpers';
import axios, { AxiosRequestConfig } from 'axios';

export namespace userService {
    export function login(username, password) {
        const requestOptions: AxiosRequestConfig = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: { username, password },
        };

        return axios('/api/login', requestOptions)
            .then(handleResponse)
            .then((result) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(result.user));

                return result.user;
            });
    }

    export function logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }

    export function getById(id: string) {
        const requestOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: authHeader(),
            params: {
                cmd: 'getFields',
            },
        };

        return axios(`/profile/${id}`, requestOptions).then(handleResponse);
    }

    export function register(user) {
        const requestOptions: AxiosRequestConfig = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: user,
        };

        return axios('/users/register', requestOptions).then(handleResponse);
    }

    function update(user) {
        const requestOptions: AxiosRequestConfig = {
            method: 'PUT',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            data: user,
        };

        return axios(`/users/${user.id}`, requestOptions).then(handleResponse);
    }

    function handleResponse(response) {
        switch (response.status) {
            case 200:
                return response.data;
            case 401:
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
                break;
        }
    }
}
