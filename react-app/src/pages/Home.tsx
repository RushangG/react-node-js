import Greeting from "./Greeting";
import UserCard from "./UserCard";
import HOC from "../component/HOC";
import useCustomHook from "../component/UseCustomHook";
function Home() {
  const [data, time] = useCustomHook(
    "https://jsonplaceholder.typicode.com/todos",
  );

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h2>Data fetched in {time} ms</h2>
        <p>
          {data ? (
            <pre> {JSON.stringify(data, null, 2)} </pre>
          ) : (
            "Loading data..."
          )}
        </p>
      </div>
      <Greeting name={"jay"} age={45} />

      <UserCard userName={"user1"} age={45} status={"active"} />

      <UserCard userName={"user2"} status={"inactive"} />
    </div>
  );
}

export default HOC(Home);
