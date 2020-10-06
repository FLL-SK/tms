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

    export function configureApiUrl(): string {
        const url = process.env.API_URL || 'notset';
        apiService.setUrl(url);
        console.log('APIURL', url);
        return url;
    }
}
