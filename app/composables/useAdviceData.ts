import adviceData from '@/data/advice.json'

// Импортируем изображения если они в assets
import fikus1 from '@/assets/plants/fikus2.png'
import kaktus1 from '@/assets/plants/kaktus.png'
import iglica1 from '@/assets/plants/iglica.png'
import zamiokulkas1 from '@/assets/plants/zamiokulkas.png'
import sukulent1 from '@/assets/plants/sukulent.png'
import monstera1 from '@/assets/plants/monstera.png'

export interface CareAdvice {
  id: number
  plantCategory: string
  title: string
  slug: string
  difficulty: string
  light: string
  watering: string
  soil: string
  temperature: string
  humidity: string
  fertilization: string
  pruning: string
  pests: string
  tips: string[]
  image: any
}

export interface Category {
  id: string
  name: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface AdviceData {
  advice: CareAdvice[]
  categories: Category[]
  faqs: FAQ[]
}

// Маппинг категорий на изображения
const categoryImages: Record<string, any> = {
  'Fikusy': fikus1,
  'Kaktusy': kaktus1,
  'Iglice': iglica1,
  'Zamiokulkasy': zamiokulkas1,
  'Sukulenty': sukulent1,
  'Monstery': monstera1,
}

export const useAdviceData = () => {
  // Обрабатываем данные, добавляя реальные изображения
  const processedAdvice = adviceData.advice.map(item => ({
    ...item,
    image: categoryImages[item.plantCategory] || fikus1 // fallback на первое изображение
  }))
  
  const data: AdviceData = {
    advice: processedAdvice,
    categories: adviceData.categories,
    faqs: adviceData.faqs
  }
  
  const getAdviceById = (id: number): CareAdvice | null => {
    return data.advice.find(advice => advice.id === id) || null
  }
  
  const getAdviceBySlug = (slug: string): CareAdvice | null => {
    return data.advice.find(advice => advice.slug === slug) || null
  }
  
  const getAdviceByCategory = (category: string): CareAdvice[] => {
    return data.advice.filter(advice => advice.plantCategory === category)
  }
  
  const getAllAdvice = (): CareAdvice[] => {
    return [...data.advice]
  }
  
  const getAllCategories = (): Category[] => {
    return [...data.categories]
  }
  
  const getAllFAQs = (): FAQ[] => {
    return [...data.faqs]
  }
  
  const getAdviceCountByCategory = (categoryId: string): number => {
    return data.advice.filter(advice => advice.plantCategory === categoryId).length
  }
  
  return {
    data,
    getAdviceById,
    getAdviceBySlug,
    getAdviceByCategory,
    getAllAdvice,
    getAllCategories,
    getAllFAQs,
    getAdviceCountByCategory
  }
}