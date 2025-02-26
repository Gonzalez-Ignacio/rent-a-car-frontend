import axios from "../../Api/axios.config";

export const useDeleteDocument = () => {
  const deleteDocument = async (token: string, documentUuid: string, userUuid: string) => {
    const response = await axios.delete(`/documents/${documentUuid}/user/${userUuid}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  }

  return { deleteDocument }
}