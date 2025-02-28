import axios from "../../Api/axios.config";

export const useDeleteCar = () => {
  const deleteCar = async (token: string, carUuid: string) => {
    const response = await axios.delete(`/cars/${carUuid}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  }

  return { deleteCar }
}