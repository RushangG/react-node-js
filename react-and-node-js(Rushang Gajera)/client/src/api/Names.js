
import apiClient from "./axiosClient";

export async function getName() {

    let data = await apiClient.get('/name');

    return data;
}


export async function saveName(nameData) {
    let data = await apiClient.post('/name', nameData);
    return data;
}


export async function getAdminNames() {
    let res = await apiClient.get('/name/admin');

    return res.data;
}