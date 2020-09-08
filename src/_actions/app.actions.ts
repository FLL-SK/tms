import { appConstants } from '../_constants';

export const appActions = {
    changeLanguage,
    setApiUrl,
};

function changeLanguage(newLanguage) {
    localStorage.setItem('i18nextLng', newLanguage);
    return { type: appConstants.LANG_CHANGED, language: newLanguage };
}

function setApiUrl(newUrl) {
    localStorage.setItem('apiUrl', newUrl);
    return { type: appConstants.SET_API_URL, newUrl: newUrl };
}
