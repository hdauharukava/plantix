export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  title: string;
  category: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderShipping {
  method: string;
  description: string;
  deliveryTime: string;
  cost: number;
}

export interface OrderPayment {
  method: string;
  description: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  customer: OrderCustomer;
  items: OrderItem[];
  shipping: OrderShipping;
  payment: OrderPayment;
  subtotal: number;
  shippingCost: number;
  additionalFees: number;
  discount: number;
  total: number;
  status: string;
  promoCode: string | null;
}

export type CreateOrderPayload = Omit<OrderRecord, "id">;
