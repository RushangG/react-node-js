import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface UserData {
  name: string;
  email: string;
}

const savedProfile = localStorage.getItem("userProfile");

const initialState: { profile: UserData | null } = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: UserData) => {
    // Simulate an API call to log in the user
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await res.json();
    console.log("Fetched user data:", data); // Log the fetched data for debugging
    return { name: data.name, email: data.email };
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.profile = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(state.profile));
    },

    logoutUser: (state) => {
      console.log("Logging out user:", state.profile); // Log the current profile before logging out
      state.profile = null;
      localStorage.removeItem("userProfile");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        localStorage.setItem("userProfile", JSON.stringify(state.profile));
      })
      .addCase(loginUser.rejected, (state) => {
        state.profile = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.profile = null;
      });
  },
});

export const { login, logoutUser } = userSlice.actions;
export default userSlice.reducer;
