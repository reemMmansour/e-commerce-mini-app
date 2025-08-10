// services/favorites.ts
import { store } from '@/store';
import { addFavorite, removeFavorite, toggleFavorite } from '@/store/slices/favoritesSlice';

// Get favorites
export const getFavorites = (): string[] => {
  return store.getState().favorites.productIds;
};

// Add to favorites - CORRECTED
export const addToFavorites = (productId: string): void => {
  store.dispatch(addFavorite(productId)); // Note: we're calling the action creator
};

// Remove from favorites - CORRECTED
export const removeFromFavorites = (productId: string): void => {
  store.dispatch(removeFavorite(productId)); // Note: we're calling the action creator
};

// Toggle favorite - CORRECTED
export const toggleFavoriteStatus = (productId: string): void => {
  store.dispatch(toggleFavorite(productId)); // Note: we're calling the action creator
};