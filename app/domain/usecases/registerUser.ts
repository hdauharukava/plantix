import { registerUser } from "@/data/repositories/authRepository";

export const registerUserUseCase = async (email: string, password: string) => {
  return registerUser(email, password);
};
