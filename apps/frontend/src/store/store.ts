import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the reducer from your slice

// Configure the store
export const store = configureStore({
  reducer: {
    // This is where you will add all your reducers (slices)
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// This is a crucial step for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;