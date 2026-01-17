export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  image: string;
  size: string;
}
