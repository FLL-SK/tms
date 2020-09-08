import { authHeader } from '../_helpers';
import axios, { AxiosRequestConfig } from 'axios';

export namespace eventService {
    function handleResponse(response) {
        switch (response.status) {
            case 200:
                return response.data;
        }
    }

    export function getManagerEvents(userId: string) {
        const params = { cmd: 'getList', eo: userId };
        return getEvents(params);
    }

    export function getJudgeEvents(userId: string) {
        const params = { cmd: 'getList', judgeId: userId };
        return getEvents(params);
    }

    export function getRefereeEvents(userId: string) {
        const params = { cmd: 'getList', refereeId: userId };
        return getEvents(params);
    }

    export function getEvents(params) {
        const requestOptions: AxiosRequestConfig = {
            method: 'get',
            headers: authHeader(),
            params: params,
        };

        return axios('/event', requestOptions).then(handleResponse);
    }
}
