import type { FirebaseApp } from "firebase/app";
import type { Database } from "firebase/database";

declare module "#app" {
  interface NuxtApp {
    $firebaseApp: FirebaseApp;
    $firebaseDb: Database;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $firebaseApp: FirebaseApp;
    $firebaseDb: Database;
  }
}
