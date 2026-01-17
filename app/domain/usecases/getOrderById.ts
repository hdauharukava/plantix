import { fetchOrderById } from "@/data/repositories/firestoreRepository";
import type { OrderRecord } from "@/types/order";

export const getOrderByIdUseCase = async (
  orderId: string,
): Promise<OrderRecord | null> => {
  return fetchOrderById(orderId);
};
