import axios from "../Api/axios.config";
import { IUserUpdate } from "../interface/userUpdate";

export const useUpdateUser = () => {
  const updateUser = async (token: string, updatedData: IUserUpdate) => {
    const response = await axios.patch("/users/profile/update", updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  return { updateUser };
};