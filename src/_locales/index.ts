import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import format from 'date-fns/format';

import { dateFns } from './date-fns';

import LanguageDetector from 'i18next-browser-languagedetector';

//---- load translations for the whole application
import sk from './sk.json';
import en from './en.json';

//---- load translations for RobotGame Scorer 2020
import skRG2020 from './rg2020.sk.json';
import enRG2020 from './rg2020.en.json';

//---- JSON containg supported languages and namespaces within languages
//---- first namespace (=translation) is the default one
//---- remaining namespaces has to be adressed through prefix "namespace:"
const translationsJson = {
    en: {
        translation: en,
        rg2020: enRG2020,
    },
    sk: {
        translation: sk,
        rg2020: skRG2020,
    },
};

export type TranslationResource = typeof sk;
export type LanguageKey = keyof TranslationResource;

export type ConvertedToObjectType<T> = {
    [P in keyof T]: T[P] extends string ? string : ConvertedToObjectType<T[P]>;
};
export const txt: ConvertedToObjectType<TranslationResource> = {} as any;

interface Dict<T> {
    [Key: string]: T | {};
}

/*
 * Converts the static JSON file into an object where keys are identical
 * but values are strings concatenated according to syntax.
 * This is helpful when using the JSON file keys and still have the intellisense support
 * along with type-safety
 */
const convertLanguageJsonToObject = (obj: any, dict: Dict<string>, current?: string) => {
    Object.keys(obj).forEach((key: string) => {
        const currentLookupKey = current ? `${current}.${key}` : key;
        if (typeof obj[key] === 'object') {
            dict[key] = {} as Dict<string>;
            convertLanguageJsonToObject(obj[key], dict[key] as Dict<string>, currentLookupKey);
        } else {
            dict[key] = currentLookupKey;
        }
    });
};

export const defaultLanguage = 'en';

export const i18n = i18next
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(
        {
            resources: translationsJson,
            fallbackLng: 'sk',
            debug: process.env.ENV !== 'production' && process.env.ENV !== 'test',

            interpolation: {
                escapeValue: false, // not needed for react as it escapes by
                format: function (value, fmt, lng) {
                    if (value instanceof Date)
                        return format(value, fmt || 'PP', { locale: dateFns.lang2Locale[lng || defaultLanguage] });
                    return value;
                },
            },
            detection: {
                order: ['localStorage', 'sessionStorage'],

                // keys or params to lookup language from
                lookupLocalStorage: 'i18nextLng',
            },
        },
        () => {
            convertLanguageJsonToObject(sk, txt);
        },
    );
