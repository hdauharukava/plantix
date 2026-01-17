import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    databaseURL: config.public.firebaseDatabaseUrl,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const firebaseDb = getDatabase(firebaseApp);

  return {
    provide: {
      firebaseApp,
      firebaseDb,
    },
  };
});
