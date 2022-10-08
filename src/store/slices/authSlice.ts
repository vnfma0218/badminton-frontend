import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
interface AuthState {
  accessToken: string;
  userId: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: '',
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateAuthState: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
    },
  },
});

export const { updateAuthState } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;