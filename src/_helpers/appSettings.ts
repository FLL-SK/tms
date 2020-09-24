import { appConstants } from '../_constants';
import { apiService } from '../_services/api.service';
import i18next from 'i18next';

export namespace AppSettings {
    export function changeLanguage(lang: string): string {
        i18next.changeLanguage(lang).then(() => localStorage.setItem('tms_i18nextLng', lang));
        return lang;
    }

    export function loadLanguage(): string {
        const lang = localStorage.getItem('tms_i18nextLng') || 'en';
        i18next.changeLanguage(lang);
        return lang;
    }

    export function setApiUrl(url: string): string {
        localStorage.setItem('tms_apiUrl', url);
        apiService.setUrl(url);
        return url;
    }

    export function loadApiUrl(): string {
        const url = localStorage.getItem('tms_apiUrl') || 'http://localhost:3000';
        apiService.setUrl(url);
        return url;
    }
}
