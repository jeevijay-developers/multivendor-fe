import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  themeMode: 'system',
  colorPreset: 'default',
  direction: 'ltr',
  openSidebar: false,
  fontFamily: 'figtree',
  currency: 'USD',
  baseCurrency: 'USD',
  rate: 1,
  isInitialized: false
};

// slice
const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
    toggleSidebar(state, action) {
      state.openSidebar = action.payload;
    },
    setDirection(state, action) {
      state.direction = action.payload;
    },
    handleChangeCurrency(state, action) {
      state.currency = action.payload.currency;
      state.baseCurrency = action.payload.baseCurrency;
      state.rate = action.payload.rate;
    },
    setColorPreset: (state, action) => {
      state.colorPreset = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setThemeMode, setDirection, toggleSidebar, handleChangeCurrency, setColorPreset, setFontFamily } =
  slice.actions;

// ----------------------------------------------------------------------
