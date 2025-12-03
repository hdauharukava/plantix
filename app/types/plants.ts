// types/plants.ts
export interface Plant {
  id: number;
  image: string;
  category: string;
  title: string;
  price: number;
  oldPrice?: number | null; // Сделано опциональным с возможностью null
  discount?: string | null; // Сделано опциональным с возможностью null
  size: "small" | "medium" | "large";
}

export interface Category {
  id: string;
  name: string;
}

export interface Size {
  id: "small" | "medium" | "large";
  name: string;
}

export interface PriceRange {
  min: string | number | null;
  max: string | number | null;
}

export type SortOption = "name" | "name-desc" | "price" | "price-desc";
