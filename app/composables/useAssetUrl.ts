export const useAssetUrl = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.firebaseHostingBaseUrl ?? "";

  const resolveAssetUrl = (path: string): string => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (!baseUrl) return path;
    if (path.startsWith("/")) {
      return `${baseUrl}${path}`;
    }
    return `${baseUrl}/${path}`;
  };

  return {
    resolveAssetUrl,
  };
};
