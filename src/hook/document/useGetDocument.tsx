import axios from "../../Api/axios.config";

export const useGetDocument = () => {
  const getDocument = async (token: string, userUuid: string) => {
    const response = await axios.get(`/documents/user/${userUuid}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  }

  return { getDocument }
}