import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Redux Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "./reduceres/authReducer";
import bookReducer from "./reduceres/bookReducer"

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    books : bookReducer
  });

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
