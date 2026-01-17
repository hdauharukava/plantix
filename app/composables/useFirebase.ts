import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

export const useFirebase = () => {
  const nuxtApp = useNuxtApp();

  return {
    app: nuxtApp.$firebaseApp as FirebaseApp,
    auth: nuxtApp.$auth as Auth,
    firestore: nuxtApp.$firestore as Firestore,
  };
};
