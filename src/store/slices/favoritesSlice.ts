import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  productIds: string[];
}

const initialState: FavoritesState = {
  productIds: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.productIds.includes(action.payload)) {
        state.productIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.productIds = state.productIds.filter(id => id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.productIds.includes(action.payload)) {
        state.productIds = state.productIds.filter(id => id !== action.payload);
      } else {
        state.productIds.push(action.payload);
      }
    }
  }
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
