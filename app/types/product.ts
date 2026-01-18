export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  oldPrice: number | null;
  discount: string | null;
  image: string;
  size: string;
}
