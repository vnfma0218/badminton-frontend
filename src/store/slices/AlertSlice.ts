import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
export type AlertType = 'warning' | 'info' | 'error';

// Define a type for the slice state
interface AlertState {
  type?: AlertType;
  duration?: number;
  show?: boolean;
  message: string;
}

const initialState: AlertState = {
  show: false,
  message: '',
  type: 'info',
  duration: 1200,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    updateAlertState: (state, action: PayloadAction<AlertState>) => {
      const { duration, type, message } = action.payload;
      state.show = true;
      state.duration = duration ?? 2000;
      state.type = type ?? 'info';
      state.message = message;
    },
    removeAlert: (state) => {
      state.show = false;
    },
  },
});

export const { updateAlertState, removeAlert } = alertSlice.actions;

export const alertState = (state: RootState) => state.alert;

export default alertSlice.reducer;
