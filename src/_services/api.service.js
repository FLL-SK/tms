import axios from "axios";

export const apiService = {
    setUrl,
};

function setUrl(url) {
    axios.defaults.baseURL = url;
    axios.defaults.withCredentials = true;
}
