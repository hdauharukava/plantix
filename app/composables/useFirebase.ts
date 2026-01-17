import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";

export const useFirebase = () => {
  const nuxtApp = useNuxtApp();

  return {
    app: nuxtApp.$firebaseApp as FirebaseApp,
    firestore: nuxtApp.$firestore as Firestore,
  };
};
