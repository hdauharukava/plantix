import { loginUser } from "@/data/repositories/userRepository";

export const loginUserUseCase = async (email: string, password: string) => {
  return loginUser(email, password);
};
