import { createOrder } from "@/data/repositories/firestoreRepository";
import type { CreateOrderPayload } from "@/types/order";

export const createOrderUseCase = async (
  payload: CreateOrderPayload,
): Promise<string> => {
  return createOrder(payload);
};
