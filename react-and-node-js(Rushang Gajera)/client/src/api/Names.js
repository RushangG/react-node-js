
import apiClinet from "./axiosClient";

export async function getName() {

    let data = await apiClinet.get('/name');

    return data;
}