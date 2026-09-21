import { useState, useEffect } from "react";
import { getAdminNames } from "../api/Names";
import "../App.css";

export default function AdminNames() {
  const [nameList, setNameList] = useState();

  async function getNames() {
    let data = await getAdminNames();
    console.log("admin Name : ", data);

    setNameList(data);
  }

  useEffect(() => {
    getNames();
  }, []);

  return (
    <>
      <div>
        <h1> Admin Names</h1>

        <div id="center">
          {nameList === undefined ? (
            "No Name Register yet"
          ) : (
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Course</td>
                  <td>UserName</td>
                  <td>User-Role</td>
                </tr>
              </thead>

              <tbody>
                {nameList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.course}</td>
                    <td>{user.user_id.username}</td>
                    <td>{user.user_id.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
