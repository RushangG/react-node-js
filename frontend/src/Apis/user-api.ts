import apiClient from "./api-client";

export async function getUsers() {
  let users = await apiClient.get("/users");
  return users.data;
}

export async function getById(userId: number) {
  const res = await apiClient.get(`/users/${userId}`);
  return res.data;
}

export async function deleteUser(userId: number) {
  const res = await apiClient.delete(`/users/${userId}`);
  return res.data;
}

export async function updateUser(userId: number, userData: any) {
  const res = await apiClient.put(`/users/${userId}`, userData);
  return res.data;
}

export async function assignRoleToUser(userId: number, roleId: number) {
  const response = await apiClient.post(`users/user-role`, {
    userId,
    roleId,
  });
  if (!response || response.status === 409) {
    alert("Already assigned role to user.");
  } else {
    alert("Role assigned to user successfully.");
  }
  return response.data;
}

export async function deleteRoleFromUser(userId: number, roleId: number) {
  const response = await apiClient.post(`users/user-role-delete`, {
    userId,
    roleId,
  });
  if (!response || response.status !== 201) {
    alert("Failed to delete role from user. Please try again.");
  }
  return response.data;
}
