// types/advice.ts
export interface CareAdvice {
  id: number;
  plantCategory: string;
  title: string;
  slug: string;
  difficulty: 'łatwa' | 'średnia' | 'trudna';
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