import sk from 'date-fns/locale/sk';
import en from 'date-fns/locale/en-US';
import i18next from 'i18next';
import dfns_format from 'date-fns/format';

export namespace dateFns {
    export const lang2Locale = {
        en: en,
        sk: sk,
    };

    export function format(datetime: Date | number, fmt: string) {
        return dfns_format(datetime, fmt, { locale: lang2Locale[i18next.language] });
    }
}
