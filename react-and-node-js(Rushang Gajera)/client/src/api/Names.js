
import apiClient from "./axiosClient";

export async function getName() {

    let data = await apiClient.get('/name');

    return data;
}