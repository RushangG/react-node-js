import apiClient from "./api-client";

export async function getUsers() {
  let users = await apiClient.get("/users");
  return users.data;
}

export async function assignRoleToUser(userId: number, roleId: number) {
  const response = await apiClient.post(`users/user-role`, {
    userId,
    roleId,
  });
  if (!response || response.status !== 201) {
    alert("Failed to assign role to user. Please try again.");
  } else {
    alert("Role assigned to user successfully.");
  }
  return response.data;
}
