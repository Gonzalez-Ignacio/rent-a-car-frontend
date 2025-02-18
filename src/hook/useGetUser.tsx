import axios from "../Api/axios.config";
import { IGetUser } from "../interface/getUser";

export const useGetUser = () => {
  const getUser = async (token: string) => {
    const response = await axios.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user: IGetUser = response.data;
    return user;
  };
  return { getUser };
};