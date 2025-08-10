import { CartItem } from '@/modules/cart/domain/entities/CartItem';
import { Product } from '@/modules/products/domain/entities/Product';
import { store } from '@/store'; // Import the store directly
import { AppDispatch } from '@/store';
import {
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart
} from '@/store/slices/cartSlice';

// Get typed dispatch
const dispatch = store.dispatch as AppDispatch;

export const getCartItems = (): CartItem[] => {
  return store.getState().cart.items;
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  dispatch(addItem({
    ...product,
    productId: product.id,
    quantity,

  }));
};

export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  dispatch(updateItemQuantity({ productId, quantity }));
};

export const removeFromCart = (productId: string): void => {
  dispatch(removeItem(productId));
};

export const clearCartItems = (): void => {
  dispatch(clearCart());
};