import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
interface MapState {
  userPosition: {
    lat?: number;
    lng?: number;
  };
  mapPosition: {
    lat?: number;
    lng?: number;
  };
  reset: boolean;
}

// Define the initial state using that type
const initialState: MapState = {
  userPosition: {
    // lat:,
    // lng: ,
  },
  mapPosition: {},
  reset: false,
};

const mapSlice = createSlice({
  name: 'map',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUserPosState: (state, { payload }) => {
      state.userPosition = { ...payload };
    },
    updateMapPosState: (state, { payload }) => {
      state.mapPosition = { ...payload };
    },
    resetUserPosState: (state) => {
      state.reset = true;
    },
    unsetUserPosState: (state) => {
      state.reset = false;
    },
  },
});

export const { updateUserPosState, updateMapPosState, resetUserPosState, unsetUserPosState } =
  mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const mapState = (state: RootState) => state.map;

export default mapSlice.reducer;
