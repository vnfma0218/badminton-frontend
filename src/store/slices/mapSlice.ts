import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
interface MapState {
  mapPosition: {
    lat?: number;
    lng?: number;
  };
}

// Define the initial state using that type
const initialState: MapState = {
  mapPosition: {},
};

const mapSlice = createSlice({
  name: 'map',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateMapPosState: (state, { payload }) => {
      state.mapPosition = { ...payload };
    },
  },
});

export const { updateMapPosState } = mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const mapState = (state: RootState) => state.map;

export default mapSlice.reducer;
