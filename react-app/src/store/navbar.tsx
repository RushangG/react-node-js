import React from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { logoutUser } from "../store/userSlice";
import userSlice from "../store/userSlice";
export default function Navbar() {
  // Read the global user profile state
  const userProfile = useAppSelector((state) => state.user.profile);
  console.log("userProfile in Navbar:", userProfile);

  const dispatch = useAppDispatch();
  

  return (
    <div
      style={{
        background: "#f0f0f0",
        padding: "15px",
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Component 2: Global Header</h3>

      {userProfile ? (
        <div style={{ textAlign: "right" }}>
          <span>
            User: <strong>{userProfile.name}</strong> ({userProfile.email})
          </span>
          <button
            onClick={() => dispatch(logoutUser())}
            style={{ marginLeft: "15px" }}
          >
            Logout
          </button>
        </div>
      ) : (
        <span>Status: 🔴 Guest User (Logged Out)</span>
      )}
    </div>
  );
}
