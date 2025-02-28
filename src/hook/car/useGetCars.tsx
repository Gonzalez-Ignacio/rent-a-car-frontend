import axios from "../../Api/axios.config";

export const useGetCars = () => {
  const getCars = async (token: string) => {
    const response = await axios.get(`/cars/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  };

  return { getCars };
};
