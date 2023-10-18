import { configureStore } from "@reduxjs/toolkit";

import api from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
