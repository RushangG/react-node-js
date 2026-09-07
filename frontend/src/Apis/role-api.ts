import apiClient from "./api-client";

export async function getRoles() {
  let roles = await apiClient.get("/roles");



  return roles.data;
}
