// src/store/slices/localeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocaleState {
  currentLocale: string;
  direction: 'ltr' | 'rtl';
}

const initialState: LocaleState = {
  currentLocale: 'en',
  direction: 'ltr',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.currentLocale = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;