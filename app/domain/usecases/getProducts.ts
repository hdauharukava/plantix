import { fetchProducts } from "@/data/repositories/firestoreRepository";
import type { Product } from "@/types/product";

export const getProductsUseCase = async (): Promise<Product[]> => {
  return fetchProducts();
};
