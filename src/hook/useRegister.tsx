import moment from "moment";
import { IUserRegisterComplete } from "../interface/userRegisterComplete";
import axios from "../Api/axios.config";

export const useRegister = () => {
  const userRegister = async (dataRegister: IUserRegisterComplete, token: string) => {
    const adjustedFormData = {
      ...dataRegister,
      dob: moment(dataRegister.dob).format("YYYY-MM-DD"),
    };

    const response = await axios.post<IUserRegisterComplete>(
      "/users/register",
      adjustedFormData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  };

  return { userRegister };
};