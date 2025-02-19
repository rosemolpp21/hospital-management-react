import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appointmentReducer from "./appointmentslice";


const patientId = localStorage.getItem("patient_id") ?? "default_user";
const persistConfig = {
  key: `appointments_${patientId}`,
  storage,
};

const persistedReducer = persistReducer(persistConfig, appointmentReducer);

export const store = configureStore({
  reducer: {
    appointment: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


