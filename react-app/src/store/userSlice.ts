import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface UserData {
  name: string;
  email: string;
}

interface UserState {
  profile: UserData | null;
}

const savedProfile = localStorage.getItem("userProfile")
const initialState: UserState = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.profile = action.payload;
      console.log("Login: ", action.payload);
      console.log("state.profile : ",state.profile);
      localStorage.setItem("userProfile", JSON.stringify(state.profile));
    },

    logoutUser: (state) => {
      state.profile = null;
      localStorage.removeItem("userProfile");
    },
  },
});

export const { login, logoutUser } = userSlice.actions;
export default userSlice.reducer;
 