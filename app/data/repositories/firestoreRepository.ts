import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useFirebase } from "@/composables/useFirebase";
import type { Product } from "@/types/product";
import type { CreateOrderPayload, OrderRecord } from "@/types/order";

const PRIMARY_PRODUCTS_COLLECTION = "Plants";
const FALLBACK_PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";

const mapProduct = (id: string, data: Partial<Product>): Product => ({
  id: data.id ?? id,
  title: data.title ?? "",
  category: data.category ?? "",
  description: data.description ?? "",
  price: data.price ?? 0,
  oldPrice: data.oldPrice ?? null,
  discount: data.discount ?? null,
  image: data.image ?? "",
  size: data.size ?? "",
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { firestore } = useFirebase();
  const snapshot = await getDocs(
    collection(firestore, PRIMARY_PRODUCTS_COLLECTION),
  );
  const docs = snapshot.docs.length
    ? snapshot.docs
    : (await getDocs(collection(firestore, FALLBACK_PRODUCTS_COLLECTION))).docs;

  return docs.map((docSnapshot) => {
    const data = docSnapshot.data() as Product;
    return mapProduct(docSnapshot.id, data);
  });
};

export const createOrder = async (
  payload: CreateOrderPayload,
): Promise<string> => {
  const { firestore } = useFirebase();
  const orderDoc = doc(collection(firestore, ORDERS_COLLECTION));
  const orderId = orderDoc.id;

  await setDoc(orderDoc, {
    ...payload,
    id: orderId,
  });

  return orderId;
};

export const fetchOrderById = async (
  orderId: string,
): Promise<OrderRecord | null> => {
  const { firestore } = useFirebase();
  const orderDoc = await getDoc(doc(firestore, ORDERS_COLLECTION, orderId));

  if (!orderDoc.exists()) {
    return null;
  }

  const data = orderDoc.data() as OrderRecord;
  return {
    ...data,
    id: data.id ?? orderDoc.id,
  };
};
