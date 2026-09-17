import apiClinet from "./axiosClient";

export async function LoginUser(username, password) {
    console.log("formdata", username, password);
    let data = await apiClinet.post(`auth/login`, {
        username, password
    })

    localStorage.setItem("token", JSON.stringify(data.data));

    return data.data;
}