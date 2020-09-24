import sk from 'date-fns/locale/sk';
import en from 'date-fns/locale/en-US';

export namespace dateFns {
    export function lang2Locale(lang?: string) {
        switch (lang) {
            case 'en':
                return en;
            case 'sk':
                return sk;
            default:
                return en;
        }
    }
}
