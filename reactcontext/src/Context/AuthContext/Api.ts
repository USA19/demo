import server from "../BaseApi/server";
import { User, signin } from "../../Interfaces/User";
export const signupApi = async (data: User): Promise<boolean> => {
  await server.post("/signup", data);
  // return server.post("/signup", data);
  return true;
};

export const loginApi = async (data: signin): Promise<User> => {
  const response = await server.post("/login", data);
  return response.data;
};
