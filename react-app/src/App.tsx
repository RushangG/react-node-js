import Greeting from "./pages/greeting";
import UserCard from "./pages/UserCard";

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>

      <Greeting name={"jay"} age={45} />

      <UserCard userName={"user1"} age={45} status={"active"} />

      <UserCard userName={"user2"} status={"inactive"} />
    </div>
  );
}
