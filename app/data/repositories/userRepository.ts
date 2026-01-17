import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useFirebase } from "@/composables/useFirebase";
import type { UserProfile } from "@/types/user";

const USERS_COLLECTION = "users";

export const registerUser = async (
  email: string,
  password: string,
): Promise<UserProfile> => {
  const { firestore } = useFirebase();
  const userDoc = doc(collection(firestore, USERS_COLLECTION), email);
  try {
    const snapshot = await getDoc(userDoc);
    if (snapshot.exists()) {
      throw new Error("user-exists");
    }

    await setDoc(userDoc, {
      email,
      password,
      createdAt: serverTimestamp(),
    });

    return {
      id: userDoc.id,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[userRepository] registerUser failed", {
      email,
      error,
    });
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserProfile> => {
  const { firestore } = useFirebase();
  const userDoc = doc(collection(firestore, USERS_COLLECTION), email);
  try {
    const snapshot = await getDoc(userDoc);
    if (!snapshot.exists()) {
      throw new Error("user-not-found");
    }

    const data = snapshot.data() as UserProfile;
    if (data.password !== password) {
      throw new Error("invalid-password");
    }

    return {
      id: snapshot.id,
      email: data.email ?? email,
      password: data.password,
      createdAt: data.createdAt ?? "",
    };
  } catch (error) {
    console.error("[userRepository] loginUser failed", {
      email,
      error,
    });
    throw error;
  }
};
