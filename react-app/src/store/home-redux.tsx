import { useAppSelector } from "../store";

export default function HomeRedux() {
  const userProfile = useAppSelector((state) => state.user.profile);
  return (
    <div style={{ border: "2px solid black", padding: "15px", margin: "10px" }}>
      <h3>Component 3: Home Page</h3>
      <p>Hello, {userProfile?.name}! and {userProfile?.email}</p>
      <p>Welcome to the Home Page!</p>
    </div>
  );
}
