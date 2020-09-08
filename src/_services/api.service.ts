import axios from 'axios';

export namespace apiService {
    export function setUrl(url: string) {
        axios.defaults.baseURL = url;
        axios.defaults.withCredentials = true;
    }
}
