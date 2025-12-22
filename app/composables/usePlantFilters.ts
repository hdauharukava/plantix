import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { Plant } from './usePlantData'

interface PriceRange {
  min: number | null
  max: number | null
}

export const usePlantFilters = (plants: Ref<Plant[]>) => {
  const selectedCategories = ref<string[]>([])
  const selectedSizes = ref<string[]>([])
  const priceRange = ref<PriceRange>({ min: null, max: null })
  const sortBy = ref<string>('name')

  const filteredPlants = computed(() => {
    let filtered = [...plants.value]

    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter((plant) =>
        selectedCategories.value.includes(plant.category)
      )
    }

    if (selectedSizes.value.length > 0) {
      filtered = filtered.filter((plant) =>
        selectedSizes.value.includes(plant.size)
      )
    }

    if (priceRange.value.min !== null) {
      filtered = filtered.filter(
        (plant) => plant.price >= priceRange.value.min!
      )
    }

    if (priceRange.value.max !== null) {
      filtered = filtered.filter(
        (plant) => plant.price <= priceRange.value.max!
      )
    }

    switch (sortBy.value) {
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'price':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    return filtered
  })

  const hasActiveFilters = computed(() => {
    return (
      selectedCategories.value.length > 0 ||
      selectedSizes.value.length > 0 ||
      priceRange.value.min !== null ||
      priceRange.value.max !== null
    )
  })

  const resetFilters = () => {
    selectedCategories.value = []
    selectedSizes.value = []
    priceRange.value = { min: null, max: null }
    sortBy.value = 'name'
  }

  return {
    selectedCategories,
    selectedSizes,
    priceRange,
    sortBy,
    filteredPlants,
    hasActiveFilters,
    resetFilters,
  }
}