export interface User {
  id: number;
  name: string;
  email: string;
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

export function addUserData(name: string, email: string): User {
  let UserData: User[] = getUserFromLocalStorage() || [];
  const newUser = {
    id: new Date().getTime(),
    name,
    email,
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
