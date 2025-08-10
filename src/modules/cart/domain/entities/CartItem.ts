import { Product } from '@/modules/products/domain/entities/Product';

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product; 
}
