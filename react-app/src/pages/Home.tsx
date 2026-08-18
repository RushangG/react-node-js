import Greeting from "./Greeting";
import UserCard from "./UserCard";
import HOC from "../component/HOC";
import useCustomHook from "../component/useCustomHook";
import { useRevalidator, useLoaderData } from "react-router-dom";

export async function LoadData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonData = await response.json();
    setTimeout(() => {
      console.log("Data fetched in LoadData function:", jsonData);
      return jsonData;
    }, 5000);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function Home() {
  const revalidator = useRevalidator();
  const PostData = useLoaderData();

  console.log(revalidator, "revalidator.state in Home component");

  console.log("PostData in Home component:", typeof PostData, PostData);

  const [data, time] = useCustomHook(
    "https://jsonplaceholder.typicode.com/users",
  );

  console.log("Data in Home component:", typeof data, data);

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h2>Data fetched in {time} ms</h2>
      </div>
      <button
        onClick={() => revalidator.revalidate()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Refresh Data
      </button>

      {revalidator.state === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Data:</h2>
          {data && Object.keys(data).length > 0 ? (
            <ul>
              {Object.entries(data).map(([key, item]: [string, any]) => (
                <li key={key}>
                  <p>ID: {item.id}</p>
                  <p>Name: {item.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </div>
      )}
      <Greeting name={"jay"} age={45} />

      <UserCard userName={"user1"} age={45} status={"active"} />

      <UserCard userName={"user2"} status={"inactive"} />
    </div>
  );
}

export default Home;
