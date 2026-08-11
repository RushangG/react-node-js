import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  email: string;
}

const savedProfile = localStorage.getItem("userProfile");

const initialState: { profile: UserData | null } = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.profile = action.payload;
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
