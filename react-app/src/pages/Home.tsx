import Greeting from "./Greeting";
import UserCard from "./UserCard";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>

      <Greeting name={"jay"} age={45} />

      <UserCard userName={"user1"} age={45} status={"active"} />

      <UserCard userName={"user2"} status={"inactive"} />
    </div>
  );
}
