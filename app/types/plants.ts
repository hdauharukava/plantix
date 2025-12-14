export interface Plant {
  id: number;
  image: string;
  category: string;
  title: string;
  price: number;
  oldPrice?: number | null;
  discount?: string | null;
  size: "small" | "medium" | "large";
  description?: string;
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
