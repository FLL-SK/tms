import { authHeader } from '../_helpers';
import axios, { AxiosRequestConfig } from 'axios';
import { GameRound, JudgingCategory } from '../_types';

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

    export function getScores(eventId: string) {
        return getEvent(eventId, { cmd: 'getScores' });
    }

    export function setFields(eventId: string, fields: any) {
        const requestOptions: AxiosRequestConfig = {
            method: 'post',
            headers: authHeader(),
            data: fields,
        };

        return axios('/event/' + eventId + '/fields', requestOptions).then(handleResponse);
    }

    export function submitGameScore(
        eventId: string,
        eventTeamId: string,
        round: GameRound,
        table: string,
        score: number,
        missions: string,
    ) {
        const requestOptions: AxiosRequestConfig = {
            method: 'post',
            headers: authHeader(),
            data: {
                cmd: 'postGameScore',
                eventTeamId: eventTeamId,
                score: score,
                round: round,
                place: table,
                details: missions,
            },
        };
        return axios('/event/' + eventId, requestOptions).then(handleResponse);
    }

    export function submitJudgingScore(
        eventId: string,
        eventTeamId: string,
        category: JudgingCategory,
        room: string,
        score: number,
        details: string,
    ) {
        const requestOptions: AxiosRequestConfig = {
            method: 'post',
            headers: authHeader(),
            data: {
                cmd: 'postJudgingScore',
                eventTeamId: eventTeamId,
                score: score,
                category: category,
                place: room,
                details: details,
            },
        };

        return axios('/event/' + eventId, requestOptions).then(handleResponse);
    }
}
