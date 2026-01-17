import { fetchProductById } from "@/data/repositories/firestoreRepository";
import type { Product } from "@/types/product";

export const getProductByIdUseCase = async (
  productId: string,
): Promise<Product | null> => {
  return fetchProductById(productId);
};
