export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}
function getUserFromLocalStorage() {
  let dataString = localStorage.getItem("userData");
  let data = dataString ? JSON.parse(dataString) : null;
  if (data === null) {
    data = [];
  }
  return data;
}
function setUserToLocalStorage(userData: User[]) {
  localStorage.setItem("userData", JSON.stringify(userData));
}

export function getUserData() {
  return getUserFromLocalStorage();
}

export function getUserByEmail(email: string) {
  let UserData: User[] = getUserFromLocalStorage() || [];
  return UserData.find((user) => user.email === email);
}

export function addUserData(
  name: string,
  email: string,
  password?: string,
): User {
  let UserData: User[] = getUserFromLocalStorage() || [];
  const newUser = {
    id: new Date().getTime(),
    name,
    email,
    password,
  };
  UserData.push(newUser);
  setUserToLocalStorage(UserData);
  return newUser;
}

export function updateUserData(id: number, name: string, email: string) {
  let UserData: User[] = getUserFromLocalStorage() || [];
  const userIndex = UserData.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    UserData[userIndex].name = name;
    UserData[userIndex].email = email;

    setUserToLocalStorage(UserData);
  } else {
    console.error(`User with id ${id} not found.`);
  }
}

export function deleteUser(id: number) {
  let UserData: User[] = getUserFromLocalStorage() || [];
  const userIndex = UserData.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    if (
      confirm(
        `Are you sure you want to delete user " ${UserData[userIndex].name} " ?`,
      )
    ) {
      UserData.splice(userIndex, 1);
      setUserToLocalStorage(UserData);
    }
  } else {
    console.error(`User with id ${id} not found.`);
  }
}
