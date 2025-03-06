import axios from "../../Api/axios.config";
import { ICarsCreate } from "../../interface/car/carCreate.interface";

export const useCreateCar = () => {
  const createCar = async (token: string, data: ICarsCreate) => {
    const response = await axios.post<ICarsCreate>("cars", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  };
  return { createCar };
};