import fikus1 from '@/assets/plants/fikus2.png'
import fikus2 from '@/assets/plants/fikus3.png'
import kaktus1 from '@/assets/plants/kaktus.png'
import kaktus2 from '@/assets/plants/kaktus2.png'
import iglica1 from '@/assets/plants/iglica.png'
import iglica2 from '@/assets/plants/iglica2.png'
import zamiokulkas1 from '@/assets/plants/zamiokulkas.png'
import zamiokulkas2 from '@/assets/plants/zamiokulkas2.png'
import sukulent1 from '@/assets/plants/sukulent.png'
import sukulent2 from '@/assets/plants/sukulent2.png'
import monstera1 from '@/assets/plants/monstera.png'
import monstera2 from '@/assets/plants/monstera2.png'

import plantsData from '@/data/plants.json'

export interface Plant {
  id: number
  image: any // измените на any или правильный тип для импорта изображений
  category: string
  title: string
  price: number
  oldPrice: number | null
  discount: string | null
  size: string
  description: string
}

export interface Category {
  id: string
  name: string
}

export interface Size {
  id: string
  name: string
}

export interface PlantsData {
  plants: Plant[]
  categories: Category[]
  sizes: Size[]
}

// Маппинг ID растений на импортированные изображения
const plantImages: Record<number, any> = {
  1: fikus1,
  2: fikus2,
  3: kaktus1,
  4: kaktus2,
  5: iglica1,
  6: iglica2,
  7: zamiokulkas1,
  8: zamiokulkas2,
  9: sukulent1,
  10: sukulent2,
  11: monstera1,
  12: monstera2,
}

export const usePlantData = () => {
  // Преобразуем данные из JSON, добавляя реальные импорты изображений
  const processedPlants = plantsData.plants.map(plant => ({
    ...plant,
    image: plantImages[plant.id] || fikus1 // fallback на первое изображение
  }))
  
  const data: PlantsData = {
    plants: processedPlants,
    categories: plantsData.categories,
    sizes: plantsData.sizes
  }
  
  const getPlantById = (id: number): Plant | null => {
    return data.plants.find(plant => plant.id === id) || null
  }
  
  const getPlantsByCategory = (category: string): Plant[] => {
    return data.plants.filter(plant => plant.category === category)
  }
  
  const getSimilarPlants = (plantId: number, category: string, limit: number = 4): Plant[] => {
    return data.plants
      .filter(plant => plant.category === category && plant.id !== plantId)
      .slice(0, limit)
  }
  
  const getAllPlants = (): Plant[] => {
    return [...data.plants]
  }
  
  const getAllCategories = (): Category[] => {
    return [...data.categories]
  }
  
  const getAllSizes = (): Size[] => {
    return [...data.sizes]
  }
  
  return {
    data,
    getPlantById,
    getPlantsByCategory,
    getSimilarPlants,
    getAllPlants,
    getAllCategories,
    getAllSizes
  }
}