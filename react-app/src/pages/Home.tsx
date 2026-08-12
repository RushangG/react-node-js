import Greeting from "./Greeting";
import UserCard from "./UserCard";
import HOC from "../component/HOC";
import useCustomHook from "../component/useCustomHook";
function Home() {
  const [data, time] = useCustomHook(
    "https://jsonplaceholder.typicode.com/todos",
  );

  console.log("Data in Home component:", typeof data, data);

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h2>Data fetched in {time} ms</h2>
      </div>
      <div>
        <h2>Data:</h2>
        {data && Object.keys(data).length > 0 ? (
          <ul>
            {Object.entries(data).map(([key, item]: [string, any]) => (
              <li key={key}>
                <p>ID: {item.id}</p>
                <p>Title: {item.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      <Greeting name={"jay"} age={45} />

      <UserCard userName={"user1"} age={45} status={"active"} />

      <UserCard userName={"user2"} status={"inactive"} />
    </div>
  );
}

export default HOC(Home);
