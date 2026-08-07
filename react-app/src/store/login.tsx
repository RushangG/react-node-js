import { useAppDispatch } from "../store";
import { login } from "../store/userSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const handleMockLogin = () => {
    // Create the data package
    let mockUserData = {
      name: "Alex ERP Dev",
      email: "alex@company.com",
    };

    // Dispatch the data to the global store
    dispatch(login(mockUserData));
  };

  return (
    <div style={{ border: "2px solid black", padding: "15px", margin: "10px" }}>
      <h3>Component 1: Login Dashboard</h3>
      <button className="button" onClick={handleMockLogin}>
        Simulate Successful Login
      </button>
    </div>
  );
}
