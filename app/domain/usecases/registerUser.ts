import { registerUser } from "@/data/repositories/userRepository";

export const registerUserUseCase = async (email: string, password: string) => {
  return registerUser(email, password);
};
