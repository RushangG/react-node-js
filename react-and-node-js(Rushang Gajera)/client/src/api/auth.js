import apiClient from "./axiosClient";

export async function LoginUser(username, password) {

  console.log("formdata", username, password);

  const response = await apiClient.post(
    "/auth/login",
    {
      username,
      password,
    }
  );

  return response.data;
}