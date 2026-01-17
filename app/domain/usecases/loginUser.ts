import { loginUser } from "@/data/repositories/authRepository";

export const loginUserUseCase = async (email: string, password: string) => {
  return loginUser(email, password);
};
