import { useEffect, useState } from "react";
import "./App.css";
import { getName, saveName } from "./api/Names";
import { useAuth } from "./pages/ContextProvider";
export default function Name() {
  const { user } = useAuth();




  const [userList, setUserList] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  async function getNameData() {
    let names = await getName();
    console.log("names", names.data);
    console.log("user context", user);
    setUserList(names.data);

  }

  useEffect(() => {
    getNameData();
  }, []);

  function handleOnChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }



  async function handleSubmit(e) {
    e.preventDefault();

     let data = await saveName(formData);

     getNameData();
    setFormData({
      name: "",
      email: "",
      course: "",
    });
  }

  return (
    <>
      <div>
        <h1>User Form</h1>
        <form onSubmit={handleSubmit} style={{ body: "flex" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            placeholder="Enter Name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Enter Email"
            required
          />

          <label htmlFor="course"> Branch </label>
          <select
            name="course"
            onChange={handleOnChange}
            required
            value={formData.course}
          >
            <option value="">Select</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MBA">MBA</option>
            <option value="M.Tach">M Tech</option>
          </select>

          <div>
            <button type="submit"> Submit </button>
          </div>
        </form>
      </div>

      <div id="center">
        {userList === undefined ? (
          "No Name Register yet"
        ) : (
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Course</td>
              </tr>
            </thead>

            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
