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
        const params = { cmd: 'getList', manager: userId };
        return getEvents(params);
    }

    export function getJudgeEvents(userId: string) {
        const params = { cmd: 'getList', judge: userId };
        return getEvents(params);
    }

    export function getRefereeEvents(userId: string) {
        const params = { cmd: 'getList', referee: userId };
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

    export function getEvent(eventId: string, params?) {
        const requestOptions: AxiosRequestConfig = {
            method: 'get',
            headers: authHeader(),
            params: params,
        };

        return axios('/event/' + eventId, requestOptions).then(handleResponse);
    }

    export function getTeams(eventId: string) {
        return getEvent(eventId, { cmd: 'getTeams' });
    }

    export function getRanking(eventId: string) {
        return getEvent(eventId, { cmd: 'getRanking' });
    }

    export function setFields(eventId: string, fields: any) {
        const requestOptions: AxiosRequestConfig = {
            method: 'post',
            headers: authHeader(),
            data: fields,
        };

        return axios('/event/' + eventId + '/fields', requestOptions).then(handleResponse);
    }

    export function submitScore(
        cmd: string,
        eventId: string,
        eventTeamId: string,
        type: string,
        score: number,
        details: string,
    ) {
        const requestOptions: AxiosRequestConfig = {
            method: 'post',
            headers: authHeader(),
            data: { cmd: cmd, eventTeamId: eventTeamId, score: score, type: type, details: details },
        };

        return axios('/event/' + eventId, requestOptions).then(handleResponse);
    }

    export function submitGameScore(
        eventId: string,
        eventTeamId: string,
        type: string,
        score: number,
        missions: string,
    ) {
        return submitScore('postGameScore', eventId, eventTeamId, type, score, missions);
    }

    export function submitJudgingScore(
        eventId: string,
        eventTeamId: string,
        type: string,
        score: number,
        details: string,
    ) {
        return submitScore('postJudgingScore', eventId, eventTeamId, type, score, details);
    }
}
