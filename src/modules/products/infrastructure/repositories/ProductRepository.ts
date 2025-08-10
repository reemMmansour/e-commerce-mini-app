import { Product } from '@/modules/products/domain/entities/Product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:3001/products');
  return response.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`http://localhost:3001/products/${id}`);
  return response.json();
};
