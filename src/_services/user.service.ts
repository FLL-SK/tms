import { authHeader } from '../_helpers';
import axios, { AxiosRequestConfig } from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
};

function login(username, password) {
    const requestOptions: AxiosRequestConfig = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: { username, password },
    };

    return axios('/api/login', requestOptions)
        .then(handleResponse)
        .then((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions: AxiosRequestConfig = {
        method: 'get',
        params: { cmd: 'getList' },
        withCredentials: true,
    };

    return axios('/profile', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions: AxiosRequestConfig = {
        method: 'GET',
        headers: authHeader(),
    };

    return axios(`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions: AxiosRequestConfig = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return axios(`/users/${id}`, requestOptions).then(handleResponse);
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
