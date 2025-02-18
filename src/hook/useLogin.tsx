import axios from "../Api/axios.config";

export const useLogin = () => {
  const userLogin = async (token: string) => {
    const response = await axios.post("/users/login", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response. data;
  };
  return { userLogin };
};
