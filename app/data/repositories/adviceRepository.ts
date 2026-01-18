import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "@/composables/useFirebase";
import type { CareAdvice } from "@/composables/useAdviceData";

const ADVICE_COLLECTION = "advice";

const resolveImageUrl = (image: string, baseUrl: string) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  if (!baseUrl) return image;
  if (image.startsWith("/")) {
    return `${baseUrl}${image}`;
  }
  return `${baseUrl}/${image}`;
};

const mapAdvice = (
  id: string,
  data: Partial<CareAdvice>,
  baseUrl: string,
): CareAdvice => ({
  id: data.id ?? Number(id),
  plantCategory: data.plantCategory ?? "",
  title: data.title ?? "",
  slug: data.slug ?? "",
  difficulty: data.difficulty ?? "",
  light: data.light ?? "",
  watering: data.watering ?? "",
  soil: data.soil ?? "",
  temperature: data.temperature ?? "",
  humidity: data.humidity ?? "",
  fertilization: data.fertilization ?? "",
  pruning: data.pruning ?? "",
  pests: data.pests ?? "",
  tips: Array.isArray(data.tips) ? data.tips : [],
  image: resolveImageUrl(data.image ?? "", baseUrl),
});

export const fetchAdvice = async (): Promise<CareAdvice[]> => {
  const { firestore } = useFirebase();
  const config = useRuntimeConfig();
  const baseUrl = config.public.firebaseHostingBaseUrl ?? "";

  const snapshot = await getDocs(collection(firestore, ADVICE_COLLECTION));

  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data() as CareAdvice;
    return mapAdvice(docSnapshot.id, data, baseUrl);
  });
};
