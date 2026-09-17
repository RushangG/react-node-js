
import axios from 'axios';


const BASE_URL = "http://localhost:4000/api";
const apiClinet = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


apiClinet.interceptors.request.use(function
    (config) {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    let accessToken = token.accessToken;

    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
},
    function (errr) {
        return Promise.reject(error);
    }
);

apiClinet.interceptors.response.use(function
    onFulfilled(response) {
    return response;
},
    function onRejected(error) {
        return Promise.reject(error);
    }

)

export default apiClinet;