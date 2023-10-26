import { configureStore } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export { store };
