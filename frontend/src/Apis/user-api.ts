import apiClient from "./api-client";

export async function getUsers() {
  let users = await apiClient.get("/users");
  return users.data;
}
