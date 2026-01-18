import { fetchAdvice } from "@/data/repositories/adviceRepository";

export interface CareAdvice {
  id: number;
  plantCategory: string;
  title: string;
  slug: string;
  difficulty: string;
  light: string;
  watering: string;
  soil: string;
  temperature: string;
  humidity: string;
  fertilization: string;
  pruning: string;
  pests: string;
  tips: string[];
  image: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AdviceData {
  advice: CareAdvice[];
  categories: Category[];
  faqs: FAQ[];
}

const buildCategories = (advice: CareAdvice[]): Category[] => {
  const uniqueCategories = new Map<string, Category>();

  advice.forEach((item) => {
    if (!item.plantCategory) return;
    if (!uniqueCategories.has(item.plantCategory)) {
      uniqueCategories.set(item.plantCategory, {
        id: item.plantCategory,
        name: item.plantCategory,
      });
    }
  });

  return Array.from(uniqueCategories.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
};

export const useAdviceData = () => {
  const advice = useState<CareAdvice[]>("advice-items", () => []);
  const categories = useState<Category[]>("advice-categories", () => []);
  const faqs = useState<FAQ[]>("advice-faqs", () => []);
  const isLoaded = useState<boolean>("advice-loaded", () => false);

  const loadAdviceData = async (): Promise<void> => {
    if (isLoaded.value) return;

    const adviceItems = await fetchAdvice();

    advice.value = adviceItems;
    categories.value = buildCategories(adviceItems);
    isLoaded.value = true;
  };

  const getAdviceById = (id: number): CareAdvice | null => {
    return advice.value.find((item) => item.id === id) || null;
  };

  const getAdviceBySlug = (slug: string): CareAdvice | null => {
    return advice.value.find((item) => item.slug === slug) || null;
  };

  const getAdviceByCategory = (category: string): CareAdvice[] => {
    return advice.value.filter((item) => item.plantCategory === category);
  };

  const getAllAdvice = (): CareAdvice[] => {
    return [...advice.value];
  };

  const getAllCategories = (): Category[] => {
    return [...categories.value];
  };

  const getAllFAQs = (): FAQ[] => {
    return [...faqs.value];
  };

  const getAdviceCountByCategory = (categoryId: string): number => {
    return advice.value.filter((item) => item.plantCategory === categoryId)
      .length;
  };

  return {
    advice,
    categories,
    faqs,
    loadAdviceData,
    getAdviceById,
    getAdviceBySlug,
    getAdviceByCategory,
    getAllAdvice,
    getAllCategories,
    getAllFAQs,
    getAdviceCountByCategory,
  };
};
