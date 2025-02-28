import axios from "../../Api/axios.config";
import { ICarUpdate } from "../../interface/car/carUpdate.interface";

export const useUpdateCar = () => {
  const updateCar = async (token: string, carUuid: string, updatedData: ICarUpdate) => {
    const response = await axios.patch(`/cars/${carUuid}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  return { updateCar };
};