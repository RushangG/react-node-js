import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  email: string;
}

interface UserState {
  profile: UserData | null;
}

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.profile = action.payload;
    },

    logoutUser: (state) => {
      state.profile = null;
    },
  },
});

export const { login, logoutUser } = userSlice.actions;
export default userSlice.reducer;
