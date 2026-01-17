import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useFirebase } from "@/composables/useFirebase";

const USERS_COLLECTION = "users";

export const registerUser = async (email: string, password: string) => {
  const { auth, firestore } = useFirebase();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  await setDoc(doc(firestore, USERS_COLLECTION, user.uid), {
    email: user.email ?? email,
    createdAt: serverTimestamp(),
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const { auth } = useFirebase();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};
