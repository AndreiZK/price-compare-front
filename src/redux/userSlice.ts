import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
  },
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuth = true;
    },
    removeUser: (state) => {
      state.user = initialState.user;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
