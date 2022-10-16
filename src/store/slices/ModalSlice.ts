import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
// export type AlertType = 'warning' | 'info' | 'error';

// Define a type for the slice state
interface ModalState {
  //   type?: AlertType;
  confirmModal: {
    message: string;
    show?: boolean;
  };
}

const initialState: ModalState = {
  confirmModal: {
    message: '',
    show: false,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showConfirmModal: (state, action: PayloadAction<ModalState['confirmModal']>) => {
      const { message } = action.payload;
      state.confirmModal.show = true;
      state.confirmModal.message = message;
    },
    closeConfirmModal: (state) => {
      console.log('hello');
      state.confirmModal.message = '';
      state.confirmModal.show = false;
    },
  },
});

export const { showConfirmModal, closeConfirmModal } = modalSlice.actions;

export const modalState = (state: RootState) => state.modal;

export default modalSlice.reducer;
