import type { FirebaseApp } from "firebase/app";
import type { Database } from "firebase/database";

export const useFirebase = () => {
  const nuxtApp = useNuxtApp();

  return {
    app: nuxtApp.$firebaseApp as FirebaseApp,
    database: nuxtApp.$firebaseDb as Database,
  };
};
