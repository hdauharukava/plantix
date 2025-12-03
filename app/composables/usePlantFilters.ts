// composables/usePlantFilters.ts
import { ref, computed, type Ref } from "vue";
import type {
  Plant,
  Category,
  Size,
  PriceRange,
  SortOption,
} from "@/types/plants";

export const usePlantFilters = (plantsList: Ref<Plant[]>) => {
  const selectedCategories = ref<string[]>([]);
  const selectedSizes = ref<Size["id"][]>([]);
  const priceRange = ref<PriceRange>({ min: null, max: null });
  const sortBy = ref<SortOption>("name");

  const filteredPlants = computed(() => {
    let filtered = plantsList.value;

    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter((plant) =>
        selectedCategories.value.includes(plant.category),
      );
    }

    if (selectedSizes.value.length > 0) {
      filtered = filtered.filter((plant) =>
        selectedSizes.value.includes(plant.size),
      );
    }

    // Преобразуем значения перед сравнением
    const minPrice =
      priceRange.value.min !== null && priceRange.value.min !== ""
        ? Number(priceRange.value.min)
        : null;
    const maxPrice =
      priceRange.value.max !== null && priceRange.value.max !== ""
        ? Number(priceRange.value.max)
        : null;

    if (minPrice !== null && !isNaN(minPrice)) {
      filtered = filtered.filter((plant) => plant.price >= minPrice);
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      filtered = filtered.filter((plant) => plant.price <= maxPrice);
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy.value) {
        case "name":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  });

  const hasActiveFilters = computed(() => {
    const minPrice =
      priceRange.value.min !== null && priceRange.value.min !== ""
        ? Number(priceRange.value.min)
        : null;
    const maxPrice =
      priceRange.value.max !== null && priceRange.value.max !== ""
        ? Number(priceRange.value.max)
        : null;

    return (
      selectedCategories.value.length > 0 ||
      selectedSizes.value.length > 0 ||
      (minPrice !== null && !isNaN(minPrice)) ||
      (maxPrice !== null && !isNaN(maxPrice))
    );
  });

  const resetFilters = () => {
    selectedCategories.value = [];
    selectedSizes.value = [];
    priceRange.value = { min: null, max: null };
    sortBy.value = "name";
  };

  return {
    selectedCategories,
    selectedSizes,
    priceRange,
    sortBy,
    filteredPlants,
    hasActiveFilters,
    resetFilters,
  };
};
