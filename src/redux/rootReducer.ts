import { combineReducers } from "@reduxjs/toolkit";

import api from "./api";
import userReducer from "./userSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
