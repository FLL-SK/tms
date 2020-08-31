import axios from 'axios';

export const apiService = {
    setUrl,
};

function setUrl(url: string) {
    axios.defaults.baseURL = url;
    axios.defaults.withCredentials = true;
}
